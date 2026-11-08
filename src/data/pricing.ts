import type { Localized } from '@/i18n'

export type PlanId = 'mini' | 'basic' | 'standard' | 'advanced'
export type PlanTone = 'blue' | 'violet' | 'cyan' | 'slate'

export interface PricingPlan {
  id: PlanId
  name: string
  tone: PlanTone
  price: Localized
  pricePrefix: Localized
  priceSuffix: Localized
  tagline: Localized
  features: Localized[]
  scope: Localized
  recommended?: boolean
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'mini',
    name: 'Mini',
    tone: 'slate',
    price: { 'zh-CN': '¥10', en: '¥10' },
    pricePrefix: { 'zh-CN': '', en: 'from' },
    priceSuffix: { 'zh-CN': '起', en: '' },
    tagline: {
      'zh-CN': '一个轻量入口，先把想法放到网上。',
      en: 'A lightweight entry point to get an idea online.',
    },
    features: [
      { 'zh-CN': '单页静态页面或简单工具界面', en: 'Single static page or simple tool interface' },
      { 'zh-CN': '基础响应式适配', en: 'Essential responsive layout' },
      { 'zh-CN': '一次内容或样式修订', en: 'One round of content or style revisions' },
      { 'zh-CN': '部署到静态托管', en: 'Deployment to static hosting' },
      { 'zh-CN': '源码与运行说明', en: 'Source code and run notes' },
    ],
    scope: {
      'zh-CN': '个人介绍页、活动页、简单文档页',
      en: 'Personal intro, event page, simple docs page',
    },
  },
  {
    id: 'basic',
    name: 'Basic',
    tone: 'blue',
    price: { 'zh-CN': '¥20', en: '¥20' },
    pricePrefix: { 'zh-CN': '', en: 'from' },
    priceSuffix: { 'zh-CN': '起', en: '' },
    tagline: {
      'zh-CN': '一个完整的单页落地体验。',
      en: 'A complete single-page landing experience.',
    },
    features: [
      { 'zh-CN': '完整单页落地页', en: 'Complete single-page landing site' },
      { 'zh-CN': '定制视觉与轻量动效', en: 'Custom visual treatment and light motion' },
      { 'zh-CN': '移动端适配与基础 SEO', en: 'Mobile layout and basic SEO' },
      { 'zh-CN': '两轮修订', en: 'Two revision rounds' },
      { 'zh-CN': '部署协助', en: 'Deployment assistance' },
    ],
    scope: {
      'zh-CN': '产品落地页、服务介绍页、作品集',
      en: 'Product landing page, services page, portfolio',
    },
  },
  {
    id: 'standard',
    name: 'Standard',
    tone: 'violet',
    price: { 'zh-CN': '¥50', en: '¥50' },
    pricePrefix: { 'zh-CN': '', en: 'from' },
    priceSuffix: { 'zh-CN': '起', en: '' },
    tagline: {
      'zh-CN': '多页面站点或一个小型 Web 应用。',
      en: 'A multi-page site or a small web application.',
    },
    features: [
      { 'zh-CN': '多页面网站或小型 Web 应用', en: 'Multi-page site or small web app' },
      { 'zh-CN': '组件化设计与开发', en: 'Component-based design and development' },
      { 'zh-CN': '表单、内容或基础 API 对接', en: 'Forms, content or basic API integration' },
      { 'zh-CN': '性能与可访问性检查', en: 'Performance and accessibility pass' },
      { 'zh-CN': '三轮修订与部署协助', en: 'Three revision rounds and deployment help' },
    ],
    scope: {
      'zh-CN': '工作室官网、工具站、内容型站点',
      en: 'Studio site, tool site, content-driven site',
    },
    recommended: true,
  },
  {
    id: 'advanced',
    name: 'Advanced',
    tone: 'cyan',
    price: { 'zh-CN': '按需报价', en: 'Custom' },
    pricePrefix: { 'zh-CN': '', en: '' },
    priceSuffix: { 'zh-CN': '', en: 'quote' },
    tagline: {
      'zh-CN': '按需求定制的完整产品。',
      en: 'A complete product shaped around the brief.',
    },
    features: [
      { 'zh-CN': '按需求定制的完整应用', en: 'Fully custom application' },
      { 'zh-CN': 'AI 功能集成与后端接口', en: 'AI integration and backend APIs' },
      { 'zh-CN': '复杂交互与数据流程', en: 'Complex interactions and data flows' },
      { 'zh-CN': '部署、文档与维护建议', en: 'Deployment, documentation and maintenance guidance' },
      { 'zh-CN': '按里程碑拆分报价', en: 'Milestone-based quote' },
    ],
    scope: {
      'zh-CN': 'AI 产品、内部工具、长期维护项目',
      en: 'AI product, internal tool, long-term project',
    },
  },
]

export function findPlan(id: string | null | undefined): PricingPlan | undefined {
  if (!id) return undefined
  return pricingPlans.find((plan) => plan.id === id)
}

export type BudgetId = 'under50' | '50to200' | '200to1000' | 'over1000' | 'unsure'

export interface BudgetOption {
  id: BudgetId
  label: Localized
}

export const budgetOptions: BudgetOption[] = [
  { id: 'under50', label: { 'zh-CN': '¥50 以内', en: 'Under ¥50' } },
  { id: '50to200', label: { 'zh-CN': '¥50 – ¥200', en: '¥50 – ¥200' } },
  { id: '200to1000', label: { 'zh-CN': '¥200 – ¥1,000', en: '¥200 – ¥1,000' } },
  { id: 'over1000', label: { 'zh-CN': '¥1,000 以上', en: 'Over ¥1,000' } },
  { id: 'unsure', label: { 'zh-CN': '暂不确定', en: 'Not sure yet' } },
]
