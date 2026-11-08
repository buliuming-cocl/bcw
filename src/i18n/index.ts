import { computed, readonly, ref } from 'vue'
import zhCN, { type Messages } from './zh-CN'
import en from './en'

export type Locale = 'zh-CN' | 'en'

/** Bilingual content is stored once, keyed by locale, and resolved at render time. */
export type Localized<T = string> = Record<Locale, T>

export const SUPPORTED_LOCALES: readonly Locale[] = ['zh-CN', 'en'] as const

const STORAGE_KEY = 'bcw.locale'

const messages: Record<Locale, Messages> = {
  'zh-CN': zhCN,
  en,
}

type LeafPaths<T> = T extends string
  ? never
  : {
      [K in keyof T & string]: T[K] extends string ? K : `${K}.${LeafPaths<T[K]>}`
    }[keyof T & string]

export type MessageKey = LeafPaths<Messages>

export type MessageParams = Record<string, string | number>

function isLocale(value: string | null): value is Locale {
  return value === 'zh-CN' || value === 'en'
}

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'zh-CN'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLocale(stored)) return stored
  } catch {
    // Storage can be unavailable in private contexts; default Chinese is fine.
  }
  return 'zh-CN'
}

function resolveMessage(dictionary: Messages, key: string): string {
  const segments = key.split('.')
  let current: unknown = dictionary
  for (const segment of segments) {
    if (typeof current !== 'object' || current === null) return key
    current = (current as Record<string, unknown>)[segment]
  }
  return typeof current === 'string' ? current : key
}

export function interpolate(template: string, params?: MessageParams): string {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (match, token: string) =>
    token in params ? String(params[token]) : match,
  )
}

const localeRef = ref<Locale>(readStoredLocale())

function applyDocumentLocale(next: Locale): void {
  if (typeof document === 'undefined') return
  document.documentElement.lang = next
  document.documentElement.dataset.locale = next
}

applyDocumentLocale(localeRef.value)

/**
 * Public reactive locale. Components read it for reactivity but must switch
 * through setLocale/toggleLocale so persistence stays consistent.
 */
export const locale = readonly(localeRef)

export function setLocale(next: Locale): void {
  if (next === localeRef.value) return
  localeRef.value = next
  applyDocumentLocale(next)
  try {
    window.localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Preference persistence is best-effort.
  }
}

export function toggleLocale(): void {
  setLocale(localeRef.value === 'zh-CN' ? 'en' : 'zh-CN')
}

export function translate(key: MessageKey, params?: MessageParams): string {
  return interpolate(resolveMessage(messages[localeRef.value], key), params)
}

export function useI18n() {
  const pick = <T>(value: Localized<T>): T => value[localeRef.value]

  return {
    locale,
    t: translate,
    pick,
    setLocale,
    toggleLocale,
    isEnglish: computed(() => localeRef.value === 'en'),
  }
}

export { messages }
