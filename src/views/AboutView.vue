<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight, ArrowUpRight, Quote } from 'lucide-vue-next'
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'
import BrandLogo from '@/components/BrandLogo.vue'
import CtaPanel from '@/components/CtaPanel.vue'
import PageHero from '@/components/PageHero.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { siteConfig } from '@/config/site'
import { positioningItems, principles } from '@/data/content'
import { projects } from '@/data/projects'
import { useI18n } from '@/i18n'

const { t, pick } = useI18n()

const flowStages = computed(() => [
  { label: t('aboutPage.ai.flowIdea'), tone: 'blue' },
  { label: t('aboutPage.ai.flowDraft'), tone: 'violet' },
  { label: t('aboutPage.ai.flowReview'), tone: 'green' },
  { label: t('aboutPage.ai.flowBuild'), tone: 'blue' },
  { label: t('aboutPage.ai.flowShip'), tone: 'violet' },
])
</script>

<template>
  <div class="about-page">
    <PageHero
      :eyebrow="t('aboutPage.hero.eyebrow')"
      :title="t('aboutPage.hero.title')"
      :description="t('aboutPage.hero.description')"
    >
      <template #actions>
        <AppButton to="/order" variant="primary" arrow>{{ t('common.startProject') }}</AppButton>
        <AppButton to="/portfolio" variant="glass">{{ t('nav.portfolio') }}</AppButton>
      </template>

      <template #aside>
        <div class="about-aside glass glass--strong glass--edge">
          <div class="about-aside__head">
            <span class="about-aside__label">{{ t('aboutPage.hero.asideLabel') }}</span>
            <Quote :size="18" :stroke-width="1.5" aria-hidden="true" />
          </div>
          <p class="about-aside__quote">{{ t('common.taglineLatin') }}</p>
          <p class="about-aside__zh">{{ t('common.taglineZh') }}</p>
          <div class="about-aside__foot">
            <span class="status-dot" aria-hidden="true" />
            <span>{{ t('aboutPage.hero.asideNote') }}</span>
          </div>
        </div>
      </template>
    </PageHero>

    <!-- Studio ----------------------------------------------------------- -->
    <section class="section studio-section">
      <div class="container studio-grid">
        <div class="studio-copy">
          <span class="eyebrow">
            <span class="eyebrow__line" aria-hidden="true" />
            {{ t('aboutPage.studio.eyebrow') }}
          </span>
          <h2 class="studio-copy__title">{{ t('aboutPage.studio.title') }}</h2>
          <p class="studio-copy__paragraph">{{ t('aboutPage.studio.paragraphOne') }}</p>
          <p class="studio-copy__paragraph">{{ t('aboutPage.studio.paragraphTwo') }}</p>
          <div class="studio-copy__action">
            <AppButton :href="siteConfig.studioGithub" variant="glass" arrow>
              {{ t('aboutPage.studio.link') }}
            </AppButton>
          </div>
        </div>

        <aside class="studio-card glass glass--edge">
          <div class="studio-card__brand">
            <BrandLogo />
          </div>
          <dl class="studio-card__facts">
            <div class="studio-card__fact">
              <dt>{{ t('aboutPage.studio.factStudio') }}</dt>
              <dd>{{ t('aboutPage.studio.factStudioValue') }}</dd>
            </div>
            <div class="studio-card__fact">
              <dt>{{ t('aboutPage.studio.factWorkstation') }}</dt>
              <dd>{{ t('aboutPage.studio.factWorkstationValue') }}</dd>
            </div>
            <div class="studio-card__fact">
              <dt>{{ t('aboutPage.studio.factCode') }}</dt>
              <dd>
                <a :href="siteConfig.studioGithub" target="_blank" rel="noopener noreferrer">
                  github.com/buliuming-cocl
                  <ArrowUpRight :size="12" :stroke-width="1.8" aria-hidden="true" />
                </a>
              </dd>
            </div>
            <div class="studio-card__fact">
              <dt>{{ t('aboutPage.studio.factOpenSource') }}</dt>
              <dd>
                <a :href="siteConfig.openWeLabsGithub" target="_blank" rel="noopener noreferrer">
                  {{ t('aboutPage.studio.factOpenSourceValue') }}
                  <ArrowUpRight :size="12" :stroke-width="1.8" aria-hidden="true" />
                </a>
              </dd>
            </div>
          </dl>
          <div class="studio-card__status">
            <span class="status-dot" aria-hidden="true" />
            {{ t('footer.availability') }}
          </div>
        </aside>
      </div>
    </section>

    <!-- Positioning ----------------------------------------------------- -->
    <section class="section positioning-section">
      <div class="container">
        <SectionHeading
          v-reveal
          :eyebrow="t('aboutPage.positioning.eyebrow')"
          :title="t('aboutPage.positioning.title')"
          :description="t('aboutPage.positioning.description')"
        />

        <div class="positioning-grid">
          <article
            v-for="(item, index) in positioningItems"
            :key="item.id"
            v-reveal="index"
            class="positioning-card glass"
          >
            <span class="positioning-card__index mono">{{ item.index }}</span>
            <h3 class="positioning-card__title">{{ pick(item.title) }}</h3>
            <p class="positioning-card__desc">{{ pick(item.description) }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Principles ------------------------------------------------------ -->
    <section class="section principles-section">
      <div class="container">
        <SectionHeading
          v-reveal
          :eyebrow="t('aboutPage.principles.eyebrow')"
          :title="t('aboutPage.principles.title')"
          :description="t('aboutPage.principles.description')"
        />

        <div class="principles-grid">
          <article
            v-for="(principle, index) in principles"
            :key="principle.id"
            v-reveal="index % 2"
            class="principle glass"
          >
            <div class="principle__top">
              <span class="principle__icon">
                <AppIcon :name="principle.icon" :size="19" :stroke-width="1.7" />
              </span>
              <span class="principle__num mono">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <h3 class="principle__title">{{ pick(principle.title) }}</h3>
            <p class="principle__desc">{{ pick(principle.description) }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- AI --------------------------------------------------------------- -->
    <section class="section ai-section">
      <div class="container">
        <div class="ai-panel glass glass--strong glass--edge">
          <div class="ai-panel__orb" aria-hidden="true" />
          <div class="ai-copy">
            <span class="eyebrow">
              <span class="eyebrow__dot" aria-hidden="true" />
              {{ t('aboutPage.ai.eyebrow') }}
            </span>
            <h2 class="ai-copy__title">{{ t('aboutPage.ai.title') }}</h2>
            <p class="ai-copy__desc">{{ t('aboutPage.ai.description') }}</p>
          </div>

          <div class="ai-flow">
            <div v-for="(stage, index) in flowStages" :key="stage.label" class="ai-flow__item">
              <span class="ai-flow__node" :class="`is-${stage.tone}`">
                <span class="ai-flow__dot" aria-hidden="true" />
                {{ stage.label }}
              </span>
              <ArrowRight
                v-if="index < flowStages.length - 1"
                class="ai-flow__arrow"
                :size="13"
                :stroke-width="1.6"
                aria-hidden="true"
              />
            </div>
          </div>

          <p class="ai-panel__note">{{ t('aboutPage.ai.flowNote') }}</p>
        </div>
      </div>
    </section>

    <!-- Open source ------------------------------------------------------ -->
    <section class="section open-source-section">
      <div class="container open-source-grid">
        <div class="open-source-copy">
          <SectionHeading
            v-reveal
            :eyebrow="t('aboutPage.openSource.eyebrow')"
            :title="t('aboutPage.openSource.title')"
            :description="t('aboutPage.openSource.description')"
          />
          <AppButton :href="siteConfig.studioGithub" variant="glass" arrow>
            {{ t('aboutPage.openSource.allProjects') }}
          </AppButton>
        </div>

        <div class="open-source-list glass">
          <a
            v-for="project in projects"
            :key="project.id"
            :href="project.github"
            class="open-source-row"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="open-source-row__main">
              <span class="open-source-row__name">{{ project.name }}</span>
              <span class="open-source-row__tagline">{{ pick(project.tagline) }}</span>
            </span>
            <span class="open-source-row__status" :class="`is-${project.statusTone}`">
              <span class="open-source-row__dot" aria-hidden="true" />
              {{ pick(project.status) }}
            </span>
            <ArrowUpRight class="open-source-row__arrow" :size="15" :stroke-width="1.7" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>

    <CtaPanel
      :title="t('aboutPage.cta.title')"
      :description="t('aboutPage.cta.description')"
      :primary-label="t('aboutPage.cta.primary')"
      primary-to="/order"
      :secondary-label="t('aboutPage.cta.secondary')"
      secondary-to="/services"
    />
  </div>
</template>

<style scoped>
.about-aside {
  position: relative;
  overflow: hidden;
  padding: 26px;
  border-radius: var(--r-lg);
}

.about-aside::after {
  content: "";
  position: absolute;
  top: -46%;
  right: -28%;
  width: 80%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(185, 167, 248, 0.17), transparent 65%);
  pointer-events: none;
}

.about-aside__head {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-tertiary);
}

