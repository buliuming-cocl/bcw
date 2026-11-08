# 不刘名 Coding Workstation (BCW)

不刘名工作室旗下的 AI 辅助软件开发与技术服务工作站官网。网站面向潜在合作方展示服务范围、参考价格、真实开源项目，并提供项目需求提交入口。

- 标语：**让想法，成为现实。 / Build Ideas Into Reality.**
- 语言：简体中文（默认） / English
- 架构：Vue 3 + TypeScript + Vite，纯静态站点
- 仓库：<https://github.com/buliuming-cocl/bcw>

## 技术栈

| 项目 | 选型 |
| --- | --- |
| 框架 | Vue 3（Composition API + `<script setup lang="ts">`） |
| 语言 | TypeScript |
| 构建 | Vite 7 |
| 路由 | Vue Router（History 模式） |
| 图标 | lucide-vue-next |
| 样式 | 原生 CSS + CSS Variables，无 UI 框架 |
| 字体 | Inter Variable（本地打包）+ 系统中文字体 |
| 部署 | 任意静态托管；支持子路径与 SPA 回退 |

## 已实现

- 首页：Liquid Glass 主视觉、代码工作站、服务概览、核心优势、精选项目、工作流程、CTA。
- `/services`：六项服务、适用场景、范围说明、需求入口。
- `/pricing`：Mini / Basic / Standard / Advanced 四档参考方案，明确的价格免责声明与报价因素。
- `/portfolio`：BNMB、WeQi、WeCi、SRPanel 四个项目的真实截图、双语介绍、技术栈、状态与 GitHub/在线链接。
- `/order`：带完整前端校验的需求表单、敏感信息提示、无后端时的邮件回退、可选真实 API 提交、成功/失败状态。
- `/about`：工作室介绍、定位、开发理念、AI 辅助流程、开源文化。
- `/faq`：7 个双语常见问题，单开手风琴。
- 404 页面、移动端折叠菜单、滚动玻璃化导航、语言切换、滚动揭示、`prefers-reduced-motion` 适配。
- 静态部署支持：`VITE_BASE_PATH` 子路径构建、公开资源 base 解析、构建时生成 `404.html`。

## 本地开发

要求 **Node.js >= 20.19**。

```bash
npm install
npm run dev       # 开发服务器
npm run build     # vue-tsc 类型检查 + 生产构建
npm run preview   # 预览 dist
npm run typecheck # 仅类型检查
```

默认开发地址为 Vite 输出的 `http://localhost:5173`。

## 配置

### 联系方式与品牌信息

集中在 [`src/config/site.ts`](src/config/site.ts)：

```ts
export const siteConfig = {
  email: 'buliuming1011@163.com',
  qq: '',
  wechat: '',
  // ...
}
```

- 当前邮箱取自不刘名工作室官方站点公开的联系方式。
- `qq` / `wechat` 留空时，页面显示“按需提供”，不会展示虚构号码。填入真实 ID 后会自动展示。
- 工作室、GitHub、BCW 仓库链接也在同一文件维护。

### 需求提交接口（可选）

第一版默认**不接后端**。未配置接口时，表单不会把需求写入任何服务器，也不会伪装成提交成功：

1. 校验全部字段；
2. 展示说明面板；
3. 生成可发送的邮件草稿（`mailto:`）与可复制的需求摘要；
4. 用户通过备用联系方式发送。

如需启用真实的在线提交，创建 `.env.local`（已被 `.gitignore` 忽略）：

```bash
VITE_ORDER_API_URL=https://your-api.example.com/bcw/orders
```

重新构建后，表单会对该地址发起 `POST application/json`，请求体示例：

```json
{
  "name": "示例称呼",
  "contact": "mail@example.com",
  "serviceType": "website",
  "serviceLabel": "网站开发",
  "budget": "under50",
  "budgetLabel": "¥50 以内",
  "description": "项目描述……",
  "expectedDelivery": "两周内",
  "referencePlan": "standard",
  "locale": "zh-CN",
  "consent": true,
  "source": "bcw-web"
}
```

成功条件为 HTTP 2xx，且 JSON 中没有 `{ "ok": false }`。可选返回 `id` 或 `reference` 作为提交编号：

```json
{ "ok": true, "reference": "BCW-2026-0001" }
```

注意：

- 后端需允许站点来源的 CORS `POST`。
- 只有收到 2xx 响应后才会显示“需求已发送”；显示文案仍会说明需要人工确认，不代表订单已被接受。
- 请求超时时间为 20 秒；失败时展示可重试的错误状态。
- 表单不会收集密码、API Key 或私钥，并对明显的密钥格式做前端拦截。

### 静态部署与子路径

根路径部署：

```bash
npm run build
# 将 dist/ 上传到静态托管
```

子路径部署（例如 GitHub Pages 的 `/bcw/`）：

```bash
VITE_BASE_PATH=/bcw/ npm run build
```

构建会：

- 把所有资源、logo、项目截图指向 `/bcw/...`；
- 生成 `dist/404.html`（SPA 外壳副本）。在 GitHub Pages 上，深链接会加载应用，再由 Vue Router 渲染对应页面。

