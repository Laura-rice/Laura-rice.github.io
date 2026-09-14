/**
 * GitHub Pages 静态路由生成器
 *
 * 背景：GitHub Pages 是纯静态托管，对不存在于文件系统中的路径一律返回 404。
 * 本项目是单页应用（BrowserRouter），若直接访问 /about，Pages 会返回 404 状态码
 * —— 页面在浏览器里能被 React Router 渲染出来，但搜索引擎不会收录这个地址。
 *
 * 做法：为每个已知路由生成 `<route>/index.html`，内容与首页完全一致，
 * 具体渲染哪个页面交由客户端的 React Router 决定。这样：
 *   - /about/ 命中目录索引，返回 200
 *   - /about  由 Pages 301 跳转到 /about/，浏览器地址栏与渲染结果都不受影响
 * 未列出的路径仍由 404.html 兜底（能渲染，但状态码是 404）。
 *
 * 用法：vite build 之后执行 `node scripts/generate-static-routes.mjs`
 */
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const DIST_DIR = 'dist';
const INDEX_FILE = join(DIST_DIR, 'index.html');

/** 与 src/app/App.jsx 中的静态路由保持一致 */
const STATIC_ROUTES = ['about', 'projects', 'writing'];

const { PROJECTS, WRITINGS } = await import('../src/data/siteContent.js');

// 详情页是动态参数路由（/projects/:id、/writing/:id），
// 真实地址无法从路由定义推断，因此从内容数据中枚举。
const routes = [
  ...STATIC_ROUTES,
  ...PROJECTS.map((project) => `projects/${project.id}`),
  ...WRITINGS.map((writing) => `writing/${writing.id}`),
];

const html = await readFile(INDEX_FILE, 'utf8');

for (const route of routes) {
  const target = join(DIST_DIR, route, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
}

// 兜底页：任意未生成的路径都能正常渲染，不至于看到 GitHub 的默认 404
await copyFile(INDEX_FILE, join(DIST_DIR, '404.html'));

console.log(`已生成 ${routes.length} 条静态路由：`);
for (const route of routes) {
  console.log(`  /${route}/`);
}
