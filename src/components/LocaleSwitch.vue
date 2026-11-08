<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'

const { locale, setLocale, t } = useI18n()

const isEnglish = computed(() => locale.value === 'en')
</script>

<template>
  <div
    class="locale-switch"
    :class="{ 'locale-switch--en': isEnglish }"
    role="group"
    :aria-label="t('language.label')"
  >
    <span class="locale-switch__thumb" aria-hidden="true" />
    <button
      type="button"
      class="locale-switch__option"
      :class="{ 'is-active': !isEnglish }"
      :aria-pressed="!isEnglish"
      :title="t('language.switchToZh')"
      @click="setLocale('zh-CN')"
    >
      {{ t('language.zh') }}
    </button>
    <button
      type="button"
      class="locale-switch__option"
      :class="{ 'is-active': isEnglish }"
      :aria-pressed="isEnglish"
      :title="t('language.switchToEn')"
      @click="setLocale('en')"
    >
      {{ t('language.en') }}
    </button>
  </div>
</template>

<style scoped>
.locale-switch {
  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  padding: 3px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.035);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.locale-switch__thumb {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: calc(50% - 3px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.1);
  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transition: transform var(--dur-base) var(--ease-spring);
}

.locale-switch--en .locale-switch__thumb {
  transform: translateX(100%);
}

.locale-switch__option {
  position: relative;
  z-index: 1;
  min-width: 42px;
  min-height: 30px;
  padding: 0 9px;
  border-radius: var(--r-pill);
  color: var(--text-secondary);
  font-size: 0.7rem;
  font-weight: 540;
  letter-spacing: 0.02em;
  line-height: 1;
  transition: color var(--dur-base) var(--ease-out);
}

.locale-switch__option:hover {
  color: var(--text);
}

.locale-switch__option.is-active {
  color: var(--text);
}

@media (max-width: 899px) {
  .locale-switch__option {
    min-height: 34px;
  }
}
</style>
