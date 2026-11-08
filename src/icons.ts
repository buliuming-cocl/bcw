import {
  AppWindow,
  Bot,
  ClipboardList,
  Code2,
  Compass,
  FileCode2,
  GitBranch,
  Globe,
  LifeBuoy,
  MessageSquare,
  Rocket,
  Sparkles,
  Terminal,
  Wrench,
  CircleCheck,
} from 'lucide-vue-next'

/** Icons referenced by structured content (services, advantages, workflow). */
export const icons = {
  globe: Globe,
  'app-window': AppWindow,
  sparkles: Sparkles,
  terminal: Terminal,
  rocket: Rocket,
  'life-buoy': LifeBuoy,
  check: CircleCheck,
  message: MessageSquare,
  wrench: Wrench,
  branch: GitBranch,
  clipboard: ClipboardList,
  code: Code2,
  compass: Compass,
  bot: Bot,
  'file-code': FileCode2,
} as const

export type IconName = keyof typeof icons
