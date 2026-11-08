<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import type { FaqItem } from '@/data/faq'
import { useI18n } from '@/i18n'

const props = defineProps<{
  item: FaqItem
  index: number
  open: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()

const { t, pick } = useI18n()

const answerId = computed(() => `faq-answer-${props.item.id}`)
const buttonId = computed(() => `faq-question-${props.item.id}`)
const displayIndex = computed(() => String(props.index + 1).padStart(2, '0'))
</script>

<template>
  <div class="faq-item glass" :class="{ 'is-open': open }">
    <h3 class="faq-item__heading">
      <button
        :id="buttonId"
        type="button"
        class="faq-item__trigger"
        :aria-expanded="open"
        :aria-controls="answerId"
        @click="emit('toggle')"
      >
        <span class="faq-item__index mono" aria-hidden="true">{{ displayIndex }}</span>
        <span class="faq-item__question">{{ pick(item.question) }}</span>
        <span class="faq-item__icon" aria-hidden="true">
          <ChevronDown :size="17" :stroke-width="1.8" />
        </span>
      </button>
    </h3>

    <div
      :id="answerId"
      class="faq-item__answer-grid"
      role="region"
      :aria-labelledby="buttonId"
      :aria-hidden="!open"
    >
      <div class="faq-item__answer-clip">
        <div class="faq-item__answer">
          <p>{{ pick(item.answer) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-item {
  overflow: hidden;
  border-radius: var(--r-md);
  transition:
    border-color var(--dur-base) var(--ease-out),
    background-color var(--dur-base) var(--ease-out);
}

.faq-item.is-open {
  border-color: rgba(168, 199, 250, 0.18);
  background:
    linear-gradient(138deg, rgba(168, 199, 250, 0.045), transparent 44%),
    var(--glass-fill);
}

.faq-item__heading {
  font: inherit;
  letter-spacing: normal;
}

.faq-item__trigger {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 18px;
  padding: 22px 24px;
  text-align: left;
}

.faq-item__index {
  flex: none;
  color: var(--text-tertiary);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  transition: color var(--dur-base) var(--ease-out);
}

.faq-item.is-open .faq-item__index {
  color: var(--blue);
}

.faq-item__question {
  flex: 1;
  color: var(--text);
  font-size: clamp(0.94rem, 0.9rem + 0.18vw, 1.04rem);
  font-weight: 540;
  letter-spacing: -0.018em;
  line-height: 1.5;
}

.faq-item__icon {
  display: grid;
  width: 30px;
  height: 30px;
  flex: none;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-secondary);
  transition:
    transform var(--dur-base) var(--ease-spring),
    border-color var(--dur-base) var(--ease-out),
    color var(--dur-base) var(--ease-out);
}

.faq-item.is-open .faq-item__icon {
  border-color: rgba(168, 199, 250, 0.22);
  color: var(--blue);
  transform: rotate(180deg);
}

.faq-item__answer-grid {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 380ms var(--ease-out);
}

.faq-item.is-open .faq-item__answer-grid {
  grid-template-rows: 1fr;
}

.faq-item__answer-clip {
  overflow: hidden;
}

.faq-item__answer {
  padding: 0 24px 24px 58px;
}

.faq-item__answer p {
  max-width: 74ch;
  color: var(--text-secondary);
  font-size: 0.87rem;
  line-height: 1.78;
}

@media (max-width: 600px) {
  .faq-item__trigger {
    gap: 13px;
    padding: 18px 17px;
  }

  .faq-item__answer {
    padding: 0 17px 20px 43px;
  }

  .faq-item__answer p {
    font-size: 0.84rem;
  }

  .faq-item__icon {
    width: 27px;
    height: 27px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq-item__answer-grid {
    transition: none;
  }
}
</style>
