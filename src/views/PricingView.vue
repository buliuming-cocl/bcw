<script setup lang="ts">
import { ArrowRight, Info, Sparkles } from 'lucide-vue-next'
import AppButton from '@/components/AppButton.vue'
import CtaPanel from '@/components/CtaPanel.vue'
import PageHero from '@/components/PageHero.vue'
import PricingCard from '@/components/PricingCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { pricingFactors } from '@/data/content'
import { pricingPlans } from '@/data/pricing'
import { useI18n } from '@/i18n'

const { t, pick, isEnglish } = useI18n()
</script>

<template>
  <div class="pricing-page">
    <PageHero
      compact
      :eyebrow="t('pricingPage.hero.eyebrow')"
      :title="t('pricingPage.hero.title')"
      :description="t('pricingPage.hero.description')"
    >
      <template #actions>
        <AppButton to="/order" variant="primary" arrow>{{ t('common.startProject') }}</AppButton>
        <AppButton to="/faq" variant="glass">{{ t('nav.faq') }}</AppButton>
      </template>

      <template #aside>
        <div class="pricing-aside glass glass--strong glass--edge">
          <div class="pricing-aside__head">
            <span class="pricing-aside__label">{{ t('pricingPage.hero.asideLabel') }}</span>
            <span class="pricing-aside__spark"><Sparkles :size="15" :stroke-width="1.7" aria-hidden="true" /></span>
          </div>
          <div class="pricing-aside__price">
            <span v-if="isEnglish" class="pricing-aside__suffix">{{ t('pricingPage.hero.asideFrom') }}</span>
            <span class="pricing-aside__amount mono">¥10</span>
            <span v-if="!isEnglish" class="pricing-aside__suffix">{{ t('pricingPage.hero.asideFrom') }}</span>
          </div>
          <div class="pricing-aside__trail">
            <span class="pricing-aside__line" aria-hidden="true" />
            <ArrowRight :size="14" :stroke-width="1.7" aria-hidden="true" />
            <span class="pricing-aside__custom">{{ t('pricingPage.hero.asideCustom') }}</span>
          </div>
          <p class="pricing-aside__note">{{ t('pricingPage.hero.asideNote') }}</p>
        </div>
      </template>
    </PageHero>

    <section class="section pricing-content">
      <div class="container">
        <div class="pricing-disclaimer">
          <span class="pricing-disclaimer__icon">
            <Info :size="17" :stroke-width="1.8" aria-hidden="true" />
          </span>
          <p>{{ t('pricingPage.disclaimer') }}</p>
        </div>

        <div v-reveal class="plans-head">
          <div class="plans-head__copy">
            <span class="eyebrow">
              <span class="eyebrow__dot" aria-hidden="true" />
              {{ t('pricingPage.plans.eyebrow') }}
            </span>
            <h2 class="plans-head__title">{{ t('pricingPage.plans.title') }}</h2>
          </div>
          <p class="plans-head__desc">{{ t('pricingPage.plans.description') }}</p>
        </div>

        <div class="plans-grid">
          <PricingCard
            v-for="(plan, index) in pricingPlans"
            :key="plan.id"
            v-reveal="index"
            :plan="plan"
          />
        </div>
      </div>
    </section>

    <section class="section factors-section">
      <div class="container">
        <SectionHeading
          v-reveal
          :eyebrow="t('pricingPage.factors.eyebrow')"
          :title="t('pricingPage.factors.title')"
          :description="t('pricingPage.factors.description')"
        />

        <div class="factors-grid">
          <article
            v-for="(factor, index) in pricingFactors"
            :key="factor.id"
            v-reveal="index % 2"
            class="factor glass"
          >
            <span class="factor__index mono">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <h3 class="factor__title">{{ pick(factor.title) }}</h3>
              <p class="factor__desc">{{ pick(factor.description) }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <CtaPanel
      :title="t('pricingPage.cta.title')"
      :description="t('pricingPage.cta.description')"
      :primary-label="t('pricingPage.cta.primary')"
      primary-to="/order"
      :secondary-label="t('pricingPage.cta.secondary')"
      secondary-to="/faq"
      :note="t('pricingPage.disclaimer')"
    />
  </div>
</template>

<style scoped>
.pricing-aside {
  position: relative;
  overflow: hidden;
  padding: 24px;
  border-radius: var(--r-lg);
}

.pricing-aside::after {
  content: "";
  position: absolute;
  top: -50%;
  right: -28%;
  width: 80%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(185, 167, 248, 0.17), transparent 64%);
  pointer-events: none;
}

