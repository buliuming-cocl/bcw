<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowDown, ArrowRight, ChevronRight, Sparkles } from 'lucide-vue-next'
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'
import CtaPanel from '@/components/CtaPanel.vue'
import HeroVisual from '@/components/HeroVisual.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import { advantages, workflowSteps } from '@/data/content'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { useI18n } from '@/i18n'

const { t, pick } = useI18n()

const featuredProjects = computed(() => projects.filter((project) => project.featured))
</script>

<template>
  <div class="home">
    <!-- Hero ------------------------------------------------------------- -->
    <section class="hero">
      <div class="hero__aura" aria-hidden="true" />
      <div class="container hero__grid">
        <div class="hero__copy">
          <span class="eyebrow hero__eyebrow">
            <span class="eyebrow__dot" aria-hidden="true" />
            {{ t('home.hero.eyebrow') }}
          </span>

          <h1 class="hero__title">
            <span class="hero__title-line">{{ t('home.hero.titleLead') }}</span>
            <span class="hero__title-line accent-text">{{ t('home.hero.titleAccent') }}</span>
          </h1>

          <p class="hero__subtitle">{{ t('home.hero.subtitle') }}</p>

          <div class="hero__actions">
            <AppButton to="/services" variant="primary" arrow>{{ t('home.hero.primary') }}</AppButton>
            <AppButton to="/order" variant="glass">{{ t('home.hero.secondary') }}</AppButton>
          </div>

          <div class="hero__meta">
            <span class="hero__meta-status">
              <span class="status-dot" aria-hidden="true" />
              {{ t('home.hero.status') }}
            </span>
            <span class="hero__meta-rule" aria-hidden="true" />
            <span class="hero__meta-detail">{{ t('home.hero.statusDetail') }}</span>
          </div>
        </div>

        <HeroVisual class="hero__visual" />
      </div>

      <div class="hero__scroll" aria-hidden="true">
        <span>{{ t('common.scrollHint') }}</span>
        <ArrowDown :size="14" :stroke-width="1.6" />
      </div>
    </section>

    <!-- Services --------------------------------------------------------- -->
    <section class="section services-section">
      <div class="container">
        <div class="section-row">
          <SectionHeading
            v-reveal
            :eyebrow="t('home.services.eyebrow')"
            :title="t('home.services.title')"
            :description="t('home.services.description')"
          />
          <RouterLink to="/services" class="section-row__link link-arrow">
            {{ t('home.services.link') }}
            <ArrowRight :size="15" :stroke-width="1.8" aria-hidden="true" />
          </RouterLink>
        </div>

        <div class="services-grid">
          <ServiceCard
            v-for="(service, index) in services"
            :key="service.id"
            v-reveal="index % 3"
            :service="service"
            compact
          />
        </div>
      </div>
    </section>

    <!-- Advantages ------------------------------------------------------- -->
    <section class="section advantages-section">
      <div class="container">
        <SectionHeading
          v-reveal
          :eyebrow="t('home.advantages.eyebrow')"
          :title="t('home.advantages.title')"
          :description="t('home.advantages.description')"
        />

        <div class="advantages-grid">
          <article
            v-for="(item, index) in advantages"
            :key="item.id"
            v-reveal="index % 3"
            class="advantage glass glass--edge"
            :class="{ 'advantage--wide': item.wide }"
          >
            <div class="advantage__content">
              <span class="advantage__icon">
                <AppIcon :name="item.icon" :size="20" :stroke-width="1.7" />
              </span>
              <h3 class="advantage__title">{{ pick(item.title) }}</h3>
              <p class="advantage__desc">{{ pick(item.description) }}</p>
            </div>

            <div v-if="item.wide" class="advantage__visual" aria-hidden="true">
              <span class="advantage__ring advantage__ring--outer" />
              <span class="advantage__ring advantage__ring--inner" />
              <span class="advantage__core">
                <Sparkles :size="24" :stroke-width="1.5" />
              </span>
              <span class="advantage__node advantage__node--one" />
              <span class="advantage__node advantage__node--two" />
              <span class="advantage__node advantage__node--three" />
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Featured projects ------------------------------------------------ -->
    <section class="section projects-section">
      <div class="container">
        <div class="section-row">
          <SectionHeading
            v-reveal
            :eyebrow="t('home.projects.eyebrow')"
            :title="t('home.projects.title')"
            :description="t('home.projects.description')"
          />
          <RouterLink to="/portfolio" class="section-row__link link-arrow">
            {{ t('home.projects.link') }}
            <ArrowRight :size="15" :stroke-width="1.8" aria-hidden="true" />
          </RouterLink>
        </div>

        <div class="featured-grid">
          <ProjectCard
            v-for="(project, index) in featuredProjects"
            :key="project.id"
            v-reveal="index"
            :project="project"
            compact
          />
        </div>
      </div>
    </section>

    <!-- Workflow --------------------------------------------------------- -->
    <section class="section process-section">
      <div class="container">
        <SectionHeading
          v-reveal
          :eyebrow="t('home.process.eyebrow')"
          :title="t('home.process.title')"
          :description="t('home.process.description')"
        />

        <ol class="process-grid">
          <li
            v-for="(step, index) in workflowSteps"
            :key="step.id"
            v-reveal="index"
            class="process-step glass"
          >
            <div class="process-step__top">
              <span class="process-step__num mono">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="process-step__icon">
                <AppIcon :name="step.icon" :size="19" :stroke-width="1.7" />
              </span>
            </div>
            <h3 class="process-step__title">{{ pick(step.title) }}</h3>
            <p class="process-step__desc">{{ pick(step.description) }}</p>
            <ChevronRight
              v-if="index < workflowSteps.length - 1"
              class="process-step__arrow"
              :size="15"
              :stroke-width="1.6"
              aria-hidden="true"
            />
          </li>
        </ol>
      </div>
    </section>

    <CtaPanel
      :eyebrow="t('home.cta.eyebrow')"
      :title="t('home.cta.titleLead')"
      :accent="t('home.cta.titleAccent')"
      :description="t('home.cta.description')"
      :primary-label="t('home.cta.primary')"
      primary-to="/order"
      :secondary-label="t('home.cta.secondary')"
      secondary-to="/pricing"
      :note="t('home.cta.note')"
    />
  </div>
