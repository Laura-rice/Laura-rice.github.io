# YUAN AI 训练师个人作品集

## 项目简介（一句话）

面向招聘方、以能力证据和学习记录为核心的 AI 训练师个人网站。

## 快速开始

```bash
npm install
npm run dev
```

浏览器访问终端显示的本地地址。生产构建使用 `npm run build`，测试使用 `npm test`。

## 部署

### GitHub Pages（当前使用）

- 正式地址：<https://hi-lanmili.com/>
- 默认地址：<https://laura-rice.github.io/>（绑定自定义域名后会自动 301 跳转到正式地址）
- 仓库地址：<https://github.com/Laura-rice/Laura-rice.github.io>
- 部署方式：推送到 `main` 分支即自动构建并发布，无需手动操作
- 手动触发：仓库 **Actions** → `Deploy to GitHub Pages` → **Run workflow**
- 流水线定义：`.github/workflows/deploy-pages.yml`

流水线要点：

- 构建前把环境变量 `VITE_DIFY_CHATBOT_TOKEN` 从仓库 Secret 注入，因此线上 AI 助手气泡可用；该值需在 **Settings → Secrets and variables → Actions** 中维护。
- 构建命令是 `npm run build:pages`，等于 `vite build` 之后再执行 `scripts/generate-static-routes.mjs`。
- 该脚本会为 `/about`、`/projects/<id>`、`/writing/<id>` 等每个已知路由生成 `dist/<route>/index.html`，并在构建期把该页专属的 `<title>`、`description`、`canonical`、`og:url` 直接写进 HTML（搜索引擎爬虫不一定执行 JS，写死在 HTML 里的元信息才能被稳定抓到）。GitHub Pages 对文件系统中不存在的路径一律返回 404，而单页应用直接访问子路由时页面虽然能渲染、状态码却是 404，搜索引擎不会收录；生成真实目录后子页面返回 **200**，同时 `404.html`（已标 `noindex`）继续兜底未列出的路径。
- 同时生成 `robots.txt` 与 `sitemap.xml`，供搜索引擎站长平台提交。
- 新增项目或文章时，只要写进 `src/data/siteContent.js` 的 `PROJECTS` / `WRITINGS`，对应详情页路由、标题、描述以及 sitemap 条目都会在下次构建时自动生成，无需改动其他文件。
- `VITE_SITE_URL`（站点正式地址）在仓库 **Settings → Secrets and variables → Actions → Variables** 中维护。为空时脚本会跳过 `canonical` / `og:url` / `sitemap.xml`，避免在域名生效前指向死地址；绑定域名后把它设为 `https://hi-lanmili.com` 并重新部署一次即可。
- `public/.nojekyll` 阻止 Pages 用 Jekyll 处理构建产物。

### 日常更新（最常用）

改完代码后三条命令即可，剩下的全部自动完成：

```powershell
git add -A
git commit -m "你的改动说明"
git push origin main
```

推送后 GitHub Actions 会自动构建并发布，约 1～2 分钟后线上生效。查看进度：仓库 **Actions** 标签页。如果只想重新发布而不改代码，用 **Actions → Deploy to GitHub Pages → Run workflow**。

> 自定义域名的配置存在 **仓库 Settings** 里，不在代码里，因此上面的日常推送**不会**影响域名，不需要重复配置。

### 自定义域名 hi-lanmili.com

域名注册于阿里云（万网），DNS 由阿里云云解析托管（`dns17.hichina.com` / `dns18.hichina.com`）。

在阿里云控制台 → 云解析 DNS → `hi-lanmili.com` → 添加如下记录（裸域名 `@` 为主域名，`www` 由 GitHub 自动跳转到主域名）：

| 记录类型 | 主机记录 | 记录值 | 说明 |
| --- | --- | --- | --- |
| `A` | `@` | `185.199.108.153`<br>`185.199.109.153`<br>`185.199.110.153`<br>`185.199.111.153` | GitHub Pages 官方 IPv4，四条都要加 |
| `AAAA` | `@` | `2606:50c0:8000::153`<br>`2606:50c0:8001::153`<br>`2606:50c0:8002::153`<br>`2606:50c0:8003::153` | 可选，IPv6 |
| `CNAME` | `www` | `laura-rice.github.io` | 不要带仓库名，也不要以 `/` 结尾 |

> 不要使用通配符记录（如 `*.hi-lanmili.com`），会带来域名劫持风险。

**切换顺序很重要**：必须先让 DNS 解析生效，再到 GitHub 绑定域名。反过来做的话，`laura-rice.github.io` 会立刻跳转到还解析不通的 `hi-lanmili.com`，导致站点暂时打不开。

