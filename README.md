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

- 线上预览：<https://laura-rice.github.io/>
- 仓库地址：<https://github.com/Laura-rice/Laura-rice.github.io>
- 部署方式：推送到 `main` 分支即自动构建并发布，无需手动操作
- 手动触发：仓库 **Actions** → `Deploy to GitHub Pages` → **Run workflow**
- 流水线定义：`.github/workflows/deploy-pages.yml`

流水线要点：

- 构建前把环境变量 `VITE_DIFY_CHATBOT_TOKEN` 从仓库 Secret 注入，因此线上 AI 助手气泡可用；该值需在 **Settings → Secrets and variables → Actions** 中维护。
- 构建后用 `index.html` 生成 `404.html`。GitHub Pages 对未知路径返回 404，靠这个回退文件 React Router 的子路由（如 `/about`）才能直接访问和刷新。
- `public/.nojekyll` 阻止 Pages 用 Jekyll 处理构建产物。

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