.about-aside__label {
  font-family: var(--font-mono);
  font-size: 0.63rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.about-aside__quote {
  position: relative;
  z-index: 1;
  margin-top: 24px;
  font-size: clamp(1.35rem, 1.1rem + 0.8vw, 1.7rem);
  font-weight: 550;
  letter-spacing: -0.035em;
  line-height: 1.26;
}

.about-aside__zh {
  position: relative;
  z-index: 1;
  margin-top: 10px;
  color: var(--text-secondary);
  font-size: 0.84rem;
  letter-spacing: 0.02em;
}

.about-aside__foot {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding-top: 15px;
  border-top: 1px solid var(--line-soft);
  color: var(--text-tertiary);
  font-size: 0.69rem;
}

.about-aside__foot .status-dot {
  width: 5px;
  height: 5px;
}

/* Studio ---------------------------------------------------------------- */

.studio-section {
  padding-top: clamp(8px, 1.6vw, 20px);
  padding-bottom: clamp(52px, 6vw, 80px);
}

.studio-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(300px, 0.82fr);
  align-items: start;
  gap: clamp(32px, 5vw, 70px);
}

.studio-copy__title {
  max-width: 22ch;
  margin-top: 20px;
  font-size: clamp(1.9rem, 1.4rem + 2vw, 2.9rem);
  font-weight: 570;
  letter-spacing: -0.042em;
  line-height: 1.16;
}

