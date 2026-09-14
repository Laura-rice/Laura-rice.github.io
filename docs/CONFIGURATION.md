# 配置说明

## 环境变量

- `VITE_DIFY_CHATBOT_TOKEN`：Dify WebApp 的公开嵌入 token；缺失时不加载聊天组件。
- `VITE_DIFY_BASE_URL`：Dify 服务地址，当前为 `https://udify.app`。

复制 `.env.example` 为 `.env.local` 后填写实际值。Vite 会把 `VITE_` 前缀变量暴露给浏览器，因此这里只能使用 Dify 提供的前端嵌入 token，不能放置服务端 API 密钥。

- 内容：`src/data/siteContent.js`
- SEO：`src/app/seo.js`
- 设计系统：`DESIGN.md` 与 `src/styles/global.css`
- 主题存储键：`yuan-portfolio-metal-theme`（视觉升级后默认深空暗色）
- 3D 启用条件：视口至少 768px、未开启 reduced-motion 且浏览器支持 WebGL。
- 声音静音存储键：`yuan-portfolio-sound-muted`；浏览器自动播放策略要求首次用户交互后才能发声。
