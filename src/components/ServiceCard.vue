<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import AppIcon from './AppIcon.vue'
import type { Service } from '@/data/services'
import { useI18n } from '@/i18n'

const props = withDefaults(
  defineProps<{
    service: Service
    compact?: boolean
  }>(),
  {
    compact: false,
  },
)

const { t, pick } = useI18n()

const tones: Record<Service['tone'], [string, string]> = {
  blue: ['rgba(168, 199, 250, 0.18)', 'rgba(168, 199, 250, 0.7)'],
  violet: ['rgba(185, 167, 248, 0.18)', 'rgba(185, 167, 248, 0.7)'],
  cyan: ['rgba(165, 230, 224, 0.14)', 'rgba(165, 230, 224, 0.66)'],
  green: ['rgba(147, 231, 179, 0.13)', 'rgba(147, 231, 179, 0.64)'],
  peach: ['rgba(255, 210, 138, 0.13)', 'rgba(255, 210, 138, 0.62)'],
  slate: ['rgba(154, 163, 178, 0.13)', 'rgba(186, 195, 209, 0.6)'],
}

const toneStyle = computed(() => {
  const [soft, strong] = tones[props.service.tone]
  return {
    '--tone-soft': soft,
    '--tone-strong': strong,
  }
})

const orderLink = computed(() => ({
  name: 'order',
  query: { service: props.service.id },
}))
</script>

<template>
  <article class="service-card glass glass--edge card-hover" :class="{ 'service-card--compact': compact }" :style="toneStyle">
    <div class="service-card__top">
      <span class="service-card__index mono">{{ service.index }}</span>
      <span class="service-card__icon">
        <AppIcon :name="service.icon" :size="21" :stroke-width="1.7" />
      </span>
    </div>

    <div class="service-card__body">
      <h3 class="service-card__title">{{ pick(service.name) }}</h3>
      <p class="service-card__tagline">{{ pick(service.tagline) }}</p>
      <p v-if="!compact" class="service-card__desc">{{ pick(service.description) }}</p>
    </div>

    <div v-if="!compact" class="service-card__cases">
      <span class="service-card__cases-label">{{ t('servicesPage.card.useCases') }}</span>
      <ul class="service-card__case-list">
        <li v-for="useCase in service.useCases" :key="useCase['zh-CN']">
          <span class="service-card__case-dot" aria-hidden="true" />
          {{ pick(useCase) }}
        </li>
      </ul>
    </div>

    <RouterLink
      :to="orderLink"
      class="service-card__link"
      :aria-label="`${compact ? t('common.learnMore') : t('servicesPage.card.cta')} — ${pick(service.name)}`"
    >
      {{ compact ? t('common.learnMore') : t('servicesPage.card.cta') }}
      <ArrowUpRight :size="15" :stroke-width="1.8" aria-hidden="true" />
    </RouterLink>
  </article>
</template>

<style scoped>
.service-card {
  position: relative;
  display: flex;
  min-height: 100%;
  flex-direction: column;
  overflow: hidden;
  padding: 26px;
  border-radius: var(--r-md);
}

.service-card::after {
  content: "";
  position: absolute;
  top: -30%;
  right: -20%;
  z-index: 0;
  width: 70%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, var(--tone-soft), transparent 68%);
  opacity: 0.7;
  pointer-events: none;
  transition: opacity var(--dur-base) var(--ease-out);
}

.service-card:hover::after {
  opacity: 1;
}

.service-card > * {
  position: relative;
  z-index: 1;
}

.service-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.service-card__index {
  color: var(--text-tertiary);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  line-height: 1;
}

.service-card__icon {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--tone-strong);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 12px 28px -18px rgba(0, 0, 0, 0.9);
  transition:
    border-color var(--dur-base) var(--ease-out),
    background-color var(--dur-base) var(--ease-out);
}

.service-card:hover .service-card__icon {
  border-color: color-mix(in srgb, var(--tone-strong) 35%, transparent);
  background: var(--tone-soft);
}

.service-card__body {
  margin-top: 26px;
}

.service-card__title {
  font-size: 1.28rem;
  font-weight: 580;
  letter-spacing: -0.025em;
  line-height: 1.25;
}

.service-card__tagline {
  margin-top: 10px;
  color: var(--text-secondary);
  font-size: 0.88rem;
  line-height: 1.65;
}

.service-card__desc {
  margin-top: 14px;
  color: var(--text-tertiary);
  font-size: 0.83rem;
  line-height: 1.75;
}

.service-card__cases {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--line-soft);
}

.service-card__cases-label {
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-size: 0.61rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.service-card__case-list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px 16px;
  margin-top: 11px;
}

.service-card__case-list li {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--text-secondary);
  font-size: 0.77rem;
  line-height: 1.5;
}

.service-card__case-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--tone-strong);
  opacity: 0.8;
}

.service-card__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 24px;
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 520;
  transition: color var(--dur-base) var(--ease-out);
}

.service-card__link svg {
  transition: transform var(--dur-base) var(--ease-out);
}

.service-card__link:hover {
  color: var(--text);
}

.service-card__link:hover svg {
  transform: translate(2px, -2px);
}

.service-card--compact {
  padding: 22px;
}

.service-card--compact .service-card__body {
  margin-top: 20px;
}

.service-card--compact .service-card__tagline {
  margin-top: 8px;
}

.service-card--compact .service-card__link {
  padding-top: 20px;
}

@media (max-width: 900px) {
  .service-card {
    padding: 24px;
  }
}
</style>
