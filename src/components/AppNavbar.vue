<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Menu, X, Mail } from 'lucide-vue-next'
import AppButton from './AppButton.vue'
import BrandLogo from './BrandLogo.vue'
import LocaleSwitch from './LocaleSwitch.vue'
import { useI18n } from '@/i18n'
import { siteConfig } from '@/config/site'

const route = useRoute()
const { t } = useI18n()

const primaryLinks = computed(() => [
  { name: 'home', to: '/', label: t('nav.home') },
  { name: 'services', to: '/services', label: t('nav.services') },
  { name: 'pricing', to: '/pricing', label: t('nav.pricing') },
  { name: 'portfolio', to: '/portfolio', label: t('nav.portfolio') },
])

const secondaryLinks = computed(() => [
  { name: 'about', to: '/about', label: t('nav.about') },
  { name: 'faq', to: '/faq', label: t('nav.faq') },
  { name: 'order', to: '/order', label: t('nav.contact') },
])

const scrolled = ref(false)
const menuOpen = ref(false)
const headerEl = ref<HTMLElement | null>(null)
const menuPanelEl = ref<HTMLElement | null>(null)
const menuButtonEl = ref<HTMLButtonElement | null>(null)

function handleScroll() {
  scrolled.value = window.scrollY > 14
}

function lockBody(locked: boolean) {
  document.body.classList.toggle('is-locked', locked)
}

async function openMenu() {
  menuOpen.value = true
  await nextTick()
  menuPanelEl.value?.focus()
}

function closeMenu(restoreFocus = false) {
  if (!menuOpen.value) return
  menuOpen.value = false
  if (restoreFocus) {
    nextTick(() => menuButtonEl.value?.focus())
  }
}

function toggleMenu() {
  if (menuOpen.value) closeMenu(true)
  else void openMenu()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) closeMenu(true)
}

function onDocumentPointerDown(event: PointerEvent) {
  if (!menuOpen.value) return
  const target = event.target as Node | null
  if (target && headerEl.value && !headerEl.value.contains(target)) {
    closeMenu()
  }
}

const desktopQuery = window.matchMedia('(min-width: 900px)')
function onDesktopChange(event: MediaQueryListEvent) {
  if (event.matches) closeMenu()
}

watch(menuOpen, (open) => lockBody(open))

watch(
  () => route.fullPath,
  () => closeMenu(),
)

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onDocumentPointerDown)
  desktopQuery.addEventListener('change', onDesktopChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  desktopQuery.removeEventListener('change', onDesktopChange)
  lockBody(false)
})
</script>

<template>
  <header ref="headerEl" class="site-header" :class="{ 'is-scrolled': scrolled, 'is-open': menuOpen }">
    <div class="container nav-wrap">
      <div class="nav-shell" :class="{ 'nav-shell--glass': scrolled || menuOpen }">
        <BrandLogo />

        <nav class="nav-links" :aria-label="t('nav.primaryLabel')">
          <RouterLink
            v-for="link in primaryLinks"
            :key="link.name"
            :to="link.to"
            class="nav-link"
            :class="{ 'is-active': route.name === link.name }"
            :aria-current="route.name === link.name ? 'page' : undefined"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <div class="nav-actions">
          <LocaleSwitch />
          <AppButton to="/order" variant="glass" size="sm" arrow class="nav-contact">
            {{ t('nav.contact') }}
          </AppButton>
          <button
            ref="menuButtonEl"
            type="button"
            class="menu-toggle"
            :aria-expanded="menuOpen"
            aria-controls="mobile-navigation"
            :aria-label="menuOpen ? t('nav.closeMenu') : t('nav.openMenu')"
            @click="toggleMenu"
          >
            <X v-if="menuOpen" :size="19" :stroke-width="1.8" aria-hidden="true" />
            <Menu v-else :size="19" :stroke-width="1.8" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Transition name="mobile-menu">
        <div
          v-if="menuOpen"
          id="mobile-navigation"
          ref="menuPanelEl"
          class="mobile-menu glass glass--strong glass--edge"
          tabindex="-1"
        >
          <nav class="mobile-menu__nav" :aria-label="t('nav.mobileLabel')">
            <RouterLink
              v-for="link in primaryLinks"
              :key="link.name"
              :to="link.to"
              class="mobile-menu__link"
              :class="{ 'is-active': route.name === link.name }"
              :aria-current="route.name === link.name ? 'page' : undefined"
              @click="closeMenu()"
            >
              <span>{{ link.label }}</span>
              <span class="mobile-menu__index mono" aria-hidden="true">0{{ primaryLinks.indexOf(link) + 1 }}</span>
            </RouterLink>
          </nav>

          <div class="mobile-menu__secondary">
            <RouterLink
              v-for="link in secondaryLinks"
              :key="link.name"
              :to="link.to"
              class="mobile-menu__secondary-link"
              @click="closeMenu()"
            >
              {{ link.label }}
            </RouterLink>
          </div>

          <div class="mobile-menu__footer">
            <AppButton to="/order" variant="primary" block arrow @click="closeMenu()">
              {{ t('common.startProject') }}
            </AppButton>
            <a class="mobile-menu__contact" :href="`mailto:${siteConfig.email}`">
              <Mail :size="14" :stroke-width="1.8" aria-hidden="true" />
              <span>{{ siteConfig.email }}</span>
            </a>
          </div>
        </div>
      </Transition>
    </div>

    <Transition name="scrim">
      <div v-if="menuOpen" class="menu-scrim" aria-hidden="true" @click="closeMenu(true)" />
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: var(--z-nav);
  padding-block: var(--nav-top) 8px;
}

