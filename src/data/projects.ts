import type { Localized } from '@/i18n'

export type ProjectId = 'bnmb' | 'weqi' | 'weci' | 'srpanel'
export type ProjectTone = 'blue' | 'violet' | 'green' | 'cyan'

export interface Project {
  id: ProjectId
  name: string
  tone: ProjectTone
  year: string
  tagline: Localized
  description: Localized
  tech: string[]
  status: Localized
  statusTone: 'live' | 'released' | 'building' | 'selfhosted'
  screenshot: string
  screenshotAlt: Localized
  github: string
  website?: string
  featured: boolean
}

/**
 * Verified project facts, taken from the public repositories and live builds.
 * No metrics, outcomes or testimonials are invented here.
 */
export const projects: Project[] = [
  {
    id: 'bnmb',
    name: 'BNMB',
    tone: 'blue',
    year: '2026',
    tagline: {
      'zh-CN': '变にまび · 日语动词活用训练',
      en: 'Heni-mabi · Japanese verb conjugation trainer',
    },
    description: {
      'zh-CN':
        '开源的日语动词活用训练工具，内置 597 个 JLPT N5–N1 动词，支持 12 种活用形、双向出题与本地学习统计。纯前端应用，无需账号。',
      en: 'An open-source Japanese verb conjugation trainer with 597 JLPT N5–N1 verbs, 12 conjugation forms, bidirectional prompts and local progress stats. A pure front-end app with no account required.',
    },
    tech: ['React 18', 'TypeScript', 'Vite', 'Vitest'],
    status: { 'zh-CN': '已上线', en: 'Live' },
    statusTone: 'live',
    screenshot: '/images/projects/bnmb.webp',
    screenshotAlt: {
      'zh-CN': 'BNMB 日语动词训练主页截图',
      en: 'Screenshot of the BNMB Japanese verb trainer home screen',
    },
    github: 'https://github.com/kenaut/BNMB',
    website: 'https://kenaut.github.io/BNMB/',
    featured: true,
  },
  {
    id: 'weqi',
    name: 'WeQi',
    tone: 'green',
    year: '2026',
    tagline: {
      'zh-CN': '开源的桌面国际象棋',
      en: 'Open-source desktop chess',
    },
    description: {
      'zh-CN':
        '现代、简洁的开源桌面国际象棋应用。完整棋规由本地 C++ 引擎实现，支持人人对战、人机对战、AI 对战与复盘，并提供 7 种界面语言。',
      en: 'A modern, clean open-source desktop chess app. Full chess rules are implemented in a local C++ engine, with local and AI play, replays, and seven interface languages.',
    },
    tech: ['C++17', 'Qt 6', 'CMake', 'Python 3'],
    status: { 'zh-CN': 'v1.0 已发布', en: 'v1.0 released' },
    statusTone: 'released',
    screenshot: '/images/projects/weqi.webp',
    screenshotAlt: {
      'zh-CN': 'WeQi 官网首页与棋盘界面截图',
      en: 'Screenshot of the WeQi website hero and chessboard',
    },
    github: 'https://github.com/openwelabs/weqi',
    website: 'https://openwelabs.github.io/weqi-web/',
    featured: true,
  },
  {
    id: 'weci',
    name: 'WeCi',
    tone: 'violet',
    year: '2026',
    tagline: {
      'zh-CN': '本地优先的 AI 对话与 Agent 工作台',
      en: 'A local-first AI chat and agent workbench',
    },
    description: {
      'zh-CN':
        '开源、本地优先的 AI 对话客户端与 Agent 工作台。支持流式回复、图片与文件输入、MCP 连接，以及任意 OpenAI-compatible 模型服务。',
      en: 'An open-source, local-first AI chat client and agent workbench. Streaming replies, image and file input, MCP connections and any OpenAI-compatible model service.',
    },
    tech: ['Python', 'JavaScript', 'SSE', 'MCP'],
    status: { 'zh-CN': '开发中', en: 'In development' },
    statusTone: 'building',
    screenshot: '/images/projects/weci.webp',
    screenshotAlt: {
      'zh-CN': 'WeCi 官网首页截图',
      en: 'Screenshot of the WeCi website home page',
    },
    github: 'https://github.com/openwelabs/weci',
    website: 'https://openwelabs.github.io/weci-web/',
    featured: true,
  },
  {
    id: 'srpanel',
    name: 'SRPanel',
    tone: 'cyan',
    year: '2026',
    tagline: {
      'zh-CN': '开源服务器资源监控面板',
      en: 'Open-source server resource panel',
    },
    description: {
      'zh-CN':
        '基于 Flask 与 psutil 的服务器资源监控面板，采集 CPU、内存、磁盘与网络数据，提供 JSON API 与双语界面。无需数据库，可自行部署。',
      en: 'A server resource dashboard built on Flask and psutil, collecting CPU, memory, disk and network data with a JSON API and a bilingual interface. No database required; self-hostable.',
    },
    tech: ['Python', 'Flask', 'psutil', 'JavaScript'],
    status: { 'zh-CN': '可自部署', en: 'Self-hostable' },
    statusTone: 'selfhosted',
    screenshot: '/images/projects/srpanel.webp',
    screenshotAlt: {
      'zh-CN': 'SRPanel 服务器监控仪表盘截图',
      en: 'Screenshot of the SRPanel server monitoring dashboard',
    },
    github: 'https://github.com/kenaut/SRPanel',
    featured: false,
  },
]

export function findProject(id: ProjectId): Project {
  const project = projects.find((item) => item.id === id)
  if (!project) throw new Error(`Unknown project: ${id}`)
  return project
}