.studio-copy__paragraph {
  max-width: 60ch;
  margin-top: 18px;
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.82;
}

.studio-copy__action {
  margin-top: 28px;
}

.studio-card {
  position: relative;
  overflow: hidden;
  padding: 26px;
  border-radius: var(--r-lg);
}

.studio-card::after {
  content: "";
  position: absolute;
  top: -36%;
  right: -26%;
  width: 74%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 199, 250, 0.1), transparent 66%);
  pointer-events: none;
}

.studio-card__brand {
  position: relative;
  z-index: 1;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line-soft);
}

.studio-card__facts {
  position: relative;
  z-index: 1;
  margin-top: 8px;
}

.studio-card__fact {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  align-items: baseline;
  gap: 12px;
  padding: 11px 0;
  border-bottom: 1px solid var(--line-soft);
}

.studio-card__fact dt {
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.studio-card__fact dd {
  min-width: 0;
  margin: 0;
  overflow-wrap: anywhere;
  color: var(--text-secondary);
  font-size: 0.78rem;
  line-height: 1.5;
}

.studio-card__fact dd a {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color var(--dur-fast) var(--ease-out);
}

.studio-card__fact dd a:hover {
  color: var(--text);
}

.studio-card__status {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  color: var(--text-tertiary);
  font-size: 0.68rem;
}

.studio-card__status .status-dot {
  width: 5px;
  height: 5px;
}

/* Positioning ----------------------------------------------------------- */

.positioning-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.positioning-card {
  position: relative;
  display: flex;
  min-height: 230px;
  flex-direction: column;
  overflow: hidden;
  padding: 25px;
  border-radius: var(--r-md);
}

.positioning-card::before {
  content: "";
  position: absolute;
  right: -30%;
  bottom: -44%;
  width: 80%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(185, 167, 248, 0.07), transparent 68%);
  pointer-events: none;
}

.positioning-card__index {
  position: relative;
  z-index: 1;
  color: rgba(168, 199, 250, 0.32);
  font-size: 1.9rem;
  font-weight: 500;
  letter-spacing: -0.05em;
  line-height: 1;
}

.positioning-card__title {
  position: relative;
  z-index: 1;
  margin-top: 32px;
  padding-top: 0;
  font-size: 1.16rem;
  font-weight: 570;
  letter-spacing: -0.025em;
  line-height: 1.32;
}

.positioning-card__desc {
  position: relative;
  z-index: 1;
  margin-top: 9px;
  color: var(--text-tertiary);
  font-size: 0.8rem;
  line-height: 1.72;
}

/* Principles ------------------------------------------------------------ */

.principles-section {
  padding-top: clamp(30px, 4vw, 52px);
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.principle {
  padding: 25px;
  border-radius: var(--r-md);
}

.principle__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.principle__icon {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--blue);
}

.principle:nth-child(2) .principle__icon {
  color: var(--violet);
}

.principle:nth-child(3) .principle__icon {
  color: var(--cyan);
}

.principle:nth-child(4) .principle__icon {
  color: var(--green);
}

.principle__num {
  color: var(--text-tertiary);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
}

.principle__title {
  margin-top: 20px;
  font-size: 1.08rem;
  font-weight: 560;
  letter-spacing: -0.022em;
  line-height: 1.4;
}

.principle__desc {
  max-width: 48ch;
  margin-top: 8px;
  color: var(--text-tertiary);
  font-size: 0.81rem;
  line-height: 1.7;
}

/* AI -------------------------------------------------------------------- */

.ai-section {
  padding-top: clamp(30px, 4vw, 44px);
}

.ai-panel {
  position: relative;
  overflow: hidden;
  padding: clamp(30px, 4.4vw, 54px);
  border-radius: var(--r-xl);
}

