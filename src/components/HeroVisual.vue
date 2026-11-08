<script setup lang="ts">
import { Command, Rocket, Sparkles } from 'lucide-vue-next'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const codeLines = [
  [{ text: '// idea → interface', type: 'comment' }],
  [
    { text: 'type ', type: 'keyword' },
    { text: 'Idea', type: 'type' },
    { text: ' = {', type: 'plain' },
  ],
  [
    { text: '  vision', type: 'plain' },
    { text: ': ', type: 'plain' },
    { text: 'string', type: 'type' },
  ],
  [{ text: '}', type: 'plain' }],
  [],
  [
    { text: 'export async function ', type: 'keyword' },
    { text: 'ship', type: 'function' },
    { text: '(idea: ', type: 'plain' },
    { text: 'Idea', type: 'type' },
    { text: ') {', type: 'plain' },
  ],
  [
    { text: '  const ', type: 'keyword' },
    { text: 'scope', type: 'plain' },
    { text: ' = ', type: 'plain' },
    { text: 'await ', type: 'keyword' },
    { text: 'clarify', type: 'function' },
    { text: '(idea)', type: 'plain' },
  ],
  [
    { text: '  const ', type: 'keyword' },
    { text: 'app', type: 'plain' },
    { text: ' = ', type: 'plain' },
    { text: 'await ', type: 'keyword' },
    { text: 'craft', type: 'function' },
    { text: '(scope, {', type: 'plain' },
  ],
  [
    { text: '    stack', type: 'plain' },
    { text: ': [', type: 'plain' },
    { text: "'vue'", type: 'string' },
    { text: ', ', type: 'plain' },
    { text: "'ts'", type: 'string' },
    { text: '],', type: 'plain' },
  ],
  [
    { text: '    mode', type: 'plain' },
    { text: ': ', type: 'plain' },
    { text: "'ai-assisted'", type: 'string' },
    { text: ',', type: 'plain' },
  ],
  [{ text: '  })', type: 'plain' }],
  [
    { text: '  return ', type: 'keyword' },
    { text: 'app', type: 'plain' },
    { text: '.', type: 'plain' },
    { text: 'ship', type: 'function' },
    { text: '()', type: 'plain' },
  ],
  [{ text: '}', type: 'plain' }],
]
</script>

<template>
  <div class="hero-visual" role="img" :aria-label="t('home.hero.visualAria')">
    <div class="hero-visual__halo" aria-hidden="true" />
    <div class="hero-visual__orbit hero-visual__orbit--outer" aria-hidden="true" />
    <div class="hero-visual__orbit hero-visual__orbit--inner" aria-hidden="true" />

    <div class="hero-visual__stage">
      <div class="workstation glass glass--strong glass--edge">
        <div class="workstation__sheen" aria-hidden="true" />

        <div class="workstation__topbar">
          <span class="workstation__dots" aria-hidden="true">
            <i class="is-red" />
            <i class="is-yellow" />
            <i class="is-green" />
          </span>
          <span class="workstation__path mono">
            <Command :size="11" :stroke-width="2" aria-hidden="true" />
            <span>{{ t('home.hero.windowTitle') }}</span>
            <span class="workstation__slash" aria-hidden="true">/</span>
            <span class="workstation__file">{{ t('home.hero.windowSubtitle') }}</span>
          </span>
          <span class="workstation__live mono">
            <span class="status-dot" aria-hidden="true" />
            {{ t('home.hero.buildStatus') }}
          </span>
        </div>

        <div class="workstation__code">
          <div
            v-for="(line, lineIndex) in codeLines"
            :key="lineIndex"
            class="workstation__line"
            :class="{ 'is-active': lineIndex === 7 }"
          >
            <span v-for="(token, tokenIndex) in line" :key="tokenIndex" :class="`tok-${token.type}`">
              {{ token.text }}
            </span>
            <span v-if="line.length === 0">&nbsp;</span>
          </div>
        </div>

        <div class="workstation__statusbar">
          <span class="workstation__status">
            <span class="status-dot" aria-hidden="true" />
            <span>{{ t('home.hero.ready') }}</span>
            <span class="workstation__status-sep" aria-hidden="true" />
            <span class="workstation__status-detail">{{ t('home.hero.readyDetail') }}</span>
          </span>
          <span class="workstation__stack">
            <span class="workstation__stack-label">{{ t('home.hero.stackLabel') }}</span>
            <span class="workstation__stack-chip">Vue 3</span>
            <span class="workstation__stack-chip">TS</span>
            <span class="workstation__stack-chip">AI</span>
          </span>
        </div>
      </div>

      <div class="float-card float-card--ai glass">
        <span class="float-card__icon">
          <Sparkles :size="17" :stroke-width="1.7" aria-hidden="true" />
        </span>
        <span class="float-card__copy">
          <strong>{{ t('home.hero.aiBadge') }}</strong>
          <span>{{ t('home.hero.aiDetail') }}</span>
        </span>
      </div>

      <div class="float-card float-card--deploy glass">
        <span class="float-card__icon float-card__icon--violet">
          <Rocket :size="17" :stroke-width="1.7" aria-hidden="true" />
        </span>
        <span class="float-card__copy">
          <strong>{{ t('home.hero.deployBadge') }}</strong>
          <span>{{ t('home.hero.deployDetail') }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-visual {
  position: relative;
  width: 100%;
  max-width: 540px;
  margin-inline: auto;
  padding: 62px 22px 66px;
}

.hero-visual__halo {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 128%;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 45% 40%, rgba(168, 199, 250, 0.18), transparent 52%),
    radial-gradient(circle at 68% 66%, rgba(185, 167, 248, 0.16), transparent 56%);
  filter: blur(18px);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.hero-visual__orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid rgba(168, 199, 250, 0.075);
  border-radius: 50%;
  pointer-events: none;
}