</template>

<style scoped>
.home {
  position: relative;
}

/* Hero ------------------------------------------------------------------ */

.hero {
  position: relative;
  overflow: clip;
  padding-block: clamp(36px, 5.4vw, 78px) clamp(56px, 7vw, 100px);
}

.hero__aura {
  position: absolute;
  top: -16%;
  right: -6%;
  width: min(66vw, 880px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(129, 151, 220, 0.11), transparent 64%);
  pointer-events: none;
}

.hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.96fr);
  align-items: center;
  gap: clamp(28px, 4.8vw, 62px);
}

.hero__copy {
  position: relative;
  z-index: 1;
  max-width: 660px;
  animation: hero-copy-in 900ms var(--ease-spring) both;
}

.hero__eyebrow {
  animation: hero-rise 800ms 60ms var(--ease-spring) both;
}

.hero__title {
  margin-top: 26px;
  font-size: clamp(3.05rem, 2rem + 5.15vw, 5.5rem);
  font-weight: 570;
  line-height: 1.02;
  letter-spacing: -0.055em;
}

.hero__title-line {
  display: block;
  animation: hero-rise 900ms 120ms var(--ease-spring) both;
}

.hero__title-line + .hero__title-line {
  animation-delay: 190ms;
}

.hero__subtitle {
  max-width: 48ch;
  margin-top: 27px;
  color: var(--text-secondary);
  font-size: clamp(1rem, 0.94rem + 0.28vw, 1.13rem);
  line-height: 1.76;
  animation: hero-rise 850ms 280ms var(--ease-spring) both;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
  animation: hero-rise 850ms 360ms var(--ease-spring) both;
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  color: var(--text-tertiary);
  font-size: 0.76rem;
  line-height: 1.5;
  animation: hero-rise 850ms 440ms var(--ease-spring) both;
}