.ai-panel__orb {
  position: absolute;
  top: -60%;
  right: 4%;
  width: 500px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 199, 250, 0.12), transparent 67%);
  pointer-events: none;
}

.ai-copy {
  position: relative;
  z-index: 1;
  max-width: 660px;
}

.ai-copy__title {
  margin-top: 18px;
  font-size: clamp(1.8rem, 1.35rem + 1.7vw, 2.6rem);
  font-weight: 570;
  letter-spacing: -0.04em;
  line-height: 1.16;
}

.ai-copy__desc {
  max-width: 66ch;
  margin-top: 15px;
  color: var(--text-secondary);
  font-size: 0.88rem;
  line-height: 1.78;
}

.ai-flow {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
  margin-top: 34px;
}

.ai-flow__item {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.ai-flow__node {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-secondary);
  font-size: 0.73rem;
  line-height: 1.3;
  white-space: nowrap;
}

.ai-flow__dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--text-tertiary);
}

.ai-flow__node.is-blue {
  border-color: rgba(168, 199, 250, 0.15);
  color: #c6dbff;
}

.ai-flow__node.is-blue .ai-flow__dot {
  background: var(--blue);
}

.ai-flow__node.is-violet {
  border-color: rgba(185, 167, 248, 0.15);
  color: #d7ccff;
}

.ai-flow__node.is-violet .ai-flow__dot {
  background: var(--violet);
}

.ai-flow__node.is-green {
  border-color: rgba(147, 231, 179, 0.16);
  color: #c4f5d6;
}

.ai-flow__node.is-green .ai-flow__dot {
  background: var(--green);
}

.ai-flow__arrow {
  color: var(--text-tertiary);
  opacity: 0.5;
}

.ai-panel__note {
  position: relative;
  z-index: 1;
  margin-top: 26px;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-size: 0.64rem;
  letter-spacing: 0.04em;
}

/* Open source ------------------------------------------------------------ */

.open-source-section {
  padding-top: clamp(36px, 5vw, 60px);
  padding-bottom: clamp(20px, 3vw, 36px);
}

.open-source-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: start;
  gap: clamp(32px, 5vw, 64px);
}

.open-source-copy :deep(.section-head) {
  margin-bottom: 26px;
}

.open-source-list {
  overflow: hidden;
  padding: 6px 20px;
  border-radius: var(--r-md);
}

.open-source-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 17px 2px;
  border-bottom: 1px solid var(--line-soft);
  transition: color var(--dur-fast) var(--ease-out);
}

.open-source-row:last-child {
  border-bottom: 0;
}

.open-source-row:hover {
  color: var(--text);
}

.open-source-row__main {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 2px;
}

.open-source-row__name {
  color: var(--text);
  font-size: 0.92rem;
  font-weight: 550;
  letter-spacing: -0.015em;
  line-height: 1.4;
}

.open-source-row__tagline {
  overflow: hidden;
  color: var(--text-tertiary);
  font-size: 0.71rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.open-source-row__status {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 6px;
  color: var(--text-tertiary);
  font-size: 0.64rem;
  white-space: nowrap;
}

.open-source-row__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--text-tertiary);
}

.open-source-row__status.is-live .open-source-row__dot {
  background: var(--green);
}

.open-source-row__status.is-released .open-source-row__dot {
  background: var(--blue);
}

.open-source-row__status.is-building .open-source-row__dot {
  background: var(--violet);
}

.open-source-row__status.is-selfhosted .open-source-row__dot {
  background: var(--cyan);
}

.open-source-row__arrow {
  flex: none;
  color: var(--text-tertiary);
  transition: transform var(--dur-fast) var(--ease-out);
}

.open-source-row:hover .open-source-row__arrow {
  transform: translate(2px, -2px);
}

@media (max-width: 1000px) {
  .studio-grid,
  .open-source-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .studio-card {
    max-width: 480px;
  }

  .positioning-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .positioning-card {
    min-height: 0;
  }

}

@media (max-width: 720px) {
  .principles-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .ai-flow {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }

  .ai-flow__item {
    gap: 6px;
  }

  .ai-flow__arrow {
    transform: rotate(90deg);
  }

  .open-source-list {
    padding-inline: 14px;
  }

  .open-source-row {
    flex-wrap: wrap;
    gap: 7px 12px;
    padding: 15px 0;
  }

  .open-source-row__main {
    flex-basis: 100%;
  }
}

@media (max-width: 520px) {
  .about-aside {
    padding: 21px;
  }

  .studio-card {
    padding: 21px;
  }

  .studio-card__fact {
    grid-template-columns: 76px minmax(0, 1fr);
  }

  .principle,
  .positioning-card {
    padding: 21px;
  }

  .ai-panel {
    border-radius: var(--r-lg);
  }
}
</style>