.hero-visual__orbit--outer {
  width: 112%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%) rotate(-14deg);
  border-color: rgba(255, 255, 255, 0.055);
}

.hero-visual__orbit--inner {
  width: 88%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%) rotate(24deg);
  border-color: rgba(185, 167, 248, 0.08);
}

.hero-visual__stage {
  position: relative;
  transform: perspective(1400px) rotateX(1.2deg) rotateY(-4.6deg) rotate(-0.5deg);
  transform-style: preserve-3d;
  animation: stage-bob 9s var(--ease-out) infinite alternate;
}

.workstation {
  position: relative;
  overflow: hidden;
  border-radius: var(--r-lg);
  background:
    linear-gradient(140deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.018) 42%, rgba(255, 255, 255, 0.045)),
    rgba(10, 13, 19, 0.76);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    inset 0 -1px 0 rgba(0, 0, 0, 0.4),
    0 50px 110px -52px rgba(0, 0, 0, 0.98),
    0 0 90px -48px rgba(140, 168, 240, 0.7);
}

.workstation__sheen {
  position: absolute;
  inset: 0;
  background: linear-gradient(122deg, transparent 30%, rgba(255, 255, 255, 0.045) 44%, transparent 58%);
  pointer-events: none;
}

.workstation__topbar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 44px;
  padding: 0 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.055);
  background: rgba(255, 255, 255, 0.018);
}

.workstation__dots {
  display: flex;
  flex: none;
  gap: 6px;
}

.workstation__dots i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.14);
  opacity: 0.75;
}

.workstation__dots .is-red {
  background: #ff8f85;
}

.workstation__dots .is-yellow {
  background: #f6cf70;
}

.workstation__dots .is-green {
  background: #8fd6a6;
}

.workstation__path {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 7px;
  overflow: hidden;
  color: var(--text-tertiary);
  font-size: 0.62rem;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.workstation__path svg {
  flex: none;
  color: var(--text-secondary);
  opacity: 0.7;
}

.workstation__slash {
  opacity: 0.35;
}

.workstation__file {
  color: var(--text-secondary);
}

.workstation__live {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 7px;
  color: var(--text-tertiary);
  font-size: 0.56rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.workstation__live .status-dot {
  width: 5px;
  height: 5px;
}

.workstation__code {
  position: relative;
  padding: 18px 0 20px;
  counter-reset: code-line;
  font-family: var(--font-mono);
  font-size: clamp(0.66rem, 0.58rem + 0.22vw, 0.76rem);
  line-height: 1.95;
  letter-spacing: -0.012em;
  overflow-x: auto;
}

.workstation__line {
  position: relative;
  display: flex;
  min-height: 1.95em;
  align-items: baseline;
  padding: 0 18px 0 0;
  white-space: pre;
}

.workstation__line::before {
  counter-increment: code-line;
  content: counter(code-line, decimal-leading-zero);
  width: 44px;
  flex: none;
  padding-right: 14px;
  color: rgba(255, 255, 255, 0.18);
  font-size: 0.88em;
  text-align: right;
  user-select: none;
}

.workstation__line.is-active {
  background: linear-gradient(90deg, rgba(168, 199, 250, 0.09), transparent 82%);
  box-shadow: inset 2px 0 0 rgba(168, 199, 250, 0.4);
}

.workstation__line.is-active::before {
  color: var(--blue);
  opacity: 0.7;
}

.tok-comment {
  color: #697487;
  font-style: italic;
}

.tok-keyword {
  color: #c4b5fd;
}

.tok-type {
  color: #a8c7fa;
}

.tok-function {
  color: #a5e6e0;
}

.tok-string {
  color: #f0cd9e;
}

.tok-plain {
  color: #b6bfcc;
}

.workstation__statusbar {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 14px;
  min-height: 46px;
  padding: 9px 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.055);
  background: rgba(255, 255, 255, 0.018);
}

.workstation__status {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 0.67rem;
}

.workstation__status .status-dot {
  width: 5px;
  height: 5px;
  flex: none;
}

.workstation__status-sep {
  width: 1px;
  height: 10px;
  background: var(--line-strong);
}

.workstation__status-detail {
  overflow: hidden;
  color: var(--text-tertiary);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.workstation__stack {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.workstation__stack-label {
  margin-right: 2px;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-size: 0.54rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.workstation__stack-chip {
  padding: 3px 6px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.035);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.53rem;
  line-height: 1.3;
}

.float-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px 11px 11px;
  border-radius: 16px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03)),
    rgba(12, 15, 22, 0.66);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    0 22px 44px -26px rgba(0, 0, 0, 0.95);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  backdrop-filter: blur(20px) saturate(150%);
}