.hero__meta-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-weight: 500;
}

.hero__meta-status .status-dot {
  width: 5px;
  height: 5px;
}

.hero__meta-rule {
  width: 20px;
  height: 1px;
  background: var(--line-strong);
}

.hero__meta-detail {
  max-width: 38ch;
}

.hero__visual {
  position: relative;
  z-index: 0;
  animation: hero-visual-in 1100ms 200ms var(--ease-spring) both;
}

.hero__scroll {
  position: absolute;
  right: var(--gutter);
  bottom: 22px;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-size: 0.57rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  animation: scroll-cue 2.6s var(--ease-out) infinite;
}

@keyframes hero-copy-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-visual-in {
  from {
    opacity: 0;
    transform: translateY(26px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes scroll-cue {
  0%,
  100% {
    opacity: 0.45;
    transform: translateY(0);
  }
  50% {
    opacity: 0.85;
    transform: translateY(3px);
  }
}

/* Section layout -------------------------------------------------------- */

.services-section {
  padding-top: clamp(14px, 2.4vw, 34px);
}

.section-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
}

.section-row :deep(.section-head) {
  margin-bottom: clamp(36px, 5vw, 58px);
}

.section-row__link {
  flex: none;
  margin-bottom: clamp(36px, 5vw, 58px);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

/* Advantage bento ------------------------------------------------------- */

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.advantage {
  position: relative;
  display: flex;
  min-height: 224px;
  flex-direction: column;
  overflow: hidden;
  padding: 27px;
  border-radius: var(--r-md);
}

.advantage::before {
  content: "";
  position: absolute;
  top: -30%;
  left: -30%;
  width: 80%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 199, 250, 0.07), transparent 68%);
  pointer-events: none;
}

.advantage--wide {
  grid-column: span 2;
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(180px, 0.65fr);
  align-items: center;
  gap: 16px;
  min-height: 224px;
  background:
    linear-gradient(138deg, rgba(168, 199, 250, 0.075), rgba(185, 167, 248, 0.035) 52%, transparent),
    var(--glass-fill);
}

.advantage__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1;
  flex-direction: column;
}

.advantage__icon {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.035);
  color: var(--blue);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
}

.advantage__title {
  max-width: 22ch;
  margin-top: auto;
  padding-top: 34px;
  font-size: 1.06rem;
  font-weight: 570;
  letter-spacing: -0.022em;
  line-height: 1.35;
}

.advantage__desc {
  max-width: 45ch;
  margin-top: 9px;
  color: var(--text-tertiary);
  font-size: 0.81rem;
  line-height: 1.72;
}

.advantage--wide .advantage__title {
  max-width: 26ch;
  margin-top: 22px;
  padding-top: 0;
  font-size: 1.4rem;
  letter-spacing: -0.03em;
}

.advantage--wide .advantage__desc {
  max-width: 47ch;
}

.advantage__visual {
  position: relative;
  display: grid;
  width: 100%;
  max-width: 220px;
  aspect-ratio: 1;
  place-items: center;
  justify-self: center;
}

.advantage__ring {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 50%;
}

.advantage__ring--outer {
  width: 100%;
  aspect-ratio: 1;
  border-color: rgba(168, 199, 250, 0.11);
  animation: orbit-turn 42s linear infinite;
}

.advantage__ring--inner {
  width: 68%;
  aspect-ratio: 1;
  border-color: rgba(185, 167, 248, 0.14);
  animation: orbit-turn 30s linear infinite reverse;
}

