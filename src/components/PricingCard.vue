<script setup lang="ts">
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'
import AppButton from './AppButton.vue'
import type { PricingPlan } from '@/data/pricing'
import { useI18n } from '@/i18n'

const props = defineProps<{
  plan: PricingPlan
}>()

const { t, pick } = useI18n()

const tones: Record<PricingPlan['tone'], [string, string]> = {
  blue: ['rgba(168, 199, 250, 0.16)', 'rgba(168, 199, 250, 0.72)'],
  violet: ['rgba(185, 167, 248, 0.17)', 'rgba(185, 167, 248, 0.75)'],
  cyan: ['rgba(165, 230, 224, 0.13)', 'rgba(165, 230, 224, 0.66)'],
  slate: ['rgba(154, 163, 178, 0.12)', 'rgba(193, 201, 213, 0.62)'],
}

const toneStyle = computed(() => {
  const [soft, strong] = tones[props.plan.tone]
  return {
    '--plan-soft': soft,
    '--plan-strong': strong,
  }
})

const orderLink = computed(() => ({
  name: 'order',
  query: { plan: props.plan.id },
}))

const isCustom = computed(() => props.plan.id === 'advanced')
</script>

<template>
  <article
    class="pricing-card glass glass--edge"
    :class="{ 'is-featured': plan.recommended, 'is-custom': isCustom }"
    :style="toneStyle"
  >
    <div class="pricing-card__accent" aria-hidden="true" />

    <div class="pricing-card__head">
      <div class="pricing-card__name-row">
        <h3 class="pricing-card__name">{{ plan.name }}</h3>
        <span v-if="plan.recommended" class="pricing-card__badge">
          {{ t('pricingPage.plans.recommended') }}
        </span>
      </div>
      <p class="pricing-card__tagline">{{ pick(plan.tagline) }}</p>
    </div>

    <div class="pricing-card__price">
      <span v-if="pick(plan.pricePrefix)" class="pricing-card__price-prefix">
        {{ pick(plan.pricePrefix) }}
      </span>
      <span class="pricing-card__price-value">{{ pick(plan.price) }}</span>
      <span v-if="pick(plan.priceSuffix)" class="pricing-card__price-suffix">
        {{ pick(plan.priceSuffix) }}
      </span>
    </div>

    <div class="pricing-card__rule" aria-hidden="true" />

    <div class="pricing-card__includes">
      <span class="pricing-card__label">{{ t('pricingPage.plans.includesLabel') }}</span>
      <ul>
        <li v-for="feature in plan.features" :key="feature['zh-CN']">
          <Check :size="14" :stroke-width="2" aria-hidden="true" />
          <span>{{ pick(feature) }}</span>
        </li>
      </ul>
    </div>

    <div class="pricing-card__scope">
      <span class="pricing-card__label">{{ t('pricingPage.plans.scopeLabel') }}</span>
      <p>{{ pick(plan.scope) }}</p>
    </div>

    <div class="pricing-card__action">
      <AppButton :to="orderLink" :variant="plan.recommended ? 'primary' : 'glass'" block>
        {{ t('pricingPage.plans.cta') }}
      </AppButton>
    </div>
  </article>
</template>

<style scoped>
.pricing-card {
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  padding: 26px;
  border-radius: var(--r-lg);
  background:
    radial-gradient(120% 70% at 100% 0%, var(--plan-soft), transparent 54%),
    var(--glass-fill);
}

.pricing-card.is-featured {
  border-color: rgba(185, 167, 248, 0.24);
  background:
    radial-gradient(120% 80% at 100% 0%, var(--plan-soft), transparent 58%),
    linear-gradient(138deg, rgba(255, 255, 255, 0.085), rgba(255, 255, 255, 0.025) 45%, rgba(255, 255, 255, 0.045)),
    rgba(18, 18, 30, 0.66);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    0 30px 80px -44px rgba(125, 94, 220, 0.65);
}

.pricing-card__accent {
  position: absolute;
  top: 0;
  right: 18%;
  left: 18%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--plan-strong), transparent);
  opacity: 0.5;
}

.pricing-card__head {
  position: relative;
}

.pricing-card__name-row {
  display: flex;
  min-height: 28px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.pricing-card__name {
  font-family: var(--font-mono);
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 1;
}

.pricing-card__badge {
  padding: 4px 8px;
  border: 1px solid rgba(185, 167, 248, 0.2);
  border-radius: var(--r-pill);
  background: rgba(185, 167, 248, 0.08);
  color: var(--violet-bright);
  font-size: 0.6rem;
  font-weight: 520;
  line-height: 1.3;
  white-space: nowrap;
}

.pricing-card__tagline {
  margin-top: 14px;
  min-height: 3.3em;
  color: var(--text-secondary);
  font-size: 0.83rem;
  line-height: 1.65;
}

.pricing-card__price {
  display: flex;
  min-height: 70px;
  align-items: baseline;
  gap: 7px;
  margin-top: 22px;
}

.pricing-card__price-prefix,
.pricing-card__price-suffix {
  color: var(--text-tertiary);
  font-size: 0.76rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.pricing-card__price-value {
  color: var(--text);
  font-size: clamp(2.45rem, 2rem + 1.5vw, 3.2rem);
  font-weight: 560;
  letter-spacing: -0.06em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.pricing-card.is-custom .pricing-card__price-value {
  font-size: clamp(2rem, 1.7rem + 1vw, 2.6rem);
  letter-spacing: -0.045em;
}

.pricing-card.is-featured .pricing-card__price-value {
  background: linear-gradient(180deg, #fff, #d8ccff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.pricing-card__rule {
  height: 1px;
  margin: 22px 0;
  background: linear-gradient(90deg, var(--line-strong), transparent);
}

.pricing-card__label {
  display: block;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  line-height: 1.4;
  text-transform: uppercase;
}

.pricing-card__includes ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
}

.pricing-card__includes li {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  color: var(--text-secondary);
  font-size: 0.79rem;
  line-height: 1.6;
}

.pricing-card__includes li svg {
  flex: none;
  margin-top: 2px;
  color: var(--plan-strong);
}

.pricing-card__scope {
  margin-top: 22px;
  padding: 12px 13px;
  border: 1px solid var(--line-soft);
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.022);
}

.pricing-card__scope p {
  margin-top: 6px;
  color: var(--text-secondary);
  font-size: 0.75rem;
  line-height: 1.6;
}

.pricing-card__action {
  margin-top: 24px;
  padding-top: 2px;
}

@media (max-width: 1023px) {
  .pricing-card {
    padding: 22px;
  }

  .pricing-card__tagline {
    min-height: 0;
  }
}

@media (max-width: 600px) {
  .pricing-card {
    border-radius: var(--r-md);
  }
}
</style>