.float-card--ai {
  top: -52px;
  right: -12px;
  animation: float-ai 7.5s var(--ease-out) infinite alternate;
}

.float-card--deploy {
  bottom: -52px;
  left: -12px;
  animation: float-deploy 8.6s 500ms var(--ease-out) infinite alternate;
}

.float-card__icon {
  display: grid;
  width: 30px;
  height: 30px;
  flex: none;
  place-items: center;
  border: 1px solid rgba(168, 199, 250, 0.18);
  border-radius: 10px;
  background: rgba(168, 199, 250, 0.1);
  color: var(--blue-bright);
}

.float-card__icon--violet {
  border-color: rgba(185, 167, 248, 0.18);
  background: rgba(185, 167, 248, 0.1);
  color: var(--violet-bright);
}

.float-card__copy {
  display: flex;
  flex-direction: column;
  gap: 1px;
  line-height: 1.25;
}

.float-card__copy strong {
  color: var(--text);
  font-size: 0.74rem;
  font-weight: 560;
  letter-spacing: -0.01em;
}

.float-card__copy span {
  color: var(--text-tertiary);
  font-size: 0.62rem;
}

@keyframes stage-bob {
  from {
    translate: 0 0;
  }
  to {
    translate: 0 -7px;
  }
}

@keyframes float-ai {
  from {
    translate: 0 0;
  }
  to {
    translate: 0 -9px;
  }
}

@keyframes float-deploy {
  from {
    translate: 0 0;
  }
  to {
    translate: 0 7px;
  }
}

@media (max-width: 1100px) {
  .float-card--ai {
    right: 0;
  }

  .float-card--deploy {
    left: 0;
  }
}

@media (max-width: 899px) {
  .hero-visual {
    max-width: 520px;
    padding: 28px 14px 34px;
  }

  .hero-visual__stage {
    transform: none;
    animation: none;
  }

  .float-card--ai {
    top: -14px;
    right: 4px;
  }

  .float-card--deploy {
    bottom: -16px;
    left: 4px;
  }

  .float-card {
    animation: none;
  }
}

@media (max-width: 600px) {
  .float-card {
    display: none;
  }
}

@media (max-width: 520px) {
  .hero-visual {
    padding: 24px 0 28px;
  }

  .float-card {
    padding: 8px 10px 8px 8px;
    border-radius: 13px;
  }

  .float-card__icon {
    width: 26px;
    height: 26px;
    border-radius: 8px;
  }

  .float-card__copy strong {
    font-size: 0.68rem;
  }

  .float-card__copy span {
    font-size: 0.57rem;
  }

  .workstation__topbar {
    padding-inline: 11px;
  }

  .workstation__path {
    justify-content: flex-start;
    font-size: 0.57rem;
  }

  .workstation__path svg,
  .workstation__path span:first-of-type {
    display: none;
  }

  .workstation__code {
    font-size: 0.6rem;
    line-height: 1.85;
  }

  .workstation__line {
    padding-right: 8px;
  }

  .workstation__line::before {
    width: 32px;
    padding-right: 9px;
  }

  .workstation__status-detail {
    display: none;
  }

  .workstation__status-sep {
    display: none;
  }

  .workstation__statusbar {
    padding-inline: 11px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-visual__stage,
  .float-card {
    animation: none;
  }
}
</style>
