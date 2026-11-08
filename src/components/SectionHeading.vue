<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    accent?: string
    description?: string
    center?: boolean
    as?: 'h1' | 'h2' | 'h3'
  }>(),
  {
    center: false,
    as: 'h2',
  },
)
</script>

<template>
  <div class="section-head" :class="{ 'section-head--center': center }">
    <span v-if="eyebrow" class="eyebrow">
      <span class="eyebrow__dot" aria-hidden="true" />
      {{ eyebrow }}
    </span>
    <component :is="as" class="section-title">
      {{ title }}<span v-if="accent" class="accent">{{ accent }}</span>
    </component>
    <p v-if="description" class="section-desc">{{ description }}</p>
    <slot />
  </div>
</template>

<style scoped>
.section-title :deep(.accent) {
  margin-left: 0.22em;
}
</style>
