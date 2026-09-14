/**
 * GitHub Pages 静态路由 + SEO 产物生成器
 *
 * 背景：GitHub Pages 是纯静态托管，对不存在于文件系统中的路径一律返回 404。
 * 本项目是单页应用（BrowserRouter），若直接访问 /about，Pages 会返回 404 状态码
 * —— 页面在浏览器里能被 React Router 渲染出来，但搜索引擎不会收录这个地址。
 *
 * 做法：为每个已知路由生成 `<route>/index.html`，并在构建期就把该页的
 * <title> / description / canonical / og:url 写进 HTML —— 搜索引擎爬虫不一定
 * 执行 JS，只有写死在 HTML 里的元信息才能被稳定抓到。
 *   - /about/ 命中目录索引，返回 200
 *   - /about  由 Pages 301 跳转到 /about/，浏览器地址栏与渲染结果都不受影响
 * 未列出的路径仍由 404.html 兜底（能渲染，但状态码是 404）。
 *
 * 同时输出 sitemap.xml 与 robots.txt，供 Google Search Console / 百度站长平台提交。
 *
 * 环境变量：
 *   VITE_SITE_URL  站点正式地址（如 https://hi-lanmili.com）。
 *                  为空时不输出 canonical / og:url / sitemap，避免指向尚未生效的域名。
 *
 * 用法：vite build 之后执行 `node scripts/generate-static-routes.mjs`
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const DIST_DIR = 'dist';
const INDEX_FILE = join(DIST_DIR, 'index.html');
const URL_TAGS_PLACEHOLDER = '<!--SEO_URL_TAGS-->';

const SITE_URL = (process.env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '');

const { PROJECTS, WRITINGS } = await import('../src/data/siteContent.js');
const { SEO } = await import('../src/app/seo.js');

/**
 * 路由清单。path 不带首尾斜杠；'' 表示首页。
 * title / description 与各页面 useDocumentMeta 传入的值保持一致，
 * 这样 JS 执行后不会出现"先看到一个标题、再闪成另一个"的情况。
 * 与 src/app/App.jsx 中的路由表保持一致。
 */
const pages = [
  { path: '', title: SEO.home[0], description: SEO.home[1], priority: '1.0' },
  { path: 'about', title: SEO.about[0], description: SEO.about[1], priority: '0.8' },
  { path: 'projects', title: SEO.projects[0], description: SEO.projects[1], priority: '0.8' },
  { path: 'writing', title: SEO.writing[0], description: SEO.writing[1], priority: '0.8' },
  // 详情页是动态参数路由（/projects/:id、/writing/:id），
  // 真实地址无法从路由定义推断，因此从内容数据中枚举。
  ...PROJECTS.map((project) => ({
    path: `projects/${project.id}`,
    title: `${project.title} — 能力实践`,
    description: project.summary,
    priority: '0.6',
  })),
  ...WRITINGS.map((writing) => ({
    path: `writing/${writing.id}`,
    title: `${writing.title} — 学习内容`,
    description: writing.excerpt,
    priority: '0.6',
  })),
];

const escapeHtml = (text) =>
  String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

/** 页面在站点内的绝对地址；目录形式以 / 结尾，与 Pages 的 301 目标一致 */
const pageUrl = (path) => (path ? `${SITE_URL}/${path}/` : `${SITE_URL}/`);

function renderPage(template, page) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);

  const urlTags = SITE_URL
    ? [
        `<link rel="canonical" href="${pageUrl(page.path)}" />`,
        `<meta property="og:url" content="${pageUrl(page.path)}" />`,
      ].join('\n    ')
    : '';

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`)
    .replace(URL_TAGS_PLACEHOLDER, urlTags);
}

const template = await readFile(INDEX_FILE, 'utf8');
if (!template.includes(URL_TAGS_PLACEHOLDER)) {
  throw new Error(`index.html 缺少占位符 ${URL_TAGS_PLACEHOLDER}，无法注入 canonical / og:url`);
}

for (const page of pages) {
  const target = join(DIST_DIR, page.path, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderPage(template, page), 'utf8');
}

// 兜底页：任意未生成的路径都能正常渲染，不至于看到 GitHub 的默认 404。
// 404 页不该声明规范地址，也不该被收录，所以不注入 URL 标签并改为 noindex。
const notFoundHtml = renderPage(template, { path: '', title: '页面不存在 — YUAN', description: '你访问的页面不存在。' })
  .replace(/<link rel="canonical"[^>]*\/>\s*/, '')
  .replace(/<meta property="og:url"[^>]*\/>\s*/, '')
  .replace('<meta name="robots" content="index, follow" />', '<meta name="robots" content="noindex" />');
await writeFile(join(DIST_DIR, '404.html'), notFoundHtml, 'utf8');

// robots.txt：允许全部抓取；有正式域名时声明 sitemap 位置
const robotsLines = ['User-agent: *', 'Allow: /'];
if (SITE_URL) robotsLines.push('', `Sitemap: ${SITE_URL}/sitemap.xml`);
await writeFile(join(DIST_DIR, 'robots.txt'), `${robotsLines.join('\n')}\n`, 'utf8');

// sitemap.xml：仅在有正式域名时生成，避免提交一份指向死域名的站点地图
if (SITE_URL) {
  const today = new Date().toISOString().slice(0, 10);
  const urlset = pages
    .map((page) => `  <url>\n    <loc>${escapeHtml(pageUrl(page.path))}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${page.priority}</priority>\n  </url>`)
    .join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`;
  await writeFile(join(DIST_DIR, 'sitemap.xml'), sitemap, 'utf8');
}

console.log(`已生成 ${pages.length} 个页面（含首页）：`);
for (const page of pages) console.log(`  /${page.path}${page.path ? '/' : ''}  ← ${page.title}`);
console.log(
  SITE_URL
    ? `站点地址：${SITE_URL}（已写入 canonical / og:url / sitemap.xml）`
    : '未设置 VITE_SITE_URL：跳过 canonical / og:url / sitemap.xml',
);