其他静态托管需要配置 SPA 回退，例如 Nginx：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

GitHub Pages 的项目站点建议将 `VITE_BASE_PATH` 设置为仓库名。若使用自定义域或根部署，保持默认 `/` 即可。

本版本不接入支付，也不需要数据库或服务端渲染。

## 目录结构

```text
bcw/
├── public/
│   ├── favicon.svg
│   ├── logo.svg
│   └── images/projects/        # 四个项目的真实界面截图
├── src/
│   ├── components/             # 导航、Footer、卡片、Hero、表单反馈等
│   ├── config/site.ts          # 联系方式、仓库链接、订单接口
│   ├── data/                   # 双语结构化内容：服务/价格/项目/FAQ/理念
│   ├── directives/reveal.ts    # 轻量滚动揭示
│   ├── i18n/                   # UI 文案：zh-CN.ts / en.ts / index.ts
│   ├── router/index.ts
│   ├── styles/                 # tokens / base / components
│   ├── utils/assets.ts         # 按 BASE_URL 解析 public 资源
│   ├── views/                  # 7 个页面 + 404
│   ├── App.vue
│   └── main.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## GitHub Pages 自动部署

仓库包含 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)：

- `push` 到 `main` 或手动触发 `workflow_dispatch` 时运行；
- 使用 Node 22、`npm ci`、`npm run build`；
- 自动使用 `/<仓库名>/` 作为 `VITE_BASE_PATH`，适配项目站点 URL；
- 通过官方 `actions/configure-pages`、`actions/upload-pages-artifact` 与 `actions/deploy-pages` 发布 `dist/`。

首次使用前，在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。之后推送到 `main` 即会自动构建并发布；站点地址一般为 `https://<owner>.github.io/<repo>/`。

## 内容维护

- **UI 文案**：`src/i18n/zh-CN.ts` 与 `src/i18n/en.ts`。两边的键结构由 TypeScript 强制保持一致。
- **结构化内容**：`src/data/*.ts` 使用 `Localized` 类型保存中英文两份内容，组件通过 `pick()` 按当前语言取值。
- **项目**：`src/data/projects.ts`。新增项目时补充名称、双语简介、技术栈、状态、截图、GitHub 与可选在线地址；截图放 `public/images/projects/` 并在数据中使用 `/images/...` 路径（构建时会自动加 base）。
- **价格**：`src/data/pricing.ts`。修改价格时请保留页面上“价格仅为初步参考”的说明。
- 所有用户可见文案都应同时提供中文与英文，不要直接写死在组件模板中。

## 设计系统

- 深色 Liquid Glass：`#08090D` 背景、半透明分层、渐变描边、内部高光、环境光与噪点。
- 圆角：12 / 16 / 20 / 28 / 32px。
- 统一的 CSS Variables 位于 `src/styles/tokens.css`，玻璃材质位于 `src/styles/components.css`。
- 移动端降低 `backdrop-filter` 强度，装饰性浮动卡片在小屏幕上隐藏。
- 支持 `prefers-reduced-motion` 与 `prefers-reduced-transparency`。
- 不使用大型 UI 框架；仅引入 Vue、Vue Router、lucide 图标与本地 Inter 字体。

## 项目信息与真实性

- 四个项目均来自公开仓库，信息取自 README / 仓库元数据：
  - BNMB：<https://github.com/kenaut/BNMB>
  - WeQi：<https://github.com/openwelabs/weqi>
  - WeCi：<https://github.com/openwelabs/weci>
  - SRPanel：<https://github.com/kenaut/SRPanel>
- 截图来自各项目的公开部署页面，SRPanel 来自本地运行版本。
- 网站没有虚构客户评价、订单数量、营收、团队规模或企业资质。
- 价格页面没有虚构原价、折扣或成交数据。

## 检查结果

本版本已完成：

- `npm run build`：通过（`vue-tsc --noEmit` + Vite 生产构建）。
- 所有路由（含直接访问）与 404。
- 中英文切换、`localStorage` 持久化、页面标题与描述更新。
- 桌面 / 平板 / 手机宽度下的横向溢出检查。
- 移动端菜单、FAQ、滚动导航、表单校验、无后端回退、复制摘要、邮件回退。
- 可选 API 成功 / 失败路径（本地 mock）。
- axe-core WCAG 2 A/AA 扫描：桌面与移动端、中英文页面均无违规项。
- `prefers-reduced-motion` 下无隐藏内容。

## 尚未实现

- 后端订单持久化、邮件通知与后台管理。
- 在线支付、发票、合同签署。
- CMS；内容通过代码与数据文件维护。
- 账号体系、订单查询、客户评价。
- 自动化单元测试 / E2E 测试套件（本次使用本地 Chromium 脚本做验收）。
- 真实 QQ / 微信公开号码，需在 `src/config/site.ts` 填入后启用。

## Credits

- 图标：[Lucide](https://lucide.dev/)（ISC）
- 字体：[Inter](https://rsms.me/inter/)（SIL OFL），通过 Fontsource 本地打包
- 项目截图：不刘名工作室 / OpenWe Labs 的公开项目
- 品牌与内容：不刘名工作室
