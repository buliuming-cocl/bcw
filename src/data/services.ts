import type { Localized } from '@/i18n'

export type ServiceId =
  | 'website'
  | 'software'
  | 'ai'
  | 'environment'
  | 'deployment'
  | 'support'

export type ServiceIcon =
  | 'globe'
  | 'app-window'
  | 'sparkles'
  | 'terminal'
  | 'rocket'
  | 'life-buoy'

export type ServiceTone = 'blue' | 'violet' | 'cyan' | 'green' | 'peach' | 'slate'

export interface Service {
  id: ServiceId
  index: string
  icon: ServiceIcon
  tone: ServiceTone
  name: Localized
  tagline: Localized
  description: Localized
  useCases: Localized[]
}

export const services: Service[] = [
  {
    id: 'website',
    index: '01',
    icon: 'globe',
    tone: 'blue',
    name: { 'zh-CN': '网站开发', en: 'Website Development' },
    tagline: {
      'zh-CN': '从落地页到内容站点，先把门面做对。',
      en: 'From landing pages to content sites — get the front door right.',
    },
    description: {
      'zh-CN':
        '响应式网站、产品落地页与内容型站点。关注加载速度、可读性与后续维护，不堆砌无用的交互。',
      en: 'Responsive websites, product landing pages and content-driven sites. Focused on load speed, readability and maintainability — not decorative interactions for their own sake.',
    },
    useCases: [
      { 'zh-CN': '工作室官网', en: 'Studio website' },
      { 'zh-CN': '产品落地页', en: 'Product landing page' },
      { 'zh-CN': '文档与内容站', en: 'Docs & content site' },
    ],
  },
  {
    id: 'software',
    index: '02',
    icon: 'app-window',
    tone: 'violet',
    name: { 'zh-CN': '软件开发', en: 'Software Development' },
    tagline: {
      'zh-CN': '把小工具做成真正顺手的软件。',
      en: 'Turn a small tool into software that feels right to use.',
    },
    description: {
      'zh-CN':
        '桌面工具、内部效率工具与小型 Web 应用。先明确核心流程，再做界面，避免为了显得复杂而复杂。',
      en: 'Desktop utilities, internal productivity tools and small web apps. The core flow comes first, the interface second — avoiding complexity for its own sake.',
    },
    useCases: [
      { 'zh-CN': '效率工具', en: 'Productivity tool' },
      { 'zh-CN': '桌面应用', en: 'Desktop app' },
      { 'zh-CN': '内部管理系统', en: 'Internal tool' },
    ],
  },
  {
    id: 'ai',
    index: '03',
    icon: 'sparkles',
    tone: 'cyan',
    name: { 'zh-CN': 'AI 功能集成', en: 'AI Integration' },
    tagline: {
      'zh-CN': '让 AI 真正进入产品流程，而不是一个摆设。',
      en: 'Make AI part of the product flow, not a decoration.',
    },
    description: {
      'zh-CN':
        '在现有产品或新项目中接入对话、检索、Agent 工具调用等能力。模型服务可以是你自己的 OpenAI-compatible API。',
      en: 'Add chat, retrieval or tool-using agent capabilities to an existing product or a new one. The model service can be your own OpenAI-compatible API.',
    },
    useCases: [
      { 'zh-CN': 'AI 对话界面', en: 'Chat interface' },
      { 'zh-CN': 'Agent 工具调用', en: 'Tool-using agent' },
      { 'zh-CN': '现有产品集成', en: 'Product integration' },
    ],
  },
  {
    id: 'environment',
    index: '04',
    icon: 'terminal',
    tone: 'green',
    name: { 'zh-CN': '开发环境配置', en: 'Environment Setup' },
    tagline: {
      'zh-CN': '让项目在每台机器上都能跑起来。',
      en: 'Make the project run on every machine.',
    },
    description: {
      'zh-CN':
        '开发环境、构建工具链与本地配置。解决依赖冲突、版本混乱与“只有一台机器能跑”的问题。',
      en: 'Development environments, build toolchains and local configuration. Fix dependency conflicts, version drift and the “it only runs on one machine” problem.',
    },
    useCases: [
      { 'zh-CN': '新机器初始化', en: 'New machine setup' },
      { 'zh-CN': '构建与工具链', en: 'Build toolchain' },
      { 'zh-CN': '团队环境统一', en: 'Team consistency' },
    ],
  },
  {
    id: 'deployment',
    index: '05',
    icon: 'rocket',
    tone: 'peach',
    name: { 'zh-CN': '部署协助', en: 'Deployment Assistance' },
    tagline: {
      'zh-CN': '从本地可跑到别人也能打开。',
      en: 'From “works locally” to “anyone can open it”.',
    },
    description: {
      'zh-CN':
        '静态托管、服务器部署、域名与 HTTPS 配置协助。上线前检查构建产物，并留下运行与维护说明。',
      en: 'Static hosting, server deployment, domain and HTTPS configuration. Build output is checked before launch, with run and maintenance notes handed over.',
    },
    useCases: [
      { 'zh-CN': '静态站点上线', en: 'Static deployment' },
      { 'zh-CN': '服务器部署', en: 'Server setup' },
      { 'zh-CN': '域名与 HTTPS', en: 'Domain & HTTPS' },
    ],
  },
  {
    id: 'support',
    index: '06',
    icon: 'life-buoy',
    tone: 'slate',
    name: { 'zh-CN': '技术支持与维护', en: 'Technical Support' },
    tagline: {
      'zh-CN': '项目上线之后，问题仍然有人接。',
      en: 'After launch, there is still someone to pick up the problem.',
    },
    description: {
      'zh-CN':
        '已有项目的故障排查、小功能迭代与日常维护。维护范围可以按次或按阶段约定，不强制打包成年费。',
      en: 'Troubleshooting, small improvements and day-to-day maintenance for existing projects. Support can be scoped per issue or per phase — no mandatory annual bundle.',
    },
    useCases: [
      { 'zh-CN': '问题排查', en: 'Troubleshooting' },
      { 'zh-CN': '小步迭代', en: 'Small improvements' },
      { 'zh-CN': '长期维护', en: 'Ongoing maintenance' },
    ],
  },
]

export const serviceSelectOptions: { id: ServiceId | 'other'; name: Localized }[] = [
  ...services.map((service) => ({ id: service.id, name: service.name })),
  { id: 'other', name: { 'zh-CN': '其他 / 尚未确定', en: 'Other / not sure yet' } },
]
