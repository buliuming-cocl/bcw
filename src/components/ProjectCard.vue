<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight, Github } from 'lucide-vue-next'
import type { Project } from '@/data/projects'
import { useI18n } from '@/i18n'
import { assetUrl } from '@/utils/assets'

const props = withDefaults(
  defineProps<{
    project: Project
    compact?: boolean
  }>(),
  {
    compact: false,
  },
)

const { t, pick } = useI18n()

const displayUrl = computed(() => {
  const source = props.project.website ?? props.project.github
  try {
    const url = new URL(source)
    return `${url.host}${url.pathname === '/' ? '' : url.pathname}`
  } catch {
    return source
  }
})

const previewHref = computed(() => props.project.website ?? props.project.github)
const statusClass = computed(() => `is-${props.project.statusTone}`)
</script>

<template>
  <article class="project-card glass glass--edge card-hover" :class="{ 'project-card--compact': compact }">
    <a
      :href="previewHref"
      class="project-card__preview"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="`${project.name} — ${t(project.website ? 'portfolioPage.labels.live' : 'common.sourceCode')}`"
    >
      <div class="project-card__browser">
        <span class="project-card__dots" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span class="project-card__url mono">{{ displayUrl }}</span>
      </div>
      <div class="project-card__shot">
        <img
          :src="assetUrl(project.screenshot)"
          :alt="pick(project.screenshotAlt)"
          width="1120"
          height="700"
          loading="lazy"
          decoding="async"
        />
      </div>
      <span class="project-card__open" aria-hidden="true">
        <ArrowUpRight :size="16" :stroke-width="1.8" />
      </span>
    </a>

    <div class="project-card__body">
      <div class="project-card__head">
        <div class="project-card__identity">
          <span class="project-card__year mono">{{ project.year }}</span>
          <h3 class="project-card__name">{{ project.name }}</h3>
        </div>
        <span class="project-card__status" :class="statusClass">
          <span class="project-card__status-dot" aria-hidden="true" />
          {{ pick(project.status) }}
        </span>
      </div>

      <p class="project-card__tagline">{{ pick(project.tagline) }}</p>
      <p v-if="!compact" class="project-card__desc">{{ pick(project.description) }}</p>

      <div class="project-card__footer">
        <ul class="project-card__tech" :aria-label="t('portfolioPage.labels.stack')">
          <li v-for="tech in project.tech" :key="tech">{{ tech }}</li>
        </ul>

        <div class="project-card__links">
          <a
            v-if="project.website"
            :href="project.website"
            class="project-card__link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${project.name} — ${t('portfolioPage.labels.live')}`"
          >
            {{ t('portfolioPage.labels.live') }}
            <ArrowUpRight :size="14" :stroke-width="1.8" aria-hidden="true" />
          </a>
          <a
            :href="project.github"
            class="project-card__link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${project.name} — ${t('portfolioPage.labels.source')}`"
          >
            <Github :size="14" :stroke-width="1.8" aria-hidden="true" />
            {{ t('portfolioPage.labels.source') }}
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  padding: 10px;
  overflow: hidden;
  border-radius: var(--r-md);
  --card-glow: rgba(168, 199, 250, 0.34);
}

.project-card__preview {
  position: relative;
  display: block;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 13px;
  background: #0a0c12;
}

.project-card__browser {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.055);
  background: rgba(255, 255, 255, 0.025);
}

.project-card__dots {
  display: flex;
  flex: none;
  gap: 5px;
}

.project-card__dots i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
}

.project-card__url {
  overflow: hidden;
  color: var(--text-tertiary);
  font-size: 0.58rem;
  letter-spacing: -0.01em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.project-card__shot {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #0a0c12;
}

.project-card__shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 700ms var(--ease-out);
}

.project-card__open {
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  background: rgba(8, 9, 13, 0.58);
  color: var(--text);
  opacity: 0;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transform: translateY(4px);
  transition:
    opacity var(--dur-base) var(--ease-out),
    transform var(--dur-base) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .project-card:hover .project-card__shot img {
    transform: scale(1.025);
  }

  .project-card:hover .project-card__open {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 18px 12px 12px;
}

.project-card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.project-card__identity {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.project-card__year {
  color: var(--text-tertiary);
  font-size: 0.61rem;
  letter-spacing: 0.08em;
}

.project-card__name {
  font-size: 1.42rem;
  font-weight: 590;
  letter-spacing: -0.035em;
  line-height: 1;
}

.project-card__status {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 6px;
  padding: 5px 9px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.035);
  color: var(--text-secondary);
  font-size: 0.65rem;
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
}

.project-card__status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--text-tertiary);
}

.project-card__status.is-live .project-card__status-dot {
  background: var(--green);
  box-shadow: 0 0 8px rgba(147, 231, 179, 0.55);
}

.project-card__status.is-released .project-card__status-dot {
  background: var(--blue);
  box-shadow: 0 0 8px rgba(168, 199, 250, 0.5);
}

.project-card__status.is-building .project-card__status-dot {
  background: var(--violet);
  box-shadow: 0 0 8px rgba(185, 167, 248, 0.5);
}

.project-card__status.is-selfhosted .project-card__status-dot {
  background: var(--cyan);
  box-shadow: 0 0 8px rgba(165, 230, 224, 0.45);
}

.project-card__tagline {
  margin-top: 12px;
  color: var(--text-secondary);
  font-size: 0.86rem;
  line-height: 1.6;
}

.project-card__desc {
  margin-top: 9px;
  color: var(--text-tertiary);
  font-size: 0.79rem;
  line-height: 1.7;
}

.project-card__footer {
  margin-top: auto;
  padding-top: 18px;
}

.project-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.project-card__tech li {
  padding: 4px 8px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.025);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.59rem;
  letter-spacing: 0.02em;
  line-height: 1.4;
}

.project-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--line-soft);
}

.project-card__link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--text-secondary);
  font-size: 0.72rem;
  font-weight: 500;
  transition: color var(--dur-base) var(--ease-out);
}

.project-card__link:hover {
  color: var(--text);
}

.project-card--compact .project-card__body {
  padding-bottom: 8px;
}

@media (max-width: 600px) {
  .project-card {
    padding: 8px;
  }

  .project-card__body {
    padding: 16px 10px 10px;
  }

  .project-card__head {
    flex-wrap: wrap;
  }

  .project-card__status {
    margin-top: 2px;
  }
}
</style>
