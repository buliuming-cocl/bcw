import type { Localized } from '@/i18n'

export type ContentIcon =
  | 'sparkles'
  | 'check'
  | 'message'
  | 'wrench'
  | 'branch'
  | 'clipboard'
  | 'code'
  | 'rocket'
  | 'compass'
  | 'bot'
  | 'file-code'

export interface Advantage {
  id: string
  icon: ContentIcon
  title: Localized
  description: Localized
  wide?: boolean
}

export const advantages: Advantage[] = [
  {
    id: 'ai',
    icon: 'sparkles',
    wide: true,
    title: { 'zh-CN': 'AI 辅助，但不盲目自动化', en: 'AI-assisted, without blind automation' },
    description: {
      'zh-CN':
        '用 AI 加速探索与重复实现；关键逻辑、边界条件和最终交付仍然逐项人工检查。速度不该以不可维护为代价。',
      en: 'AI speeds up exploration and repetitive implementation. Key logic, edge cases and the final delivery are still reviewed item by item. Speed should not come at the cost of maintainability.',
    },
  },
  {
    id: 'scope',
    icon: 'check',
    title: { 'zh-CN': '范围先说清楚', en: 'Scope made clear first' },
    description: {
      'zh-CN': '开始前确认包含什么、不包含什么，减少做到一半才发现理解不一致。',
      en: 'Confirm what is and is not included before starting, so mismatched expectations do not surface halfway through.',
    },
  },
  {
    id: 'direct',
    icon: 'message',
    title: { 'zh-CN': '直接沟通', en: 'Direct communication' },
    description: {
      'zh-CN': '需求、变更和风险直接说清楚，不经过层层转述。',
      en: 'Requirements, changes and risks are stated directly, with no layers of retelling.',
    },
  },
  {
    id: 'maintain',
    icon: 'wrench',
    title: { 'zh-CN': '能接手的交付', en: 'Handover-ready delivery' },
    description: {
      'zh-CN': '结构清晰、依赖克制，并留下必要的运行与维护说明。',
      en: 'Clear structure, restrained dependencies and the notes needed to run and maintain the result.',
    },
  },
  {
    id: 'open',
    icon: 'branch',
    title: { 'zh-CN': '开源 DNA', en: 'Open-source DNA' },
    description: {
      'zh-CN': '多个项目公开在 GitHub，代码风格与工作方式可以直接查看。',
      en: 'Several projects are public on GitHub, so the code style and working approach can be inspected directly.',
    },
  },
]

export interface WorkflowStep {
  id: string
  icon: ContentIcon
  title: Localized
  description: Localized
}

export const workflowSteps: WorkflowStep[] = [
  {
    id: 'brief',
    icon: 'clipboard',
    title: { 'zh-CN': '需求与边界', en: 'Brief & boundaries' },
    description: {
      'zh-CN': '说明目标、使用场景和不做什么。必要时先补一轮问题清单。',
      en: 'Clarify the goal, the use cases and what is out of scope. A short question list comes first when needed.',
    },
  },
  {
    id: 'scope',
    icon: 'compass',
    title: { 'zh-CN': '方案与参考报价', en: 'Scope & reference quote' },
    description: {
      'zh-CN': '拆成可交付的模块，确认技术方案、时间与价格区间。',
      en: 'Break the work into deliverables, then confirm the technical approach, timing and price range.',
    },
  },
  {
    id: 'build',
    icon: 'code',
    title: { 'zh-CN': '开发与联调', en: 'Build & integrate' },
    description: {
      'zh-CN': '按阶段推进，持续可预览；关键节点一起确认，不把问题留到最后。',
      en: 'Work progresses in stages with something previewable throughout. Key checkpoints are confirmed together, not deferred to the end.',
    },
  },
  {
    id: 'ship',
    icon: 'rocket',
    title: { 'zh-CN': '交付与维护', en: 'Ship & maintain' },
    description: {
      'zh-CN': '交付源码、运行说明与部署协助；维护范围另行约定。',
      en: 'Hand over source code, run notes and deployment help. Maintenance scope is agreed separately.',
    },
  },
]

export interface Principle {
  id: string
  icon: ContentIcon
  title: Localized
  description: Localized
}

