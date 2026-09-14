# 架构说明

```text
BrowserRouter → SiteLayout → Header / Routes / Footer
Routes → Home / About / Practices / Practice Detail / Writing / Writing Detail
siteContent → pages → ProjectCard / WritingCard / SectionHeading / ActionLink
Hero → useMotionCapability → LiquidMetalScene | MetalFallback
SiteLayout → AiTrigger（AI ASSISTANT 预留入口）
SiteLayout（非首页）→ WonderPageFrame → WonderExperience（About）/ 内容页
```

- 页面负责组合，复用组件负责单一展示职责。
- 所有可替换身份、案例、文章和经历集中于 `siteContent.js`。
- 联系方式和简历属于关于页及首页 CTA，不建立独立空页面。
- `LiquidMetalScene` 是全站唯一 WebGL 边界，通过 lazy import 独立分包；`MetalFallback` 保证移动端和异常场景可读。
- WebGL 离开视口时暂停渲染；无滚动劫持或外部数据服务。
- AI 助手入口当前只保留视觉和交互位置，不加载第三方聊天脚本；后续接入时继续通过 Dify adapter 隔离外部 DOM 细节。
- 首页继续使用深色 slate + 荧光绿视觉；第二页 `/about` 使用独立的 Wonder 视差场景，Projects、Writing 及详情页复用其暖色 token，不共享首页 Hero 的布局状态。
- `useWonderMotion` 只负责滚动进度、鼠标偏移、响应式断点和幕布入场时序；`WonderExperience` 负责分层图像与场景组合，避免页面直接管理动画细节。
