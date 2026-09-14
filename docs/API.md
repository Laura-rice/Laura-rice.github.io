# 内容与组件接口

本项目无外部 HTTP API。

## 内容结构

- `SITE`：姓名、身份、标语、邮箱、所在地。
- `PROJECTS`：摘要字段、能力证据和统一详情结构。
- `WRITINGS`：`id/title/excerpt/date/tag/related/body`。
- `STRENGTHS`：编号、标题、说明三元组。

## 组件接口

- `ProjectCard({ project })`：渲染项目摘要卡片。
- `WritingCard({ article })`：渲染文章摘要卡片。
- `SectionHeading({ eyebrow, title, intro? })`：统一章节标题。
- `ActionLink({ to, children, variant? })`：站内或外部 CTA。
- `LiquidMetalScene()`：桌面端懒加载的唯一 WebGL Hero 场景，不接受内容数据。
- `MetalFallback()`：不支持 WebGL、移动端或 reduced-motion 时的静态金属视觉。
- `AiTrigger()`：固定显示英文 `AI ASSISTANT` 预留入口，当前不触发外部调用。
- `WonderPageFrame({ children, immersive? })`：包裹非首页内容并提供 Wonder 暖色视觉上下文；`immersive` 仅由 About 页启用沉浸场景样式。
- `WonderExperience()`：渲染 About 页 480vh sticky 视差舞台、幕布入场、双场景文案与主题卡片弧线。

## Hooks

- `useMotionCapability()`：根据断点、动态效果偏好和 WebGL 能力决定是否启用 3D。
- `useElementVisibility()`：以 IntersectionObserver 控制离屏 3D 渲染暂停。
- `useSpotlight()`：使用 requestAnimationFrame 节流更新卡片聚光坐标。
- `useWonderMotion(containerRef)`：计算 Wonder 舞台滚动进度、指针偏移、移动端断点和幕布入场状态。

## Chatbot Adapter

- `loadDifyChatbot()`：按环境变量加载 Dify embed 脚本。
- `openDifyChatbot()`：触发已加载的 Dify 对话入口；嵌入未就绪时返回 `false`。