export const principles: Principle[] = [
  {
    id: 'scope',
    icon: 'compass',
    title: { 'zh-CN': '先把范围说清楚', en: 'Scope before code' },
    description: {
      'zh-CN': '明确要做什么、不做什么，比堆功能更重要。',
      en: 'Being explicit about what will and will not be built matters more than piling on features.',
    },
  },
  {
    id: 'ai',
    icon: 'bot',
    title: { 'zh-CN': 'AI 是工具，不是借口', en: 'AI is a tool, not an excuse' },
    description: {
      'zh-CN': '用 AI 加速探索与实现，但每个交付都由人验证。',
      en: 'AI accelerates exploration and implementation, but every deliverable is verified by a human.',
    },
  },
  {
    id: 'handover',
    icon: 'file-code',
    title: { 'zh-CN': '代码要能被接手', en: 'Code should be handover-ready' },
    description: {
      'zh-CN': '尽量保持结构清晰、依赖克制，并留下必要的说明。',
      en: 'Keep the structure clear, the dependencies restrained, and leave the necessary documentation.',
    },
  },
  {
    id: 'open',
    icon: 'branch',
    title: { 'zh-CN': '公开地做事', en: 'Work in the open' },
    description: {
      'zh-CN': '能开源的部分就开源；项目进展与边界保持可查。',
      en: 'Open-source what can be open-sourced, and keep progress and boundaries inspectable.',
    },
  },
]

export interface PositioningItem {
  id: string
  index: string
  title: Localized
  description: Localized
}

export const positioningItems: PositioningItem[] = [
  {
    id: 'design',
    index: '01',
    title: { 'zh-CN': '设计与实现', en: 'Design + implementation' },
    description: {
      'zh-CN': '视觉与代码不是两个阶段。界面结构、交互和实现方式一起考虑，减少“设计稿很好但做不出来”。',
      en: 'Visual design and code are not separate phases. Interface structure, interaction and implementation are considered together, so the build does not collapse under an unrealistic mockup.',
    },
  },
  {
    id: 'ai',
    index: '02',
    title: { 'zh-CN': 'AI 与工程判断', en: 'AI + engineering judgement' },
    description: {
      'zh-CN': '把 AI 放进流程，而不是放进宣传语。能否使用、何时停用、如何验证，都由具体问题决定。',
      en: 'AI belongs in the workflow, not the tagline. Whether to use it, when to stop and how to verify are decided by the concrete problem.',
    },
  },
  {
    id: 'maintain',
    index: '03',
    title: { 'zh-CN': '构建与维护', en: 'Build + maintain' },
    description: {
      'zh-CN': '交付不是终点。能继续运行、能被别人接手、能在需要时修改，才算真正完成。',
      en: 'Delivery is not the finish line. Something is complete when it keeps running, can be handed over and can be changed when needed.',
    },
  },
]

export interface PricingFactor {
  id: string
  title: Localized
  description: Localized
}

export const pricingFactors: PricingFactor[] = [
  {
    id: 'scope',
    title: { 'zh-CN': '功能与页面范围', en: 'Features and page count' },
    description: {
      'zh-CN': '页面数量、交互复杂度、是否需要登录、数据存储或后台管理。',
      en: 'Number of pages, interaction complexity, and whether login, data storage or admin tooling is needed.',
    },
  },
  {
    id: 'integrations',
    title: { 'zh-CN': '接口与 AI 集成', en: 'APIs and AI integration' },
    description: {
      'zh-CN': '第三方服务、模型接口、流式输出与错误处理都会增加实际工作量。',
      en: 'Third-party services, model APIs, streaming output and error handling all add real work.',
    },
  },
  {
    id: 'content',
    title: { 'zh-CN': '内容与素材准备', en: 'Content and assets' },
    description: {
      'zh-CN': '文案、图片、品牌素材是否齐备，是否需要一起整理或设计。',
      en: 'Whether copy, images and brand assets are ready, or need to be organized or designed as part of the work.',
    },
  },
  {
    id: 'timeline',
    title: { 'zh-CN': '时间与修订轮次', en: 'Timeline and revisions' },
    description: {
      'zh-CN': '交付时间、验收方式与修订轮次会影响排期，也会影响最终报价。',
      en: 'Deadline, acceptance process and revision rounds affect scheduling, and therefore the final quote.',
    },
  },
]