DNS 生效后执行（`gh` CLI 已登录时）：

```powershell
gh api -X PUT repos/Laura-rice/Laura-rice.github.io/pages `
  -f cname=hi-lanmili.com -f build_type=workflow `
  -f "source[branch]=main" -f "source[path]=/"
```

然后确认：

```powershell
gh api repos/Laura-rice/Laura-rice.github.io/pages --jq '{cname,https_enforced,status}'
```

`cname` 显示 `hi-lanmili.com` 即为成功，随后在 **Settings → Pages** 勾选 **Enforce HTTPS**（证书签发可能需要几分钟到几小时，未就绪时该选项不可点）。

绑定完成后再设置站点地址变量并触发一次重新部署，让 `canonical` / `sitemap.xml` 指向正式域名：

```powershell
gh variable set VITE_SITE_URL --body "https://hi-lanmili.com"
gh workflow run "Deploy to GitHub Pages"
```

`public/CNAME` 内容与本域名保持一致，作为兜底保险；但对当前的自定义 Actions 工作流发布方式，GitHub 官方说明是**该文件会被忽略、也不需要**，真正生效的是仓库 Settings 中的配置。

### 让搜索引擎收录

域名能打开只代表"输入网址可访问"；要在搜索结果里出现，还需要主动向搜索引擎提交站点，新站从提交到被收录通常需要几天到几周。

1. **Google**：<https://search.google.com/search-console> → 添加资源 → 选「网域」类型输入 `hi-lanmili.com` → 按提示在阿里云云解析加一条 `TXT` 记录完成所有权验证 → 左侧「站点地图」提交 `https://hi-lanmili.com/sitemap.xml`。
2. **百度**：<https://ziyuan.baidu.com> → 用户中心 → 站点管理 → 添加 `https://hi-lanmili.com` → 选 CNAME 或文件验证 → 「普通收录」提交 sitemap 地址。
3. **Bing**：<https://www.bing.com/webmasters> 支持直接从 Google Search Console 一键导入。

构建产物已经准备好了搜索引擎需要的全部内容：每页独立的 `<title>` 与 `description`、`canonical`、`robots.txt` 和 `sitemap.xml`。

### Vercel（可选）

项目保留了 `vercel.json`，将所有页面地址回退到 `index.html`。使用 Vercel 发布时，构建命令为 `npm run build`，输出目录为 `dist`。

### 推送失败排查

本机 `git push` 若报 `Recv failure: Connection was reset`，是访问 `github.com` 被网络重置所致。本仓库已配置仓库级代理指向本机 Clash（`http://127.0.0.1:7897`），需保持代理程序开启。

```powershell
# 查看当前代理配置
git config --local --get http.proxy

# 代理端口变化时更新（示例端口 7897）
git config --local http.proxy http://127.0.0.1:7897
git config --local https.proxy http://127.0.0.1:7897

# 不再需要代理时移除
git config --local --unset http.proxy
git config --local --unset https.proxy
```

## 功能列表

- 液态金属 AI 实验室视觉与 HR 60 秒阅读结构
- 首页身份卡支持用户提供的真实头像，并保留拖拽交互
- React Three Fiber 交互式金属 Hero，支持移动端、WebGL 失败与 reduced-motion 静态降级
- 固定 `AI ASSISTANT` 预留入口，暂不触发外部调用
- `/about` 第二页使用 Wonder 沉浸式视差舞台，后续非首页页面共享暖色排版与卡片语言
- 首页、关于、能力实践、学习内容四类页面
- 能力实践与学习内容详情结构
- 响应式导航、深空/银白主题、页面 SEO metadata
- 集中式内容数据与可复用项目/文章组件
- Dify adapter 保留为未来 AI ASSISTANT 接入边界，当前不加载第三方聊天气泡

## 配置说明

复制 `.env.example` 为 `.env.local`，填写 Dify 聊天应用 token 与服务地址；本地开发配置已写入未提交的 `.env.local`。在 `src/data/siteContent.js` 替换姓名、邮箱、项目、文章和经历。设计规则见 `DESIGN.md`，长期项目上下文见 `project-context.md`。

## 项目结构

`src/pages` 存放页面，`src/components` 存放复用 UI，`src/adapters` 隔离 Dify 等外部服务，`src/data` 管理内容。

## 测试

详见 `docs/TESTING.md`。

## 变更日志

详见 [CHANGELOG.md](./CHANGELOG.md)。
