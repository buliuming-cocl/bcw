<script setup lang="ts">
import { Github, Info } from 'lucide-vue-next'
import AppButton from '@/components/AppButton.vue'
import CtaPanel from '@/components/CtaPanel.vue'
import PageHero from '@/components/PageHero.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { projects } from '@/data/projects'
import { siteConfig } from '@/config/site'
import { useI18n } from '@/i18n'
import { assetUrl } from '@/utils/assets'

const { t, pick } = useI18n()
</script>

<template>
  <div class="portfolio-page">
    <PageHero
      :eyebrow="t('portfolioPage.hero.eyebrow')"
      :title="t('portfolioPage.hero.title')"
      :description="t('portfolioPage.hero.description')"
    >
      <template #actions>
        <AppButton to="/order" variant="primary" arrow>{{ t('common.startProject') }}</AppButton>
        <AppButton :href="siteConfig.studioGithub" variant="glass">
          <Github :size="15" :stroke-width="1.8" aria-hidden="true" />
          {{ t('common.github') }}
        </AppButton>
      </template>

      <template #aside>
        <div class="portfolio-aside glass glass--strong glass--edge">
          <div class="portfolio-aside__head">
            <span class="portfolio-aside__label">{{ t('portfolioPage.hero.asideLabel') }}</span>
            <span class="portfolio-aside__count mono">04</span>
          </div>

          <div class="portfolio-mosaic">
            <figure v-for="project in projects" :key="project.id" class="portfolio-mosaic__item">
              <div class="portfolio-mosaic__frame">
                <img
                  :src="assetUrl(project.screenshot)"
                  alt=""
                  width="1120"
                  height="700"
                  aria-hidden="true"
                />
              </div>
              <figcaption>{{ project.name }}</figcaption>
            </figure>
          </div>

          <div class="portfolio-aside__foot">
            <span class="status-dot" aria-hidden="true" />
            <span>{{ t('portfolioPage.hero.asideNote') }}</span>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="section portfolio-content">
      <div class="container">
        <SectionHeading
          v-reveal
          :eyebrow="t('portfolioPage.hero.asideLabel')"
          :title="t('home.projects.title')"
          :description="t('home.projects.description')"
        />

        <div class="portfolio-grid">
          <ProjectCard
            v-for="(project, index) in projects"
            :key="project.id"
            v-reveal="index % 2"
            :project="project"
          />
        </div>

        <div class="portfolio-note">
          <Info :size="16" :stroke-width="1.8" aria-hidden="true" />
          <p>{{ t('portfolioPage.note') }}</p>
        </div>
      </div>
    </section>

    <section class="section portfolio-more">
      <div class="container">
        <div class="more-panel glass glass--edge">
          <div class="more-panel__orb" aria-hidden="true" />
          <div class="more-panel__copy">
            <span class="eyebrow">
              <span class="eyebrow__dot" aria-hidden="true" />
              {{ t('common.openSource') }}
            </span>
            <h2 class="more-panel__title">{{ t('portfolioPage.more.title') }}</h2>
            <p class="more-panel__desc">{{ t('portfolioPage.more.description') }}</p>
          </div>
          <div class="more-panel__actions">
            <AppButton :href="siteConfig.studioGithub" variant="glass" arrow>
              {{ t('portfolioPage.more.github') }}
            </AppButton>
            <AppButton :href="siteConfig.studioUrl" variant="ghost" arrow>
              {{ t('portfolioPage.more.studio') }}
            </AppButton>
          </div>
        </div>
      </div>
    </section>

    <CtaPanel
      :title="t('portfolioPage.cta.title')"
      :description="t('portfolioPage.cta.description')"
      :primary-label="t('portfolioPage.cta.primary')"
      primary-to="/order"
      :secondary-label="t('portfolioPage.cta.secondary')"
      secondary-to="/services"
    />
  </div>
</template>

<style scoped>
.portfolio-aside {
  position: relative;
  overflow: hidden;
  padding: 20px;
  border-radius: var(--r-lg);
}

.portfolio-aside::after {
  content: "";
  position: absolute;
  top: -38%;
  right: -24%;
  width: 72%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 199, 250, 0.13), transparent 64%);
  pointer-events: none;
}

.portfolio-aside__head {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 4px 0;
}

.portfolio-aside__label {
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.63rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.portfolio-aside__count {
  color: var(--text-tertiary);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
}

.portfolio-mosaic {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
  margin-top: 18px;
}

.portfolio-mosaic__item {
  position: relative;
  min-width: 0;
}

.portfolio-mosaic__frame {
  overflow: hidden;
  aspect-ratio: 16 / 10;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 9px;
  background: #0a0c12;
  box-shadow: 0 12px 24px -16px rgba(0, 0, 0, 0.9);
}

.portfolio-mosaic__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.portfolio-mosaic__item figcaption {
  margin-top: 6px;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-size: 0.56rem;
  letter-spacing: 0.04em;
  line-height: 1.3;
}

.portfolio-aside__foot {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 17px;
  padding-top: 14px;
  border-top: 1px solid var(--line-soft);
  color: var(--text-tertiary);
  font-size: 0.68rem;
}

.portfolio-aside__foot .status-dot {
  width: 5px;
  height: 5px;
}

.portfolio-content {
  padding-top: clamp(6px, 1.2vw, 14px);
  padding-bottom: clamp(42px, 5vw, 64px);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.portfolio-note {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  margin-top: 20px;
  padding: 12px 16px;
  border: 1px solid var(--line-soft);
  border-radius: var(--r-sm);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-tertiary);
  font-size: 0.76rem;
  line-height: 1.65;
}

.portfolio-note svg {
  flex: none;
  margin-top: 2px;
  color: var(--blue);
}

.portfolio-more {
  padding-top: 0;
  padding-bottom: clamp(20px, 3vw, 36px);
}

.more-panel {
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: clamp(28px, 4vw, 44px);
  border-radius: var(--r-lg);
}

.more-panel__orb {
  position: absolute;
  top: -70%;
  left: 12%;
  width: 430px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(185, 167, 248, 0.12), transparent 68%);
  pointer-events: none;
}

.more-panel__copy {
  position: relative;
  z-index: 1;
  max-width: 580px;
}

.more-panel__title {
  margin-top: 14px;
  font-size: clamp(1.5rem, 1.2rem + 1.1vw, 2rem);
  font-weight: 570;
  letter-spacing: -0.032em;
  line-height: 1.25;
}

.more-panel__desc {
  max-width: 58ch;
  margin-top: 10px;
  color: var(--text-tertiary);
  font-size: 0.84rem;
  line-height: 1.72;
}

.more-panel__actions {
  position: relative;
  z-index: 1;
  display: flex;
  flex: none;
  flex-wrap: wrap;
  gap: 9px;
}

@media (max-width: 899px) {
  .portfolio-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .more-panel {
    align-items: flex-start;
    flex-direction: column;
    gap: 22px;
  }
}

@media (max-width: 520px) {
  .portfolio-aside {
    padding: 17px;
  }

  .more-panel__actions {
    width: 100%;
    flex-direction: column;
  }

  .more-panel__actions :deep(.btn) {
    width: 100%;
  }
}
</style>
