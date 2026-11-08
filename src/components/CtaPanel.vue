<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import AppButton from './AppButton.vue'

withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    accent?: string
    description: string
    primaryLabel: string
    primaryTo: RouteLocationRaw
    secondaryLabel?: string
    secondaryTo?: RouteLocationRaw
    note?: string
  }>(),
  {
    eyebrow: '',
  },
)
</script>

<template>
  <section class="section cta-section">
    <div class="container">
      <div class="cta glass glass--strong glass--edge">
        <div class="cta__grid" aria-hidden="true" />
        <div class="cta__orb cta__orb--blue" aria-hidden="true" />
        <div class="cta__orb cta__orb--violet" aria-hidden="true" />
        <div class="cta__content">
          <span v-if="eyebrow" class="eyebrow">
            <span class="eyebrow__dot" aria-hidden="true" />
            {{ eyebrow }}
          </span>
          <h2 class="cta__title">
            {{ title }}<span v-if="accent" class="accent-text">{{ accent }}</span>
          </h2>
          <p class="cta__desc">{{ description }}</p>
          <div class="cta__actions">
            <AppButton :to="primaryTo" variant="primary" arrow>{{ primaryLabel }}</AppButton>
            <AppButton v-if="secondaryLabel && secondaryTo" :to="secondaryTo" variant="glass">
              {{ secondaryLabel }}
            </AppButton>
          </div>
          <p v-if="note" class="cta__note">{{ note }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  padding-block: clamp(56px, 7vw, 96px) var(--section-y);
}

.cta {
  position: relative;
  overflow: hidden;
  padding: clamp(44px, 6.6vw, 82px) clamp(22px, 5vw, 64px);
  border-radius: var(--r-xl);
  text-align: center;
}

.cta__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 56px 56px;
  -webkit-mask-image: radial-gradient(ellipse 70% 80% at 50% 50%, #000, transparent 78%);
  mask-image: radial-gradient(ellipse 70% 80% at 50% 50%, #000, transparent 78%);
  opacity: 0.8;
  pointer-events: none;
}

.cta__orb {
  position: absolute;
  width: 380px;
  max-width: 52vw;
  aspect-ratio: 1;
  border-radius: 50%;
  pointer-events: none;
}

.cta__orb--blue {
  top: -46%;
  left: -8%;
  background: radial-gradient(circle, rgba(168, 199, 250, 0.2), transparent 66%);
}

.cta__orb--violet {
  right: -8%;
  bottom: -52%;
  background: radial-gradient(circle, rgba(185, 167, 248, 0.22), transparent 66%);
}

.cta__content {
  position: relative;
  z-index: 1;
  display: flex;
  max-width: 760px;
  flex-direction: column;
  align-items: center;
  margin-inline: auto;
}

.cta__title {
  margin-top: 20px;
  font-size: clamp(2.2rem, 1.35rem + 3vw, 3.65rem);
  font-weight: 580;
  line-height: 1.1;
  letter-spacing: -0.045em;
}

.cta__desc {
  max-width: 58ch;
  margin-top: 20px;
  color: var(--text-secondary);
  font-size: clamp(0.96rem, 0.9rem + 0.22vw, 1.06rem);
  line-height: 1.78;
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}

.cta__note {
  margin-top: 20px;
  color: var(--text-tertiary);
  font-size: 0.76rem;
  line-height: 1.6;
}

@media (max-width: 600px) {
  .cta {
    border-radius: var(--r-lg);
  }

  .cta__actions {
    width: 100%;
    flex-direction: column;
  }

  .cta__actions :deep(.btn) {
    width: 100%;
  }
}
</style>
