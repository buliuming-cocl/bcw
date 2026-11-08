<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next'
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'
import PageHero from '@/components/PageHero.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import { services } from '@/data/services'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <div class="services-page">
    <PageHero
      :eyebrow="t('servicesPage.hero.eyebrow')"
      :title="t('servicesPage.hero.title')"
      :description="t('servicesPage.hero.description')"
    >
      <template #actions>
        <AppButton to="/order" variant="primary" arrow>{{ t('common.startProject') }}</AppButton>
        <AppButton to="/pricing" variant="glass">{{ t('nav.pricing') }}</AppButton>
      </template>

      <template #aside>
        <div class="services-aside glass glass--strong glass--edge">
          <div class="services-aside__head">
            <span class="services-aside__label">{{ t('servicesPage.hero.asideLabel') }}</span>
            <span class="services-aside__count mono">06</span>
          </div>
          <div class="services-aside__grid" aria-hidden="true">
            <span v-for="service in services" :key="service.id" class="services-aside__icon">
              <AppIcon :name="service.icon" :size="18" :stroke-width="1.6" />
            </span>
          </div>
          <div class="services-aside__foot">
            <span class="status-dot" aria-hidden="true" />
            <span>{{ t('servicesPage.hero.asideNote') }}</span>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="section services-list" :aria-labelledby="'services-list-title'">
      <div class="container">
        <h2 id="services-list-title" class="sr-only">{{ t('servicesPage.listTitle') }}</h2>
        <div class="services-list__grid">
          <ServiceCard
            v-for="(service, index) in services"
            :key="service.id"
            v-reveal="index % 2"
            :service="service"
          />
        </div>

        <div class="services-note">
          <ShieldCheck :size="17" :stroke-width="1.7" aria-hidden="true" />
          <p>{{ t('servicesPage.note') }}</p>
        </div>
      </div>
    </section>

    <section class="section decision-section">
      <div class="container">
        <div class="decision-panel glass glass--strong glass--edge">
          <div class="decision-panel__orb" aria-hidden="true" />
          <div class="decision-panel__copy">
            <span class="eyebrow">
              <span class="eyebrow__dot" aria-hidden="true" />
              {{ t('servicesPage.hero.eyebrow') }}
            </span>
            <h2 class="decision-panel__title">{{ t('servicesPage.bottom.title') }}</h2>
            <p class="decision-panel__desc">{{ t('servicesPage.bottom.description') }}</p>
          </div>
          <div class="decision-panel__actions">
            <AppButton to="/order" variant="primary" arrow>{{ t('servicesPage.bottom.primary') }}</AppButton>
            <AppButton to="/pricing" variant="glass">{{ t('servicesPage.bottom.secondary') }}</AppButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.services-aside {
  position: relative;
  overflow: hidden;
  padding: 24px;
  border-radius: var(--r-lg);
}

.services-aside::after {
  content: "";
  position: absolute;
  top: -40%;
  right: -20%;
  width: 70%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(185, 167, 248, 0.16), transparent 65%);
  pointer-events: none;
}

.services-aside__head {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.services-aside__label {
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.63rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.services-aside__count {
  color: var(--text-tertiary);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
}

.services-aside__grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
  margin-top: 24px;
}

.services-aside__icon {
  display: grid;
  aspect-ratio: 1.25;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-secondary);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.services-aside__icon:nth-child(2n) {
  color: var(--blue);
}

.services-aside__icon:nth-child(3n) {
  color: var(--violet);
}

.services-aside__foot {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--line-soft);
  color: var(--text-tertiary);
  font-size: 0.7rem;
}

.services-aside__foot .status-dot {
  width: 5px;
  height: 5px;
}

.services-list {
  padding-top: clamp(8px, 1.4vw, 18px);
  padding-bottom: clamp(48px, 6vw, 78px);
}

.services-list__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.services-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 22px;
  padding: 14px 18px;
  border: 1px solid var(--line-soft);
  border-radius: var(--r-sm);
  background: rgba(255, 255, 255, 0.022);
  color: var(--text-tertiary);
  font-size: 0.77rem;
  line-height: 1.65;
}

.services-note svg {
  flex: none;
  margin-top: 2px;
  color: var(--blue);
}

.decision-section {
  padding-top: 0;
  padding-bottom: var(--section-y);
}

.decision-panel {
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: clamp(30px, 4vw, 48px);
  border-radius: var(--r-lg);
}

.decision-panel__orb {
  position: absolute;
  top: -60%;
  left: 6%;
  width: 420px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 199, 250, 0.13), transparent 68%);
  pointer-events: none;
}

.decision-panel__copy {
  position: relative;
  z-index: 1;
  max-width: 620px;
}

.decision-panel__title {
  margin-top: 16px;
  font-size: clamp(1.55rem, 1.2rem + 1.2vw, 2.1rem);
  font-weight: 570;
  letter-spacing: -0.035em;
  line-height: 1.25;
}

.decision-panel__desc {
  max-width: 56ch;
  margin-top: 12px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.75;
}

.decision-panel__actions {
  position: relative;
  z-index: 1;
  display: flex;
  flex: none;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 899px) {
  .services-list__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .decision-panel {
    align-items: flex-start;
    flex-direction: column;
    gap: 24px;
  }

  .decision-panel__actions {
    width: 100%;
  }
}

@media (max-width: 520px) {
  .services-aside {
    padding: 20px;
  }

  .decision-panel__actions {
    flex-direction: column;
  }

  .decision-panel__actions :deep(.btn) {
    width: 100%;
  }
}
</style>
