# DESIGN.md

> 把米粒的 AI 训练师作品集改造成一张可探索的深色身份卡：专业、克制，但保留一点会动的好奇心。

## 1. Visual Theme & Atmosphere

**Style**：首页为 Zedian-inspired dark portfolio；第二页起引入 warm portal / immersive wonder 视觉层。
**Keywords**：首页深 slate 与荧光绿；内页暖黑、奶油白、柔和粉彩、幕布、视差、个人叙事。
**Tone**：像一张正在被使用的高级工作证，而不是套模板的个人简历。视觉服务于 HR 快速识别候选人、方向和证据。
**Interaction Tier**：L2 流畅交互。使用原生 pointer drag、IntersectionObserver 和 CSS transition，不引入滚动劫持或新的动画依赖。

## 2. Color Palette & Roles

```css
:root {
  --bg: #0d1116;
  --surface: #14181f;
  --surface-alt: #1b222a;
  --surface-hover: #232c35;
  --border: #2c353e;
  --border-hover: #74818a;
  --text: #ffffff;
  --text-secondary: #a9b3ba;
  --text-tertiary: #707b83;
  --accent: #00df8f;
  --accent-hover: #47f5b2;
  --focus: #7dffd2;
  --bg-rgb: 13, 17, 22;
  --surface-rgb: 20, 24, 31;
  --text-rgb: 255, 255, 255;
  --accent-rgb: 0, 223, 143;
}
```

首页黑色只做结构背景，slate surface 承载内容，荧光绿只承担 CTA、状态和关键交互。内页 Wonder 场景使用暖黑作为舞台底色，粉彩主题卡片仅用于内容分类，不用于装饰性渐变。

## 3. Typography Rules

首页继续使用 IBM Plex Mono、Inter、Noto Sans SC；Wonder 内页追加 Viaoda Libre 与 Imprima，分别用于叙事标题和轻量正文。

| Role | Font | Size | Weight | Line Height |
|---|---|---:|---:|---:|
| Hero H1 | Inter / Noto Sans SC | clamp(64px, 9.7vw, 156px) | 700 | 0.82 |
| Section H2 | Inter / Noto Sans SC | clamp(42px, 6vw, 92px) | 600 | 0.95 |
| Card H3 | Inter / Noto Sans SC | clamp(24px, 3vw, 56px) | 600 | 1.1 |
| Body | Noto Sans SC / Inter | 16–19px | 400 | 1.75 |
| Label | IBM Plex Mono | 9–12px | 500 | 1.4 |

Wonder scene heading 使用 Viaoda Libre，scene body 使用 Imprima；中文信息仍使用 Noto Sans SC 兜底，避免字体未加载时内容消失。

中文正文字号不低于 15px、行高不低于 1.7、字距约 0.02em。禁止 Orbitron、手写体和装饰性赛博字体。

## 4. Component Stylings

### Navigation

首屏透明悬浮，滚动后显示局部 slate 表面和 1px 边线；移动端折叠为全屏菜单。品牌直接使用“米粒的个人网站”，让个人识别优先于英文装饰。

### Buttons and Links

Primary 使用荧光绿实底、深色文字；secondary 使用透明底和金属边线。默认、hover、active、focus-visible、disabled 都需要可辨识反馈，触摸目标至少 44px。

### Identity Card

Hero 使用一张带 lanyard、编号、状态和个人标识的 CSS 身份卡。卡片支持 pointer drag，松手后回弹；头像只使用用户提供的真实素材，保留原始颜色并通过卡片边框融入深色视觉。身份卡右下区域不放辅助英文或操作提示，保持姓名和照片的视觉焦点。

### Project Deck

精选实践使用不等大的 3D stacked deck。前卡展示图形化概念封面，右侧同步展示项目标题、摘要、证据和详情入口。卡片内容必须来自 `siteContent.js`，不伪造客户、奖项或商业指标。

### Services Accordion