.site-header::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(180deg, rgba(8, 9, 13, 0.78) 0%, rgba(8, 9, 13, 0.24) 62%, transparent 100%);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--dur-base) var(--ease-out);
}

.site-header.is-scrolled::before,
.site-header.is-open::before {
  opacity: 1;
}

.nav-wrap {
  position: relative;
  z-index: 2;
}

.nav-shell {
  display: grid;
  height: var(--nav-h);
  align-items: center;
  padding: 0 9px 0 13px;
  border: 1px solid transparent;
  border-radius: 18px;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  transition:
    border-color var(--dur-base) var(--ease-out),
    background-color var(--dur-base) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out);
}

.nav-shell--glass {
  border-color: rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.018)),
    rgba(11, 14, 20, 0.6);
  -webkit-backdrop-filter: blur(24px) saturate(155%);
  backdrop-filter: blur(24px) saturate(155%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.09),
    0 22px 48px -34px rgba(0, 0, 0, 0.9);
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  justify-self: center;
}

.nav-link {
  position: relative;
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  padding: 0 13px;
  border-radius: var(--r-pill);
  color: var(--text-secondary);
  font-size: 0.82rem;
  font-weight: 480;
  letter-spacing: 0.005em;
  transition:
    color var(--dur-base) var(--ease-out),
    background-color var(--dur-base) var(--ease-out);
}

.nav-link:hover {
  color: var(--text);
}

.nav-link.is-active {
  background: rgba(255, 255, 255, 0.06);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  color: var(--text);
}

.nav-link.is-active::after {
  content: "";
  position: absolute;
  bottom: 5px;
  left: 50%;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--blue);
  box-shadow: 0 0 7px rgba(168, 199, 250, 0.7);
  transform: translateX(-50%);
}

.nav-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 9px;
  justify-self: end;
}

.nav-contact {
  min-height: 38px;
  padding-inline: 16px;
}

.menu-toggle {
  display: none;
  width: 38px;
  height: 38px;
  flex: none;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.045);
  color: var(--text);
  transition:
    background-color var(--dur-base) var(--ease-out),
    border-color var(--dur-base) var(--ease-out);
}

.menu-toggle:hover {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.075);
}

.mobile-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: var(--gutter);
  left: var(--gutter);
  z-index: 2;
  max-height: calc(100svh - var(--nav-h) - 44px);
  overflow-y: auto;
  padding: 14px;
  border-radius: var(--r-lg);
  outline: none;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 40px 90px -36px rgba(0, 0, 0, 0.96);
}

.mobile-menu__nav {
  display: flex;
  flex-direction: column;
}

.mobile-menu__link {
  display: flex;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  border-radius: 12px;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
  transition:
    color var(--dur-fast) var(--ease-out),
    background-color var(--dur-fast) var(--ease-out);
}

.mobile-menu__link:hover,
.mobile-menu__link.is-active {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text);
}

.mobile-menu__index {
  color: var(--text-tertiary);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
}

.mobile-menu__secondary {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  margin-top: 8px;
  padding: 14px;
  border-top: 1px solid var(--line-soft);
}

.mobile-menu__secondary-link {
  color: var(--text-tertiary);
  font-size: 0.8rem;
  transition: color var(--dur-fast) var(--ease-out);
}

.mobile-menu__secondary-link:hover {
  color: var(--text);
}

.mobile-menu__footer {
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-top: 8px;
  padding: 14px;
  border-top: 1px solid var(--line-soft);
}

.mobile-menu__contact {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  transition: color var(--dur-fast) var(--ease-out);
}

.mobile-menu__contact:hover {
  color: var(--text-secondary);
}

.menu-scrim {
  position: fixed;
  inset: 0;
  z-index: 1;
  background: rgba(5, 6, 10, 0.55);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 200ms var(--ease-out),
    transform 260ms var(--ease-spring);
}

.mobile-menu-leave-active {
  pointer-events: none;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-9px);
}

.scrim-enter-active,
.scrim-leave-active {
  transition: opacity 220ms var(--ease-out);
}

.scrim-enter-from,
.scrim-leave-to {
  opacity: 0;
}

@media (max-width: 899px) {
  .nav-shell {
    grid-template-columns: minmax(0, 1fr) auto;
    padding-inline: 11px;
  }

  .nav-links,
  .nav-contact {
    display: none;
  }

  .menu-toggle {
    display: grid;
  }

  .mobile-menu {
    display: block;
  }
}

@media (min-width: 900px) {
  .mobile-menu,
  .menu-scrim {
    display: none;
  }
}

@media (max-width: 520px) {
  .nav-shell {
    height: 62px;
    border-radius: 16px;
  }

  .nav-actions {
    gap: 7px;
  }

  .menu-toggle {
    width: 36px;
    height: 36px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu-enter-active,
  .mobile-menu-leave-active,
  .scrim-enter-active,
  .scrim-leave-active {
    transition: none;
  }
}
</style>
