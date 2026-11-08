<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowUpRight, Github, Mail } from 'lucide-vue-next'
import BrandLogo from './BrandLogo.vue'
import { siteConfig } from '@/config/site'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const footerLinks = computed(() => [
  { name: 'home', to: '/', label: t('nav.home') },
  { name: 'services', to: '/services', label: t('nav.services') },
  { name: 'pricing', to: '/pricing', label: t('nav.pricing') },
  { name: 'portfolio', to: '/portfolio', label: t('nav.portfolio') },
  { name: 'about', to: '/about', label: t('nav.about') },
  { name: 'faq', to: '/faq', label: t('nav.faq') },
])

const mailto = computed(() => `mailto:${siteConfig.email}`)
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__glow" aria-hidden="true" />
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <BrandLogo />
          <p class="footer-brand__tagline">{{ t('common.taglineLatin') }}</p>
          <p class="footer-brand__intro">{{ t('footer.intro') }}</p>
          <div class="footer-status">
            <span class="status-dot" aria-hidden="true" />
            <span>{{ t('footer.availability') }}</span>
          </div>
        </div>

        <nav class="footer-col" :aria-label="t('footer.navTitle')">
          <h2 class="footer-col__title">{{ t('footer.navTitle') }}</h2>
          <ul class="footer-links">
            <li v-for="link in footerLinks" :key="link.name">
              <RouterLink :to="link.to" class="footer-link">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <div class="footer-col footer-contact">
          <h2 class="footer-col__title">{{ t('footer.contactTitle') }}</h2>

          <a class="footer-contact__row footer-contact__row--mail" :href="mailto">
            <span class="footer-contact__icon"><Mail :size="15" :stroke-width="1.8" aria-hidden="true" /></span>
            <span class="footer-contact__body">
              <span class="footer-contact__label">{{ t('footer.emailLabel') }}</span>
              <span class="footer-contact__value">{{ siteConfig.email }}</span>
            </span>
            <ArrowUpRight class="footer-contact__arrow" :size="14" :stroke-width="1.8" aria-hidden="true" />
          </a>

          <a
            class="footer-contact__row"
            :href="siteConfig.github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="footer-contact__icon"><Github :size="15" :stroke-width="1.8" aria-hidden="true" /></span>
            <span class="footer-contact__body">
              <span class="footer-contact__label">{{ t('footer.githubLabel') }}</span>
              <span class="footer-contact__value mono">buliuming-cocl/bcw</span>
            </span>
            <ArrowUpRight class="footer-contact__arrow" :size="14" :stroke-width="1.8" aria-hidden="true" />
          </a>

          <a
            class="footer-contact__row"
            :href="siteConfig.studioUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="footer-contact__icon"><ArrowUpRight :size="15" :stroke-width="1.8" aria-hidden="true" /></span>
            <span class="footer-contact__body">
              <span class="footer-contact__label">{{ t('footer.studioLabel') }}</span>
              <span class="footer-contact__value">buliuming-cocl.github.io</span>
            </span>
            <ArrowUpRight class="footer-contact__arrow" :size="14" :stroke-width="1.8" aria-hidden="true" />
          </a>

          <div class="footer-contact__channels">
            <div v-if="siteConfig.qq" class="footer-contact__channel">
              <span>{{ t('footer.qqLabel') }}</span>
              <strong>{{ siteConfig.qq }}</strong>
            </div>
            <div v-if="siteConfig.wechat" class="footer-contact__channel">
              <span>{{ t('footer.wechatLabel') }}</span>
              <strong>{{ siteConfig.wechat }}</strong>
            </div>
            <RouterLink v-if="!siteConfig.qq && !siteConfig.wechat" to="/order" class="footer-contact__request">
              <span>{{ t('footer.qqLabel') }} / {{ t('footer.wechatLabel') }}</span>
              <strong>{{ t('footer.contactOnRequest') }}</strong>
              <ArrowUpRight :size="13" :stroke-width="1.8" aria-hidden="true" />
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-bottom__copy">{{ t('footer.copyright') }}</p>
        <p class="footer-bottom__note">{{ t('footer.builtNote') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  margin-top: clamp(20px, 4vw, 48px);
  overflow: hidden;
  border-top: 1px solid var(--line-soft);
  background:
    linear-gradient(180deg, rgba(10, 12, 18, 0.5), rgba(7, 8, 12, 0.9)),
    var(--bg);
}

.site-footer__glow {
  position: absolute;
  top: -240px;
  left: 50%;
  width: min(70vw, 760px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(120, 139, 210, 0.08), transparent 68%);
  transform: translateX(-50%);
  pointer-events: none;
}

.footer-grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(140px, 0.55fr) minmax(280px, 1fr);
  gap: clamp(32px, 5vw, 72px);
  padding-block: clamp(54px, 7vw, 80px) clamp(42px, 5vw, 58px);
}