.advantage__core {
  display: grid;
  width: 73px;
  height: 73px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.2), transparent 55%),
    linear-gradient(145deg, rgba(168, 199, 250, 0.22), rgba(185, 167, 248, 0.12));
  color: var(--blue-bright);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    0 20px 46px -22px rgba(130, 151, 230, 0.65);
}

.advantage__node {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--blue);
  box-shadow: 0 0 10px rgba(168, 199, 250, 0.6);
}

.advantage__node--one {
  top: 8%;
  left: 47%;
}

.advantage__node--two {
  right: 7%;
  bottom: 26%;
  background: var(--violet);
  box-shadow: 0 0 10px rgba(185, 167, 248, 0.6);
}

.advantage__node--three {
  bottom: 11%;
  left: 20%;
  width: 4px;
  height: 4px;
  background: var(--cyan);
  box-shadow: 0 0 8px rgba(165, 230, 224, 0.5);
}

@keyframes orbit-turn {
  to {
    transform: rotate(360deg);
  }
}

/* Workflow -------------------------------------------------------------- */

.process-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.process-step {
  position: relative;
  display: flex;
  min-height: 100%;
  flex-direction: column;
  padding: 23px;
  border-radius: var(--r-md);
}

.process-step__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.process-step__num {
  color: var(--text-tertiary);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
}

.process-step__icon {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-secondary);
}

.process-step:nth-child(1) .process-step__icon {
  color: var(--blue);
}

.process-step:nth-child(2) .process-step__icon {
  color: var(--violet);
}

.process-step:nth-child(3) .process-step__icon {
  color: var(--cyan);
}

.process-step:nth-child(4) .process-step__icon {
  color: var(--green);
}

.process-step__title {
  margin-top: 22px;
  font-size: 1rem;
  font-weight: 560;
  letter-spacing: -0.02em;
  line-height: 1.4;
}

.process-step__desc {
  margin-top: 9px;
  color: var(--text-tertiary);
  font-size: 0.79rem;
  line-height: 1.7;
}

.process-step__arrow {
  position: absolute;
  top: 34px;
  right: -20px;
  z-index: 2;
  color: var(--text-tertiary);
  opacity: 0.55;
}

/* Responsive ------------------------------------------------------------ */

@media (max-width: 1099px) {
  .services-grid,
  .advantages-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .advantage--wide {
    grid-column: span 2;
  }

  .process-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .process-step__arrow {
    display: none;
  }

  .hero__scroll {
    display: none;
  }
}

@media (max-width: 980px) {
  .featured-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 899px) {
  .hero {
    padding-block: 30px 56px;
  }

  .hero__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 44px;
  }

  .hero__copy {
    max-width: 680px;
  }

  .hero__visual {
    max-width: 540px;
    margin-inline: auto;
  }

  .section-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 0;
  }

  .section-row :deep(.section-head) {
    margin-bottom: 22px;
  }

  .section-row__link {
    margin-bottom: clamp(32px, 5vw, 46px);
  }

  .featured-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 700px) {
  .hero__title {
    font-size: clamp(2.9rem, 12vw, 4.2rem);
    letter-spacing: -0.05em;
  }

  .hero__actions {
    gap: 10px;
  }

  .services-grid,
  .advantages-grid,
  .process-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .advantage--wide {
    grid-column: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .advantage__visual {
    display: none;
  }

  .advantage--wide .advantage__title {
    font-size: 1.22rem;
  }
}

@media (max-width: 480px) {
  .hero__title {
    font-size: clamp(2.7rem, 13vw, 3.6rem);
  }

  .hero__subtitle {
    margin-top: 22px;
  }

  .hero__actions {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  .hero__meta {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
    margin-top: 24px;
  }

  .hero__meta-rule {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__copy,
  .hero__eyebrow,
  .hero__title-line,
  .hero__subtitle,
  .hero__actions,
  .hero__meta,
  .hero__visual,
  .hero__scroll,
  .advantage__ring {
    animation: none;
  }
}
</style>
