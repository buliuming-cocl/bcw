import type { Localized } from '@/i18n'

export interface FaqItem {
  id: string
  question: Localized
  answer: Localized
}

export const faqItems: FaqItem[] = [
  {
    id: 'submit',
    question: { 'zh-CN': '如何提交需求？', en: 'How do I submit a request?' },
    answer: {
      'zh-CN':
        '在“提交需求”页面填写姓名、联系方式、服务类型、预算范围和项目描述即可，不需要注册。表单会先检查必填项，再给出提交结果。你也可以直接发邮件，说明同样的信息。第一版不接入支付，提交需求也不等于订单已被接受。',
      en: 'Use the “Start a Project” page to provide your name, contact details, service type, budget range and project description. No account is needed. The form validates required fields before showing a result. You can also send the same details by email. This version has no payment integration, and submitting a brief does not mean the project is accepted.',
    },
  },
  {
    id: 'pricing',
    question: { 'zh-CN': '如何确定价格？', en: 'How is pricing determined?' },
    answer: {
      'zh-CN':
        '页面上的 Mini、Basic、Standard 是参考起点，不是固定总价；Advanced 按需求报价。最终价格取决于需求复杂度、工作量、交付范围与时间要求。开始前会把包含与不包含的内容列清楚，再确认报价。',
      en: 'Mini, Basic and Standard are reference starting points, not fixed totals. Advanced is quoted per brief. The final price depends on complexity, effort, delivery scope and timing. Before work starts, the included and excluded items are listed clearly, then the quote is confirmed.',
    },
  },
  {
    id: 'open-source',
    question: { 'zh-CN': '是否支持开源项目？', en: 'Do you support open-source projects?' },
    answer: {
      'zh-CN':
        '支持。开源、公益或愿意公开成果的项目，可以在范围和报价上单独讨论。具体怎么合作、代码放在哪里、如何署名，都以双方确认的方案为准。',
      en: 'Yes. For open-source, public-interest or otherwise public projects, scope and pricing can be discussed separately. Collaboration terms, where the code lives and attribution are confirmed in writing by both sides.',
    },
  },
  {
    id: 'ai',
    question: { 'zh-CN': '是否支持 AI 集成？', en: 'Is AI integration supported?' },
    answer: {
      'zh-CN':
        '支持常见的 AI 集成，包括 OpenAI-compatible API、对话界面、流式输出、检索与 Agent 工具调用。模型服务和费用通常由你提供或承担。请不要在需求表单中提交 API Key、密码或私钥；配置方式会在开始后单独沟通。',
      en: 'Yes — common integrations include OpenAI-compatible APIs, chat interfaces, streaming output, retrieval and tool-using agents. The model service and its costs are usually provided or covered by you. Never submit API keys, passwords or private keys in the request form; configuration is handled separately after work begins.',
    },
  },
  {
    id: 'delivery',
    question: { 'zh-CN': '如何交付？', en: 'How is delivery handled?' },
    answer: {
      'zh-CN':
        '静态网站通常交付源码与构建产物，并协助部署；桌面或后端项目会提供运行说明与依赖清单。具体交付物、验收方式和时间会在开始前的范围说明中写清楚，避免只留下一个无法运行的压缩包。',
      en: 'Static sites usually include the source code and build output, plus deployment help. Desktop or backend projects include run instructions and a dependency list. Deliverables, acceptance criteria and timing are written into the scope before work begins, so you are not left with an archive that cannot run.',
    },
  },
  {
    id: 'maintenance',
    question: { 'zh-CN': '是否提供维护？', en: 'Is maintenance available?' },
    answer: {
      'zh-CN':
        '可以按项目需要安排维护与迭代。维护范围、频率和费用会在交付前单独确认，不默认包含在开发报价中。小问题可以按次处理，也可以约定一个阶段性的维护范围。',
      en: 'Maintenance and further iteration can be arranged based on the project. Its scope, frequency and cost are confirmed separately before delivery and are not automatically included in the development quote. Small issues can be handled per request, or a phased maintenance scope can be agreed.',
    },
  },
  {
    id: 'contact',
    question: { 'zh-CN': '如何联系？', en: 'How can I get in touch?' },
    answer: {
      'zh-CN':
        '优先使用邮箱，邮件里可以直接附上需求、链接或已有项目背景。GitHub 适合补充代码和 issue。QQ / 微信目前按需提供，具体号码会在确认需求后告知，不会公开放在页面上。',
      en: 'Email is the best first contact — include the brief, links or existing project context. GitHub is useful for code and issues. QQ / WeChat are available on request; the details are shared after the inquiry is confirmed and are not published on this page.',
    },
  },
]
