<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    description?: string
    compact?: boolean
  }>(),
  {
    compact: false,
  },
)
</script>

<template>
  <section class="page-hero" :class="{ 'page-hero--compact': compact }">
    <div class="page-hero__ambient" aria-hidden="true" />
    <div class="container page-hero__grid">
      <div class="page-hero__copy">
        <span class="eyebrow">
          <span class="eyebrow__line" aria-hidden="true" />
          {{ eyebrow }}
        </span>
        <h1 class="page-hero__title">{{ title }}</h1>
        <p v-if="description" class="page-hero__desc">{{ description }}</p>
        <div v-if="$slots.actions" class="page-hero__actions">
          <slot name="actions" />
        </div>
      </div>
      <div v-if="$slots.aside" class="page-hero__aside">
        <slot name="aside" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  position: relative;
  padding-block: clamp(46px, 6.5vw, 88px) clamp(50px, 7vw, 92px);
}

.page-hero--compact {
  padding-bottom: clamp(26px, 3vw, 44px);
}

.page-hero__ambient {
  position: absolute;
  top: -10%;
  right: 4%;
  width: min(46vw, 640px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(154, 130, 238, 0.11), transparent 68%);
  pointer-events: none;
}

.page-hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(300px, 0.88fr);
  align-items: center;
  gap: clamp(32px, 5.5vw, 78px);
}

.page-hero__copy {
  max-width: 720px;
  animation: hero-rise 720ms var(--ease-spring) both;
}

.page-hero__title {
  margin-top: 22px;
  font-size: clamp(2.5rem, 1.45rem + 3.1vw, 4rem);
  font-weight: 580;
  line-height: 1.08;
  letter-spacing: -0.045em;
  text-wrap: balance;
  white-space: pre-line;
}

.page-hero__desc {
  max-width: 58ch;
  margin-top: 24px;
  color: var(--text-secondary);
  font-size: clamp(1rem, 0.94rem + 0.24vw, 1.1rem);
  line-height: 1.78;
  text-wrap: pretty;
}

.page-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.page-hero__aside {
  justify-self: end;
  width: 100%;
  max-width: 430px;
  animation: hero-rise 820ms 110ms var(--ease-spring) both;
}

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 899px) {
  .page-hero__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }

  .page-hero__copy {
    max-width: 660px;
  }

  .page-hero__aside {
    max-width: 100%;
    justify-self: stretch;
  }
}

@media (max-width: 600px) {
  .page-hero {
    padding-block: 34px 48px;
  }

  .page-hero__title {
    margin-top: 18px;
    font-size: clamp(1.9rem, 8.8vw, 2.5rem);
    line-height: 1.1;
  }

  .page-hero__desc {
    margin-top: 20px;
  }

  .page-hero__actions {
    margin-top: 26px;
  }
}
</style>
