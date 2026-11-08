import type { Localized } from '@/i18n'

/**
 * Central site configuration.
 *
 * Contact details and the optional order endpoint live here so the deployment
 * can be configured without touching component code.
 *
 * - email: the public address listed on the studio's official website.
 * - qq / wechat: intentionally left blank until real IDs are published.
 * - orderEndpoint: set VITE_ORDER_API_URL to enable real online submission.
 */
export const siteConfig = {
  name: '不刘名 Coding Workstation',
  shortName: 'BCW',
  brandHanzi: '不刘名',
  wordmark: 'Coding Workstation',
  studioName: { 'zh-CN': '不刘名工作室', en: 'Buliuming Studio' } satisfies Localized,
  studioUrl: 'https://buliuming-cocl.github.io/',
  studioGithub: 'https://github.com/buliuming-cocl',
  github: 'https://github.com/buliuming-cocl/bcw',
  openWeLabsGithub: 'https://github.com/openwelabs',
  email: 'buliuming1011@163.com',
  qq: '',
  wechat: '',
  orderEndpoint: (import.meta.env.VITE_ORDER_API_URL ?? '').trim(),
} as const

export const contactChannels = {
  hasEmail: siteConfig.email.trim().length > 0,
  hasQq: siteConfig.qq.trim().length > 0,
  hasWechat: siteConfig.wechat.trim().length > 0,
  hasOnlineEndpoint: siteConfig.orderEndpoint.length > 0,
} as const
