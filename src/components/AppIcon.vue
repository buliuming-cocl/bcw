<script setup lang="ts">
import { computed } from 'vue'
import { icons, type IconName } from '@/icons'

const props = withDefaults(
  defineProps<{
    name: IconName
    size?: number
    strokeWidth?: number
  }>(),
  {
    size: 20,
    strokeWidth: 1.7,
  },
)

const component = computed(() => icons[props.name])
</script>

<template>
  <component :is="component" :size="size" :stroke-width="strokeWidth" aria-hidden="true" />
</template>
