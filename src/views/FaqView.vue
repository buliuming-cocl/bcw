<script setup lang="ts">
import { ref } from 'vue'
import { Mail } from 'lucide-vue-next'
import AppButton from '@/components/AppButton.vue'
import FaqItem from '@/components/FaqItem.vue'
import PageHero from '@/components/PageHero.vue'
import { siteConfig } from '@/config/site'
import { faqItems } from '@/data/faq'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const openId = ref<string>(faqItems[0]?.id ?? '')

function toggle(id: string) {
  openId.value = openId.value === id ? '' : id
}

const mailto = `mailto:${siteConfig.email}`
</script>

<template>
  <div class="faq-page">
    <PageHero
      :eyebrow="t('faqPage.hero.eyebrow')"
      :title="t('faqPage.hero.title')"
      :description="t('faqPage.hero.description')"
    >
      <template #actions>
        <AppButton to="/order" variant="primary" arrow>{{ t('common.startProject') }}</AppButton>
        <AppButton :href="mailto" :new-tab="false" variant="glass">
          <Mail :size="15" :stroke-width="1.8" aria-hidden="true" />
          {{ t('common.email') }}
        </AppButton>
      </template>

      <template #aside>
        <div class="faq-aside glass glass--strong glass--edge">
          <div class="faq-aside__head">
            <span class="faq-aside__label">{{ t('faqPage.hero.asideLabel') }}</span>
            <span class="faq-aside__count mono">{{ String(faqItems.length).padStart(2, '0') }}</span>
          </div>
          <span class="faq-aside__mark" aria-hidden="true">?</span>
          <div class="faq-aside__foot">
            <span class="status-dot" aria-hidden="true" />
            <span>{{ t('faqPage.hero.asideNote') }}</span>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="section faq-content">
      <div class="container faq-container">
        <div class="faq-intro">
          <h2 class="eyebrow faq-intro__title">
            <span class="eyebrow__dot" aria-hidden="true" />
            {{ t('faqPage.hero.asideLabel') }}
          </h2>
          <span class="faq-intro__count mono">{{ t('faqPage.hero.asideCount') }}</span>
        </div>

        <div class="faq-list">
          <FaqItem
            v-for="(item, index) in faqItems"
            :key="item.id"
            v-reveal="index"
            :item="item"
            :index="index"
            :open="openId === item.id"
            @toggle="toggle(item.id)"
          />
        </div>

        <div class="faq-contact glass glass--edge">
          <div class="faq-contact__orb" aria-hidden="true" />
          <div class="faq-contact__copy">
            <h2 class="faq-contact__title">{{ t('faqPage.contact.title') }}</h2>
            <p class="faq-contact__desc">{{ t('faqPage.contact.description') }}</p>
          </div>
          <div class="faq-contact__actions">
            <AppButton to="/order" variant="primary" arrow>{{ t('faqPage.contact.primary') }}</AppButton>
            <AppButton :href="mailto" :new-tab="false" variant="glass">
              <Mail :size="15" :stroke-width="1.8" aria-hidden="true" />
              {{ t('faqPage.contact.secondary') }}
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.faq-aside {
  position: relative;
  overflow: hidden;
  min-height: 280px;
  padding: 24px;
  border-radius: var(--r-lg);
}

.faq-aside::after {
  content: "";
  position: absolute;
  top: -46%;
  right: -28%;
  width: 82%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 199, 250, 0.14), transparent 64%);
  pointer-events: none;
}

.faq-aside__head {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.faq-aside__label {
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.63rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.faq-aside__count {
  color: var(--text-tertiary);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
}

.faq-aside__mark {
  display: block;
  margin-top: 6px;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-family: var(--font-mono);
  font-size: clamp(7rem, 12vw, 9.5rem);
  font-weight: 300;
  letter-spacing: -0.08em;
  line-height: 0.95;
  opacity: 0.9;
}

.faq-aside__foot {
  position: absolute;
  right: 24px;
  bottom: 22px;
  left: 24px;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 14px;
  border-top: 1px solid var(--line-soft);
  color: var(--text-tertiary);
  font-size: 0.68rem;
}

.faq-aside__foot .status-dot {
  width: 5px;
  height: 5px;
}

.faq-content {
  padding-top: clamp(4px, 1vw, 12px);
  padding-bottom: var(--section-y);
}

.faq-container {
  max-width: calc(920px + var(--gutter) * 2);
}

.faq-intro {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 15px;
  padding-inline: 3px;
}

.faq-intro__title {
  margin: 0;
}

.faq-intro__count {
  color: var(--text-tertiary);
  font-size: 0.66rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.faq-contact {
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  margin-top: 32px;
  padding: clamp(26px, 3.6vw, 40px);
  border-radius: var(--r-lg);
}

.faq-contact__orb {
  position: absolute;
  top: -70%;
  left: 4%;
  width: 380px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(185, 167, 248, 0.14), transparent 67%);
  pointer-events: none;
}

.faq-contact__copy {
  position: relative;
  z-index: 1;
  max-width: 560px;
}

.faq-contact__title {
  font-size: clamp(1.28rem, 1.05rem + 0.8vw, 1.65rem);
  font-weight: 570;
  letter-spacing: -0.03em;
  line-height: 1.3;
}

.faq-contact__desc {
  max-width: 55ch;
  margin-top: 8px;
  color: var(--text-tertiary);
  font-size: 0.81rem;
  line-height: 1.7;
}

.faq-contact__actions {
  position: relative;
  z-index: 1;
  display: flex;
  flex: none;
  flex-wrap: wrap;
  gap: 9px;
}

@media (max-width: 760px) {
  .faq-contact {
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
  }

  .faq-contact__actions {
    width: 100%;
  }
}

@media (max-width: 520px) {
  .faq-aside {
    min-height: 250px;
    padding: 20px;
  }

  .faq-aside__foot {
    right: 20px;
    bottom: 20px;
    left: 20px;
  }

  .faq-contact__actions {
    flex-direction: column;
  }

  .faq-contact__actions :deep(.btn) {
    width: 100%;
  }
}
</style>
