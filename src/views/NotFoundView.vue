<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppButton from '@/components/AppButton.vue'
import { useI18n } from '@/i18n'
import { siteConfig } from '@/config/site'

const route = useRoute()
const { t } = useI18n()
</script>

<template>
  <div class="not-found">
    <div class="not-found__orb" aria-hidden="true" />
    <div class="container not-found__inner">
      <div class="not-found__code glass glass--strong glass--edge">
        <span class="not-found__digits mono">{{ t('notFound.code') }}</span>
        <span class="not-found__path mono">GET {{ route.fullPath }} → 404</span>
      </div>

      <span class="eyebrow">
        <span class="eyebrow__dot" aria-hidden="true" />
        {{ t('notFound.eyebrow') }}
      </span>
      <h1 class="not-found__title">{{ t('notFound.title') }}</h1>
      <p class="not-found__desc">{{ t('notFound.description') }}</p>

      <div class="not-found__actions">
        <AppButton to="/" variant="primary" arrow>{{ t('notFound.primary') }}</AppButton>
        <AppButton to="/portfolio" variant="glass">{{ t('notFound.secondary') }}</AppButton>
      </div>

      <a class="not-found__mail" :href="`mailto:${siteConfig.email}`">{{ siteConfig.email }}</a>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  position: relative;
  display: flex;
  min-height: clamp(540px, 72svh, 760px);
  align-items: center;
  overflow: hidden;
  padding-block: clamp(50px, 8vw, 100px);
}

.not-found__orb {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(70vw, 760px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 45% 40%, rgba(168, 199, 250, 0.12), transparent 54%),
    radial-gradient(circle at 65% 65%, rgba(185, 167, 248, 0.11), transparent 58%);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.not-found__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.not-found__code {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;
  padding: 18px 34px 16px;
  border-radius: var(--r-md);
}

.not-found__digits {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: clamp(3.3rem, 8vw, 5.6rem);
  font-weight: 500;
  letter-spacing: -0.09em;
  line-height: 1;
}

.not-found__path {
  max-width: 60vw;
  overflow: hidden;
  color: var(--text-tertiary);
  font-size: 0.6rem;
  letter-spacing: 0.02em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.not-found__title {
  max-width: 20ch;
  margin-top: 20px;
  font-size: clamp(2.2rem, 1.4rem + 3vw, 3.7rem);
  font-weight: 570;
  letter-spacing: -0.045em;
  line-height: 1.1;
}

.not-found__desc {
  max-width: 50ch;
  margin-top: 18px;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.75;
}

.not-found__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 28px;
}

.not-found__mail {
  margin-top: 26px;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  transition: color var(--dur-fast) var(--ease-out);
}

.not-found__mail:hover {
  color: var(--text-secondary);
}

@media (max-width: 520px) {
  .not-found__actions {
    width: 100%;
    flex-direction: column;
  }

  .not-found__actions :deep(.btn) {
    width: 100%;
  }
}
</style>
