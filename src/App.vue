<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AmbientBackground from '@/components/AmbientBackground.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppNavbar from '@/components/AppNavbar.vue'
import { useI18n } from '@/i18n'
import { siteConfig } from '@/config/site'

const route = useRoute()
const { t, locale } = useI18n()

const SITE_NAME = siteConfig.name

function updateDocumentMeta() {
  const titleKey = route.meta.titleKey
  const descKey = route.meta.descKey

  if (titleKey) {
    const pageTitle = t(titleKey)
    document.title =
      route.name === 'home' ? `${SITE_NAME} — ${t('common.tagline')}` : `${pageTitle} · ${SITE_NAME}`
  } else {
    document.title = SITE_NAME
  }

  if (descKey) {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (meta) meta.content = t(descKey)
  }

  document.documentElement.lang = locale.value
}

watch(
  [
    () => route.fullPath,
    () => route.name,
    () => route.meta.titleKey,
    () => route.meta.descKey,
    locale,
  ],
  updateDocumentMeta,
  { immediate: true, flush: 'post' },
)

onMounted(updateDocumentMeta)
</script>

<template>
  <a class="skip-link" href="#main-content">{{ t('common.skipToContent') }}</a>
  <AmbientBackground />

  <div class="app-shell">
    <AppNavbar />

    <main id="main-content" class="app-main" tabindex="-1">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <AppFooter />
  </div>
</template>