.pricing-aside__head {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pricing-aside__label {
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.63rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.pricing-aside__spark {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border: 1px solid rgba(168, 199, 250, 0.16);
  border-radius: 9px;
  background: rgba(168, 199, 250, 0.08);
  color: var(--blue);
}

.pricing-aside__price {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 28px;
}

.pricing-aside__amount {
  color: var(--text);
  font-size: clamp(3rem, 5vw, 4.1rem);
  font-weight: 500;
  letter-spacing: -0.075em;
  line-height: 1;
}

.pricing-aside__suffix {
  color: var(--text-tertiary);
  font-size: 0.8rem;
}

.pricing-aside__trail {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  color: var(--text-tertiary);
}

.pricing-aside__line {
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, rgba(185, 167, 248, 0.6), transparent);
}

.pricing-aside__custom {
  color: var(--violet-bright);
  font-size: 0.78rem;
  font-weight: 500;
}

.pricing-aside__note {
  position: relative;
  z-index: 1;
  margin-top: 22px;
  padding-top: 16px;
  border-top: 1px solid var(--line-soft);
  color: var(--text-tertiary);
  font-size: 0.71rem;
  line-height: 1.6;
}

.pricing-content {
  padding-top: clamp(4px, 1vw, 10px);
  padding-bottom: clamp(52px, 6vw, 80px);
}

.pricing-disclaimer {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 22px;
  padding: 15px 18px;
  border: 1px solid rgba(255, 210, 138, 0.13);
  border-radius: var(--r-sm);
  background: rgba(255, 210, 138, 0.035);
}

.pricing-disclaimer__icon {
  display: grid;
  width: 28px;
  height: 28px;
  flex: none;
  place-items: center;
  border: 1px solid rgba(255, 210, 138, 0.17);
  border-radius: 8px;
  color: var(--warning);
}

.pricing-disclaimer p {
  color: #d9c6a7;
  font-size: 0.8rem;
  line-height: 1.65;
}

.plans-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 28px;
  margin-bottom: 26px;
}

.plans-head__copy {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.plans-head__title {
  font-size: clamp(1.65rem, 1.35rem + 1.2vw, 2.25rem);
  font-weight: 570;
  letter-spacing: -0.04em;
  line-height: 1.15;
}

.plans-head__desc {
  max-width: 48ch;
  color: var(--text-secondary);
  font-size: 0.84rem;
  line-height: 1.7;
  text-align: right;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.factors-section {
  padding-top: clamp(48px, 6vw, 76px);
  padding-bottom: clamp(20px, 3vw, 40px);
}

.factors-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.factor {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 24px;
  border-radius: var(--r-md);
}

.factor__index {
  flex: none;
  padding-top: 2px;
  color: var(--text-tertiary);
  font-size: 0.64rem;
  letter-spacing: 0.08em;
}

.factor__title {
  font-size: 0.98rem;
  font-weight: 550;
  letter-spacing: -0.02em;
  line-height: 1.4;
}

.factor__desc {
  margin-top: 7px;
  color: var(--text-tertiary);
  font-size: 0.8rem;
  line-height: 1.7;
}

@media (max-width: 1120px) {
  .plans-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .plans-head {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .plans-head__desc {
    text-align: left;
  }
}

@media (max-width: 700px) {
  .plans-grid,
  .factors-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .factor {
    padding: 20px;
  }
}

@media (max-width: 520px) {
  .pricing-aside {
    padding: 20px;
  }

  .pricing-disclaimer {
    padding: 13px 14px;
  }

  .pricing-disclaimer p {
    font-size: 0.77rem;
  }
}
</style>
