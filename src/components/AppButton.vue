<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import { useI18n } from '@/i18n'

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    href?: string
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'glass' | 'ghost'
    size?: 'sm' | 'md'
    block?: boolean
    arrow?: boolean
    newTab?: boolean
    disabled?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'md',
    block: false,
    arrow: false,
    newTab: true,
    disabled: false,
  },
)

const { t } = useI18n()

const tag = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const bindings = computed<Record<string, unknown>>(() => {
  if (props.to) return { to: props.to }
  if (props.href) {
    return {
      href: props.href,
      target: props.newTab ? '_blank' : undefined,
      rel: props.newTab ? 'noopener noreferrer' : undefined,
    }
  }
  return { type: props.type, disabled: props.disabled }
})

const classes = computed(() => [
  `btn--${props.variant}`,
  props.size === 'sm' ? 'btn--sm' : '',
  props.block ? 'btn--block' : '',
])
</script>

<template>
  <component :is="tag" v-bind="bindings" class="btn" :class="classes">
    <slot />
    <span v-if="arrow" class="btn__icon btn__icon--shift">
      <ArrowUpRight :size="size === 'sm' ? 15 : 17" :stroke-width="1.8" aria-hidden="true" />
    </span>
    <span v-if="href && newTab" class="sr-only">({{ t('common.openInNewTab') }})</span>
  </component>
</template>
