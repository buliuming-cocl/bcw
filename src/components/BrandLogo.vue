<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { siteConfig } from '@/config/site'
import { useI18n } from '@/i18n'
import { assetUrl } from '@/utils/assets'

const { t } = useI18n()
const logoUrl = assetUrl('logo.svg')

withDefaults(
  defineProps<{
    to?: string
    compact?: boolean
  }>(),
  {
    to: '/',
    compact: false,
  },
)
</script>

<template>
  <RouterLink
    :to="to"
    class="brand"
    :class="{ 'brand--compact': compact }"
    :aria-label="`${siteConfig.name} — ${t('nav.home')}`"
  >
    <img class="brand__mark" :src="logoUrl" alt="" width="38" height="38" />
    <span class="brand__text">
      <span class="brand__top">{{ siteConfig.brandHanzi }}</span>
      <span class="brand__bottom">{{ siteConfig.wordmark }}</span>
    </span>
  </RouterLink>
</template>

<style scoped>
.brand {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 11px;
  border-radius: 12px;
}

.brand__mark {
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 11px;
  box-shadow:
    0 6px 18px -8px rgba(0, 0, 0, 0.8),
    0 0 24px -12px rgba(168, 199, 250, 0.5);
}

.brand__text {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 1px;
  line-height: 1;
}

.brand__top {
  font-size: 0.95rem;
  font-weight: 610;
  letter-spacing: 0.015em;
  color: var(--text);
}

.brand__bottom {
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.13em;
  line-height: 1.3;
  text-transform: uppercase;
  white-space: nowrap;
}

.brand:hover .brand__bottom {
  color: var(--text-secondary);
}

.brand--compact .brand__bottom {
  display: none;
}

@media (max-width: 479px) {
  .brand {
    gap: 9px;
  }

  .brand__mark {
    width: 32px;
    height: 32px;
  }

  .brand__bottom {
    display: none;
  }
}
</style>