.footer-brand__tagline {
  margin-top: 24px;
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 480;
  letter-spacing: 0.01em;
}

.footer-brand__intro {
  max-width: 40ch;
  margin-top: 13px;
  color: var(--text-tertiary);
  font-size: 0.8rem;
  line-height: 1.78;
}

.footer-status {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 23px;
  padding: 7px 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.025);
  color: var(--text-secondary);
  font-size: 0.71rem;
  line-height: 1.3;
}

.footer-status .status-dot {
  width: 5px;
  height: 5px;
}

.footer-col__title {
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin-top: 22px;
}

.footer-link {
  color: var(--text-secondary);
  font-size: 0.84rem;
  transition: color var(--dur-fast) var(--ease-out);
}

.footer-link:hover {
  color: var(--text);
}

.footer-contact {
  display: flex;
  flex-direction: column;
}

.footer-contact__row {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 10px;
  padding: 11px 0;
  border-bottom: 1px solid var(--line-soft);
  color: var(--text-secondary);
  transition: color var(--dur-fast) var(--ease-out);
}

.footer-contact__row:first-of-type {
  margin-top: 12px;
}

.footer-contact__row:hover {
  color: var(--text);
}

.footer-contact__icon {
  display: grid;
  width: 28px;
  height: 28px;
  flex: none;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.025);
  color: var(--text-tertiary);
}

.footer-contact__body {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 1px;
}

.footer-contact__label {
  color: var(--text-tertiary);
  font-size: 0.61rem;
  letter-spacing: 0.02em;
}

.footer-contact__value {
  overflow: hidden;
  color: var(--text-secondary);
  font-size: 0.76rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mono {
  font-family: var(--font-mono);
  font-size: 0.68rem;
}

.footer-contact__arrow {
  flex: none;
  color: var(--text-tertiary);
  opacity: 0.65;
  transition: transform var(--dur-fast) var(--ease-out);
}

.footer-contact__row:hover .footer-contact__arrow {
  transform: translate(2px, -2px);
}

.footer-contact__channels {
  margin-top: 14px;
}

.footer-contact__request,
.footer-contact__channel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px 8px;
  color: var(--text-tertiary);
  font-size: 0.72rem;
  line-height: 1.5;
}

.footer-contact__request {
  width: fit-content;
  transition: color var(--dur-fast) var(--ease-out);
}

.footer-contact__request:hover {
  color: var(--text-secondary);
}

.footer-contact__request strong,
.footer-contact__channel strong {
  color: var(--text-secondary);
  font-weight: 500;
}

.footer-bottom {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 24px;
  padding-block: 22px 26px;
  border-top: 1px solid var(--line-soft);
}

.footer-bottom__copy,
.footer-bottom__note {
  color: var(--text-tertiary);
  font-size: 0.69rem;
  line-height: 1.6;
}

@media (max-width: 980px) {
  .footer-grid {
    grid-template-columns: minmax(0, 1.2fr) minmax(130px, 0.55fr);
  }

  .footer-contact {
    grid-column: 1 / -1;
    max-width: 520px;
  }

  .footer-contact__row:first-of-type {
    margin-top: 16px;
  }
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 36px;
    padding-block: 46px 40px;
  }

  .footer-brand__intro {
    max-width: 50ch;
  }

  .footer-links {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 11px 22px;
    margin-top: 16px;
  }

  .footer-contact {
    grid-column: auto;
    max-width: none;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 7px;
  }
}
</style>
