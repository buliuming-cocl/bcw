/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional POST endpoint for the project request form. Leave unset for static hosting. */
  readonly VITE_ORDER_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}