“如何工作”使用窄容器手风琴表达 Audit、Annotate、Evaluate、Communicate 四个阶段。展开内容用 grid row transition，键盘按钮可访问。

### AI Trigger

固定入口使用与页面一致的 slate 边框和荧光绿细节点，当前只保留英文 `AI ASSISTANT` 预留按钮，不触发外部调用；页面只保留一个 AI 入口，不显示第三方默认悬浮按钮。

### Wonder 内页舞台

`/about` 使用 480vh 外层容器与 100vh sticky viewport，按 world、clouds、portal、curtain、scene UI 的 z-index 分层。滚动进度驱动入口场景淡出、portal 放大、第二场景淡入和九张主题卡片弧线旋转；鼠标只提供轻量反向 parallax，不劫持滚动。Projects、Writing 及详情页复用暖色 token 与 Viaoda Libre / Imprima 字体，但不复制超长视差舞台。

## 5. Layout Principles

- 最大容器 1600px，左右 gutter 为 `clamp(20px, 4vw, 72px)`。
- 首页顺序：Hero → About / 60 秒了解我 → Project Deck → Work in Progress → How I Work → Notes → Contact。
- Hero 桌面左右分栏，移动端上下排列；项目 deck 桌面左右分栏，移动端单栏。
- 文章正文最大宽度 760px；项目详情保留长文阅读宽度。

## 6. Depth & Elevation

Flat 使用细边框和 slate surface；Elevated 使用低透明黑色投影；Focus 使用荧光绿 1px 边线和轻微外发光。页面不使用大面积 backdrop blur，也不堆叠玻璃卡片。

## 7. Animation & Interaction

- Hero 标题使用一次性 clip-path reveal；章节使用 `.reveal` 的 fade + translateY。
- Hero 文案采用明确的垂直节奏：kicker、标题、自我介绍、说明和 CTA 之间使用独立间距，避免身份信息与行动按钮挤在一起。
- Hero 主 CTA 与小红书/GitHub 社交入口保持额外的分组间距，区分“下一步行动”和“外部资料入口”。
- 身份卡使用原生 pointer drag，限制位移 92px，释放后以短 transition 回弹。
- Project Deck 使用 `translateY + scale + rotateX` 形成 3D 堆叠，点击后卡片成为 active；不使用持续高频渲染。
- Accordion 只改变 `grid-template-rows` 和内容 margin，不改变滚动位置。
- 所有动画支持 `prefers-reduced-motion: reduce`：停用持续动画、位移和旋转，内容直接显示。

## 8. Do's and Don'ts

### Do

- 首屏优先展示姓名、目标方向、核心工作方式和 CTA。
- 用真实项目数据驱动卡片、标签和详情链接。
- 让交互帮助阅读，而不是把信息藏在动画里。
- 保持绿色作为状态和行动语言，控制视觉噪音。
- 移动端先保证内容顺序、对比度和触摸面积。

### Don't

- 不虚构照片、客户、奖项、项目数量或量化成果。
- 不使用大面积紫色渐变、粒子背景或 Matrix 字符雨。
- 不使用超过一个重型 WebGL 场景；当前版本不需要 WebGL。
- 不让拖拽卡片遮挡标题、导航或 CTA。
- 不用 hover 才能理解项目内容。
- 不使用 `filter: blur()` 处理移动元素。
- 不把真实社交链接改成假地址或平台首页。
- 不牺牲键盘焦点、中文可读性和移动端响应式。

## 9. Responsive Behavior

| Name | Width | Key Changes |
|---|---:|---|
| Wide | ≥ 1200px | Hero 2 栏、身份卡右置、项目 deck 2 栏 |
| Tablet | 768–1199px | 缩小身份卡、降低 deck 位移、正文保持双栏优先 |
| Mobile | < 768px | 单栏、卡片缩小、导航全屏菜单、身份卡置于标题下方 |

600px 以下不得横向溢出；按钮、菜单、手风琴和项目点位均至少 44px 触摸区域。reduced-motion 下不依赖动画来传递状态。
