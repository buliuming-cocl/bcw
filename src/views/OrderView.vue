<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  Check,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Clock,
  Copy,
  Github,
  LoaderCircle,
  Mail,
  Send,
  ShieldCheck,
} from 'lucide-vue-next'
import AppButton from '@/components/AppButton.vue'
import PageHero from '@/components/PageHero.vue'
import { contactChannels, siteConfig } from '@/config/site'
import { budgetOptions, findPlan } from '@/data/pricing'
import { serviceSelectOptions } from '@/data/services'
import { useI18n } from '@/i18n'

type FieldName = 'name' | 'contact' | 'service' | 'budget' | 'description' | 'deadline' | 'consent'
type SubmitState = 'idle' | 'submitting' | 'fallback' | 'success' | 'error'

interface FormState {
  name: string
  contact: string
  service: string
  budget: string
  description: string
  deadline: string
  consent: boolean
  website: string
}

interface OrderResponse {
  ok?: boolean
  id?: string | number
  reference?: string | number
}

const route = useRoute()
const { t, pick, locale, isEnglish } = useI18n()

function queryString(value: unknown): string {
  if (typeof value === 'string') return value
  if (Array.isArray(value) && typeof value[0] === 'string') return value[0]
  return ''
}

const requestedService = queryString(route.query.service)
const initialService = serviceSelectOptions.some((option) => option.id === requestedService)
  ? requestedService
  : ''

const form = reactive<FormState>({
  name: '',
  contact: '',
  service: initialService,
  budget: '',
  description: '',
  deadline: '',
  consent: false,
  website: '',
})

const errors = reactive<Partial<Record<FieldName, string>>>({})
const attempted = ref(false)
const status = ref<SubmitState>('idle')
const submitError = ref('')
const reference = ref('')
const copyState = ref<'idle' | 'copied' | 'failed'>('idle')
const formEl = ref<HTMLFormElement | null>(null)
const feedbackEl = ref<HTMLElement | null>(null)

const selectedPlan = computed(() =>
  findPlan(typeof route.query.plan === 'string' ? route.query.plan : null),
)
const selectedService = computed(() =>
  serviceSelectOptions.find((option) => option.id === form.service),
)
const selectedBudget = computed(() =>
  budgetOptions.find((option) => option.id === form.budget),
)

const planPriceText = computed(() => {
  if (!selectedPlan.value) return ''
  const plan = selectedPlan.value
  const prefix = pick(plan.pricePrefix)
  const price = pick(plan.price)
  const suffix = pick(plan.priceSuffix)
  return isEnglish.value
    ? [prefix, price, suffix].filter(Boolean).join(' ')
    : `${price}${suffix ? ` ${suffix}` : ''}`
})

const onlineEnabled = computed(() => contactChannels.hasOnlineEndpoint)
const hasEmail = computed(() => contactChannels.hasEmail)
const hasErrors = computed(() => Object.keys(errors).length > 0)

const sensitivePattern =
  /(sk-[A-Za-z0-9_-]{16,}|gh[pousr]_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|xox[baprs]-[A-Za-z0-9-]{10,})/

function validateField(field: FieldName): boolean {
  let message = ''

  switch (field) {
    case 'name': {
      const value = form.name.trim()
      if (!value) message = t('orderPage.validation.nameRequired')
      else if (value.length > 40) message = t('orderPage.validation.nameTooLong')
      break
    }
    case 'contact': {
      const value = form.contact.trim()
      if (!value) message = t('orderPage.validation.contactRequired')
      else if (value.length < 3) message = t('orderPage.validation.contactTooShort')
      else if (value.length > 100) message = t('orderPage.validation.contactTooLong')
      break
    }
    case 'service': {
      if (!serviceSelectOptions.some((option) => option.id === form.service)) {
        message = t('orderPage.validation.serviceRequired')
      }
      break
    }
    case 'budget': {
      if (!budgetOptions.some((option) => option.id === form.budget)) {
        message = t('orderPage.validation.budgetRequired')
      }
      break
    }
    case 'description': {
      const value = form.description.trim()
      if (!value) message = t('orderPage.validation.descriptionRequired')
      else if (value.length < 20) message = t('orderPage.validation.descriptionTooShort')
      else if (value.length > 2000) message = t('orderPage.validation.descriptionTooLong')
      else if (sensitivePattern.test(value)) message = t('orderPage.validation.sensitiveInfo')
      break
    }
    case 'deadline': {
      if (form.deadline.trim().length > 80) message = t('orderPage.validation.deadlineTooLong')
      break
    }
    case 'consent': {
      if (!form.consent) message = t('orderPage.form.consentError')
      break
    }
  }

  if (message) errors[field] = message
  else delete errors[field]
  return !message
}

function validateForm(): boolean {
  attempted.value = true
  const fields: FieldName[] = [
    'name',
    'contact',
    'service',
    'budget',
    'description',
    'deadline',
    'consent',
  ]
  const results = fields.map((field) => validateField(field))
  const valid = results.every(Boolean)

  if (!valid) {
    nextTick(() => {
      formEl.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    })
  }

  return valid
}

function handleInput(field: FieldName) {
  if (status.value === 'error') status.value = 'idle'
  if (errors[field] || attempted.value) validateField(field)
}

const summary = computed(() => {
  const lines = [
    t('orderPage.summary.title'),
    '',
    `${t('orderPage.form.nameLabel')}: ${form.name.trim()}`,
    `${t('orderPage.form.contactLabel')}: ${form.contact.trim()}`,
    `${t('orderPage.form.serviceLabel')}: ${selectedService.value ? pick(selectedService.value.name) : '—'}`,
    `${t('orderPage.form.budgetLabel')}: ${selectedBudget.value ? pick(selectedBudget.value.label) : '—'}`,
  ]

  if (form.deadline.trim()) {
    lines.push(`${t('orderPage.form.deadlineLabel')}: ${form.deadline.trim()}`)
  }

  if (selectedPlan.value) {
    lines.push(
      `${t('orderPage.form.planLabel')}: ${selectedPlan.value.name} (${planPriceText.value})`,
    )
  }

  lines.push('', `${t('orderPage.form.descriptionLabel')}:`, form.description.trim(), '', t('orderPage.summary.footer'))

  return lines.join('\n')
})

const mailSubject = computed(
  () => `${t('orderPage.summary.title')} — ${form.name.trim() || t('nav.contact')}`,
)

const mailtoHref = computed(() => {
  if (!hasEmail.value) return ''
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(mailSubject.value)}&body=${encodeURIComponent(summary.value)}`
})

async function scrollToFeedback() {
  await nextTick()
  const element = feedbackEl.value
  if (!element) return
  element.focus({ preventScroll: true })
  element.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'center',
  })
}

async function copySummary() {
  const text = summary.value
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
    } else if (!legacyCopy(text)) {
      throw new Error('Clipboard unavailable')
    }
    copyState.value = 'copied'
  } catch {
    copyState.value = 'failed'
  }
}

function legacyCopy(text: string): boolean {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.top = '-1000px'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  let copied = false
  try {
    copied = document.execCommand('copy')
  } catch {
    copied = false
  }
  textarea.remove()
  return copied
}

async function submitForm() {
  if (form.website) return

  if (!validateForm()) return

  copyState.value = 'idle'
  submitError.value = ''
  reference.value = ''

  if (!onlineEnabled.value) {
    status.value = 'fallback'
    await scrollToFeedback()
    return
  }

  status.value = 'submitting'
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 20000)

  try {
    const response = await fetch(siteConfig.orderEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: form.name.trim(),
        contact: form.contact.trim(),
        serviceType: form.service,
        serviceLabel: selectedService.value ? pick(selectedService.value.name) : null,
        budget: form.budget,
        budgetLabel: selectedBudget.value ? pick(selectedBudget.value.label) : null,
        description: form.description.trim(),
        expectedDelivery: form.deadline.trim() || null,
        referencePlan: selectedPlan.value?.id ?? null,
        locale: locale.value,
        consent: true,
        source: 'bcw-web',
      }),
      signal: controller.signal,
    })

    const raw = await response.text()
    let data: OrderResponse | null = null
    if (raw) {
      try {
        data = JSON.parse(raw) as OrderResponse
      } catch {
        data = null
      }
    }

    if (!response.ok || data?.ok === false) {
      throw new Error('Submission rejected')
    }

    const ref = data?.id ?? data?.reference
    if (ref !== undefined && ref !== null) reference.value = String(ref)

    status.value = 'success'
    await scrollToFeedback()
  } catch (error) {
    status.value = 'error'
    submitError.value =
      error instanceof DOMException && error.name === 'AbortError'
        ? t('orderPage.form.networkError')
        : t('orderPage.form.genericError')
  } finally {
    window.clearTimeout(timeout)
  }
}

function resetForm() {
  form.name = ''
  form.contact = ''
  form.service = ''
  form.budget = ''
  form.description = ''
  form.deadline = ''
  form.consent = false
  form.website = ''
  attempted.value = false
  status.value = 'idle'
  submitError.value = ''
  reference.value = ''
  copyState.value = 'idle'
  for (const key of Object.keys(errors) as FieldName[]) delete errors[key]
  nextTick(() => document.querySelector<HTMLElement>('#order-name')?.focus())
}

const submitLabel = computed(() => {
  if (status.value === 'submitting') return t('orderPage.form.submitting')
  return onlineEnabled.value ? t('orderPage.form.submit') : t('orderPage.form.submitEmail')
})
</script>

<template>
  <div class="order-page">
    <PageHero
      :eyebrow="t('orderPage.hero.eyebrow')"
      :title="t('orderPage.hero.title')"
      :description="t('orderPage.hero.description')"
    >
      <template #actions>
        <AppButton v-if="hasEmail" :href="mailtoHref" :new-tab="false" variant="glass">
          <Mail :size="15" :stroke-width="1.8" aria-hidden="true" />
          {{ t('orderPage.sidebar.emailLabel') }}
        </AppButton>
        <AppButton to="/faq" variant="ghost">{{ t('nav.faq') }}</AppButton>
      </template>

      <template #aside>
        <div class="order-aside glass glass--strong glass--edge">
          <div class="order-aside__head">
            <span class="order-aside__label">{{ t('orderPage.hero.asideLabel') }}</span>
            <span class="status-dot" aria-hidden="true" />
          </div>
          <ol class="order-aside__flow">
            <li>
              <span class="order-aside__num mono">01</span>
              <span>{{ t('orderPage.hero.stepOne') }}</span>
            </li>
            <li>
              <span class="order-aside__num mono">02</span>
              <span>{{ t('orderPage.hero.stepTwo') }}</span>
            </li>
            <li>
              <span class="order-aside__num mono">03</span>
              <span>{{ t('orderPage.hero.stepThree') }}</span>
            </li>
          </ol>
          <div class="order-aside__foot">
            <Clock :size="14" :stroke-width="1.7" aria-hidden="true" />
            <span>{{ t('orderPage.hero.asideNote') }}</span>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="section order-content">
      <div class="container order-layout">
        <div class="order-main">
          <div class="form-panel glass glass--strong glass--edge">
            <template v-if="status !== 'success'">
              <div class="form-head">
                <div>
                  <h2 class="form-head__title">{{ t('orderPage.form.title') }}</h2>
                  <p class="form-head__subtitle">{{ t('orderPage.form.subtitle') }}</p>
                </div>
                <span class="form-head__mark mono">BCW / {{ t('orderPage.form.formMark') }}</span>
              </div>

              <div v-if="selectedPlan" class="plan-chip">
                <span class="plan-chip__label">{{ t('orderPage.form.planNotice') }}</span>
                <strong>{{ selectedPlan.name }}</strong>
                <span class="plan-chip__price">{{ planPriceText }}</span>
              </div>

              <form
                ref="formEl"
                class="order-form"
                novalidate
                :aria-label="t('orderPage.form.formAria')"
                @submit.prevent="submitForm"
              >
                <div
                  v-if="status === 'fallback'"
                  ref="feedbackEl"
                  class="feedback feedback--fallback"
                  role="status"
                  tabindex="-1"
                >
                  <div class="feedback__head">
                    <span class="feedback__icon"><Mail :size="19" :stroke-width="1.7" aria-hidden="true" /></span>
                    <div>
                      <h3 class="feedback__title">{{ t('orderPage.form.fallbackTitle') }}</h3>
                      <p class="feedback__body">{{ t('orderPage.form.fallbackBody') }}</p>
                    </div>
                  </div>
                  <div class="feedback__actions">
                    <AppButton
                      v-if="hasEmail"
                      :href="mailtoHref"
                      :new-tab="false"
                      variant="primary"
                    >
                      <Mail :size="15" :stroke-width="1.8" aria-hidden="true" />
                      {{ t('orderPage.form.fallbackEmail') }}
                    </AppButton>
                    <AppButton type="button" variant="glass" @click="copySummary">
                      <Copy :size="15" :stroke-width="1.8" aria-hidden="true" />
                      {{ t('orderPage.form.fallbackCopy') }}
                    </AppButton>
                    <AppButton :href="siteConfig.studioGithub" variant="ghost" arrow>
                      <Github :size="15" :stroke-width="1.8" aria-hidden="true" />
                      {{ t('orderPage.form.fallbackGithub') }}
                    </AppButton>
                  </div>
                  <p v-if="!hasEmail" class="feedback__warn">
                    {{ t('orderPage.form.fallbackNoEmail') }}
                  </p>
                  <p class="feedback__note">{{ t('orderPage.form.fallbackNote') }}</p>
                  <p class="feedback__copy-status" aria-live="polite">
                    <template v-if="copyState === 'copied'">{{ t('orderPage.form.fallbackCopied') }}</template>
                    <template v-else-if="copyState === 'failed'">{{ t('common.copyFailed') }}</template>
                  </p>
                </div>

                <div
                  v-else-if="status === 'error'"
                  ref="feedbackEl"
                  class="feedback feedback--error"
                  role="alert"
                  tabindex="-1"
                >
                  <div class="feedback__head">
                    <span class="feedback__icon"><CircleAlert :size="19" :stroke-width="1.7" aria-hidden="true" /></span>
                    <div>
                      <h3 class="feedback__title">{{ t('orderPage.form.errorTitle') }}</h3>
                      <p class="feedback__body">{{ t('orderPage.form.errorBody') }}</p>
                      <p class="feedback__warn">{{ submitError }}</p>
                    </div>
                  </div>
                  <div class="feedback__actions">
                    <AppButton type="button" variant="glass" @click="submitForm">
                      {{ t('orderPage.form.retry') }}
                    </AppButton>
                  </div>
                </div>

                <div class="form-grid">
                  <div class="field" :class="{ 'field--invalid': errors.name }">
                    <div class="field__label">
                      <label for="order-name">{{ t('orderPage.form.nameLabel') }}<span class="field__req" aria-hidden="true">*</span></label>
                      <span class="field__meta">{{ t('orderPage.form.required') }}</span>
                    </div>
                    <input
                      id="order-name"
                      v-model="form.name"
                      class="input"
                      type="text"
                      name="name"
                      autocomplete="name"
                      maxlength="40"
                      :placeholder="t('orderPage.form.namePlaceholder')"
                      :aria-invalid="Boolean(errors.name)"
                      :aria-describedby="errors.name ? 'order-name-error' : undefined"
                      required
                      @blur="validateField('name')"
                      @input="handleInput('name')"
                    />
                    <p v-if="errors.name" id="order-name-error" class="field__error" role="alert">
                      {{ errors.name }}
                    </p>
                  </div>

                  <div class="field" :class="{ 'field--invalid': errors.contact }">
                    <div class="field__label">
                      <label for="order-contact">{{ t('orderPage.form.contactLabel') }}<span class="field__req" aria-hidden="true">*</span></label>
                      <span class="field__meta">{{ t('orderPage.form.required') }}</span>
                    </div>
                    <input
                      id="order-contact"
                      v-model="form.contact"
                      class="input"
                      type="text"
                      name="contact"
                      autocomplete="email"
                      maxlength="100"
                      :placeholder="t('orderPage.form.contactPlaceholder')"
                      :aria-invalid="Boolean(errors.contact)"
                      :aria-describedby="errors.contact ? 'order-contact-hint order-contact-error' : 'order-contact-hint'"
                      required
                      @blur="validateField('contact')"
                      @input="handleInput('contact')"
                    />
                    <p id="order-contact-hint" class="field__hint">{{ t('orderPage.form.contactHint') }}</p>
                    <p v-if="errors.contact" id="order-contact-error" class="field__error" role="alert">
                      {{ errors.contact }}
                    </p>
                  </div>

                  <div class="field" :class="{ 'field--invalid': errors.service }">
                    <div class="field__label">
                      <label for="order-service">{{ t('orderPage.form.serviceLabel') }}<span class="field__req" aria-hidden="true">*</span></label>
                      <span class="field__meta">{{ t('orderPage.form.required') }}</span>
                    </div>
                    <div class="select-wrap">
                      <select
                        id="order-service"
                        v-model="form.service"
                        class="select"
                        name="service"
                        :aria-invalid="Boolean(errors.service)"
                        :aria-describedby="errors.service ? 'order-service-error' : undefined"
                        required
                        @change="validateField('service'); handleInput('service')"
                      >
                        <option value="" disabled>{{ t('orderPage.form.servicePlaceholder') }}</option>
                        <option v-for="option in serviceSelectOptions" :key="option.id" :value="option.id">
                          {{ pick(option.name) }}
                        </option>
                      </select>
                      <ChevronDown class="select-wrap__icon" :size="16" :stroke-width="1.8" aria-hidden="true" />
                    </div>
                    <p v-if="errors.service" id="order-service-error" class="field__error" role="alert">
                      {{ errors.service }}
                    </p>
                  </div>

                  <div class="field" :class="{ 'field--invalid': errors.budget }">
                    <div class="field__label">
                      <label for="order-budget">{{ t('orderPage.form.budgetLabel') }}<span class="field__req" aria-hidden="true">*</span></label>
                      <span class="field__meta">{{ t('orderPage.form.required') }}</span>
                    </div>
                    <div class="select-wrap">
                      <select
                        id="order-budget"
                        v-model="form.budget"
                        class="select"
                        name="budget"
                        :aria-invalid="Boolean(errors.budget)"
                        :aria-describedby="errors.budget ? 'order-budget-error' : undefined"
                        required
                        @change="validateField('budget'); handleInput('budget')"
                      >
                        <option value="" disabled>{{ t('orderPage.form.budgetPlaceholder') }}</option>
                        <option v-for="option in budgetOptions" :key="option.id" :value="option.id">
                          {{ pick(option.label) }}
                        </option>
                      </select>
                      <ChevronDown class="select-wrap__icon" :size="16" :stroke-width="1.8" aria-hidden="true" />
                    </div>
                    <p v-if="errors.budget" id="order-budget-error" class="field__error" role="alert">
                      {{ errors.budget }}
                    </p>
                  </div>

                  <div class="field field--full" :class="{ 'field--invalid': errors.description }">
                    <div class="field__label">
                      <label for="order-description">{{ t('orderPage.form.descriptionLabel') }}<span class="field__req" aria-hidden="true">*</span></label>
                      <span class="field__meta mono">{{ t('orderPage.form.descriptionCounter', { count: form.description.length, max: 2000 }) }}</span>
                    </div>
                    <textarea
                      id="order-description"
                      v-model="form.description"
                      class="textarea"
                      name="description"
                      maxlength="2000"
                      :placeholder="t('orderPage.form.descriptionPlaceholder')"
                      :aria-invalid="Boolean(errors.description)"
                      :aria-describedby="errors.description ? 'order-description-hint order-description-error' : 'order-description-hint'"
                      required
                      @blur="validateField('description')"
                      @input="handleInput('description')"
                    />
                    <p id="order-description-hint" class="field__hint">{{ t('orderPage.form.descriptionHint') }}</p>
                    <p v-if="errors.description" id="order-description-error" class="field__error" role="alert">
                      {{ errors.description }}
                    </p>
                  </div>

                  <div class="field field--full" :class="{ 'field--invalid': errors.deadline }">
                    <div class="field__label">
                      <label for="order-deadline">{{ t('orderPage.form.deadlineLabel') }}</label>
                      <span class="field__meta">{{ t('orderPage.form.optional') }}</span>
                    </div>
                    <input
                      id="order-deadline"
                      v-model="form.deadline"
                      class="input"
                      type="text"
                      name="deadline"
                      maxlength="80"
                      :placeholder="t('orderPage.form.deadlinePlaceholder')"
                      :aria-invalid="Boolean(errors.deadline)"
                      :aria-describedby="errors.deadline ? 'order-deadline-hint order-deadline-error' : 'order-deadline-hint'"
                      @blur="validateField('deadline')"
                      @input="handleInput('deadline')"
                    />
                    <p id="order-deadline-hint" class="field__hint">{{ t('orderPage.form.deadlineHint') }}</p>
                    <p v-if="errors.deadline" id="order-deadline-error" class="field__error" role="alert">
                      {{ errors.deadline }}
                    </p>
                  </div>
                </div>

                <div class="consent-block">
                  <label class="consent" :class="{ 'is-invalid': errors.consent }">
                    <input
                      v-model="form.consent"
                      class="consent__input"
                      type="checkbox"
                      name="consent"
                      :aria-invalid="Boolean(errors.consent)"
                      :aria-describedby="errors.consent ? 'order-consent-error' : undefined"
                      @change="validateField('consent')"
                    />
                    <span class="consent__box" aria-hidden="true">
                      <Check v-if="form.consent" :size="12" :stroke-width="2.4" />
                    </span>
                    <span class="consent__text">{{ t('orderPage.form.consentLabel') }}</span>
                  </label>
                  <p v-if="errors.consent" id="order-consent-error" class="field__error" role="alert">
                    {{ errors.consent }}
                  </p>
                </div>

                <div class="privacy-strip">
                  <ShieldCheck :size="17" :stroke-width="1.7" aria-hidden="true" />
                  <div>
                    <strong>{{ t('orderPage.form.privacyTitle') }}</strong>
                    <p>{{ t('orderPage.form.privacyBody') }}</p>
                  </div>
                </div>

                <p v-if="attempted && hasErrors" class="form-error-summary" role="alert">
                  {{ t('orderPage.validation.fixErrors') }}
                </p>

                <div class="form-actions">
                  <AppButton type="submit" variant="primary" :disabled="status === 'submitting'">
                    <LoaderCircle
                      v-if="status === 'submitting'"
                      class="spin"
                      :size="16"
                      :stroke-width="1.9"
                      aria-hidden="true"
                    />
                    <Send v-else :size="15" :stroke-width="1.8" aria-hidden="true" />
                    {{ submitLabel }}
                  </AppButton>
                  <p class="form-actions__note">
                    {{ onlineEnabled ? t('orderPage.form.onlineEnabled') : t('orderPage.form.onlineDisabled') }}
                  </p>
                </div>

                <p class="payment-note">{{ t('orderPage.form.paymentNote') }}</p>

                <div class="honeypot" aria-hidden="true">
                  <label for="order-website">Website</label>
                  <input
                    id="order-website"
                    v-model="form.website"
                    type="text"
                    name="website"
                    tabindex="-1"
                    autocomplete="off"
                  />
                </div>
              </form>
            </template>

            <div
              v-else
              ref="feedbackEl"
              class="success-panel"
              role="status"
              tabindex="-1"
            >
              <span class="success-panel__icon">
                <CircleCheck :size="30" :stroke-width="1.5" aria-hidden="true" />
              </span>
              <h2 class="success-panel__title">{{ t('orderPage.form.successTitle') }}</h2>
              <p class="success-panel__body">{{ t('orderPage.form.successBody') }}</p>
              <p v-if="reference" class="success-panel__ref mono">
                {{ t('orderPage.form.successRef') }}: {{ reference }}
              </p>
              <div class="success-panel__actions">
                <AppButton type="button" variant="glass" @click="resetForm">
                  {{ t('orderPage.form.successAgain') }}
                </AppButton>
                <AppButton to="/" variant="ghost">{{ t('common.backHome') }}</AppButton>
              </div>
            </div>
          </div>
        </div>

        <aside class="order-sidebar">
          <div class="sidebar-card glass">
            <h2 class="sidebar-card__title">{{ t('orderPage.sidebar.title') }}</h2>
            <p class="sidebar-card__intro">{{ t('orderPage.sidebar.intro') }}</p>
            <ol class="sidebar-steps">
              <li>
                <span class="sidebar-steps__num mono">01</span>
                <div>
                  <h3>{{ t('orderPage.sidebar.step1Title') }}</h3>
                  <p>{{ t('orderPage.sidebar.step1Body') }}</p>
                </div>
              </li>
              <li>
                <span class="sidebar-steps__num mono">02</span>
                <div>
                  <h3>{{ t('orderPage.sidebar.step2Title') }}</h3>
                  <p>{{ t('orderPage.sidebar.step2Body') }}</p>
                </div>
              </li>
              <li>
                <span class="sidebar-steps__num mono">03</span>
                <div>
                  <h3>{{ t('orderPage.sidebar.step3Title') }}</h3>
                  <p>{{ t('orderPage.sidebar.step3Body') }}</p>
                </div>
              </li>
              <li>
                <span class="sidebar-steps__num mono">04</span>
                <div>
                  <h3>{{ t('orderPage.sidebar.step4Title') }}</h3>
                  <p>{{ t('orderPage.sidebar.step4Body') }}</p>
                </div>
              </li>
            </ol>
          </div>

          <div class="sidebar-card glass">
            <h2 class="sidebar-card__title">{{ t('orderPage.sidebar.contactTitle') }}</h2>
            <p class="sidebar-card__intro">{{ t('orderPage.sidebar.contactBody') }}</p>
            <div class="sidebar-contact">
              <a v-if="hasEmail" :href="`mailto:${siteConfig.email}`" class="sidebar-contact__row">
                <Mail :size="15" :stroke-width="1.8" aria-hidden="true" />
                <span>{{ siteConfig.email }}</span>
              </a>
              <a
                :href="siteConfig.studioGithub"
                class="sidebar-contact__row"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github :size="15" :stroke-width="1.8" aria-hidden="true" />
                <span>github.com/buliuming-cocl</span>
              </a>
              <div class="sidebar-contact__row sidebar-contact__row--static">
                <span class="sidebar-contact__key">{{ t('orderPage.sidebar.qqLabel') }}</span>
                <span>{{ siteConfig.qq || siteConfig.wechat || t('orderPage.sidebar.qqValue') }}</span>
              </div>
            </div>
          </div>

          <div class="privacy-card">
            <span class="privacy-card__icon">
              <ShieldCheck :size="16" :stroke-width="1.7" aria-hidden="true" />
            </span>
            <div>
              <h2 class="privacy-card__title">{{ t('orderPage.sidebar.privacyTitle') }}</h2>
              <p class="privacy-card__body">{{ t('orderPage.sidebar.privacyBody') }}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped>
.order-aside {
  position: relative;
  overflow: hidden;
  padding: 24px;
  border-radius: var(--r-lg);
}

.order-aside::after {
  content: "";
  position: absolute;
  right: -26%;
  bottom: -38%;
  width: 72%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(185, 167, 248, 0.16), transparent 65%);
  pointer-events: none;
}

.order-aside__head {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.order-aside__label {
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.63rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.order-aside__head .status-dot {
  width: 5px;
  height: 5px;
}

.order-aside__flow {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 20px;
}

.order-aside__flow li {
  position: relative;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 13px 0;
  color: var(--text-secondary);
  font-size: 0.82rem;
}

.order-aside__flow li:not(:last-child)::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 29px;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--line), transparent);
}

.order-aside__num {
  display: grid;
  width: 30px;
  height: 30px;
  flex: none;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-tertiary);
  font-size: 0.59rem;
  letter-spacing: 0.02em;
}

.order-aside__foot {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding-top: 15px;
  border-top: 1px solid var(--line-soft);
  color: var(--text-tertiary);
  font-size: 0.69rem;
}

.order-content {
  padding-top: clamp(4px, 1vw, 12px);
  padding-bottom: var(--section-y);
}

.order-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(280px, 0.78fr);
  align-items: start;
  gap: 20px;
}

.form-panel {
  padding: clamp(24px, 3.4vw, 38px);
  border-radius: var(--r-lg);
}

.form-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.form-head__title {
  font-size: clamp(1.45rem, 1.2rem + 0.8vw, 1.85rem);
  font-weight: 570;
  letter-spacing: -0.032em;
  line-height: 1.2;
}

.form-head__subtitle {
  margin-top: 8px;
  color: var(--text-tertiary);
  font-size: 0.81rem;
  line-height: 1.6;
}

.form-head__mark {
  flex: none;
  padding-top: 5px;
  color: var(--text-tertiary);
  font-size: 0.58rem;
  letter-spacing: 0.12em;
}

.plan-chip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px 10px;
  margin-top: 22px;
  padding: 10px 13px;
  border: 1px solid rgba(185, 167, 248, 0.13);
  border-radius: 10px;
  background: rgba(185, 167, 248, 0.045);
  color: var(--text-tertiary);
  font-size: 0.71rem;
}

.plan-chip__label {
  color: var(--text-tertiary);
}

.plan-chip strong {
  color: var(--violet-bright);
  font-family: var(--font-mono);
  font-size: 0.73rem;
  font-weight: 500;
}

.plan-chip__price {
  padding-left: 10px;
  border-left: 1px solid var(--line);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.66rem;
}

.order-form {
  margin-top: 28px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 16px;
}

.field--full {
  grid-column: 1 / -1;
}

.select-wrap {
  position: relative;
}

.select-wrap__icon {
  position: absolute;
  top: 50%;
  right: 14px;
  color: var(--text-tertiary);
  pointer-events: none;
  transform: translateY(-50%);
}

.consent-block {
  margin-top: 24px;
}

.consent {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
}

.consent__input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.consent__box {
  display: grid;
  width: 18px;
  height: 18px;
  flex: none;
  place-items: center;
  margin-top: 1px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.035);
  color: #0a0c12;
  transition:
    background-color var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out);
}

.consent__input:checked + .consent__box {
  border-color: rgba(168, 199, 250, 0.6);
  background: var(--blue);
}

.consent__input:focus-visible + .consent__box {
  outline: 2px solid var(--blue);
  outline-offset: 3px;
}

.consent.is-invalid .consent__box {
  border-color: rgba(255, 136, 136, 0.6);
}

.consent__text {
  color: var(--text-secondary);
  font-size: 0.79rem;
  line-height: 1.65;
}

.consent-block .field__error {
  margin-top: 8px;
  margin-left: 28px;
}

.privacy-strip {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  margin-top: 24px;
  padding: 13px 15px;
  border: 1px solid var(--line-soft);
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.022);
}

.privacy-strip svg {
  flex: none;
  margin-top: 2px;
  color: var(--green);
}

.privacy-strip strong {
  color: var(--text-secondary);
  font-size: 0.76rem;
  font-weight: 540;
}

.privacy-strip p {
  margin-top: 2px;
  color: var(--text-tertiary);
  font-size: 0.73rem;
  line-height: 1.6;
}

.form-error-summary {
  margin-top: 18px;
  color: #ffb3b3;
  font-size: 0.77rem;
}

.form-actions {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 24px;
  padding-top: 22px;
  border-top: 1px solid var(--line-soft);
}

.form-actions__note {
  max-width: 46ch;
  color: var(--text-tertiary);
  font-size: 0.71rem;
  line-height: 1.6;
}

.payment-note {
  margin-top: 12px;
  color: var(--text-tertiary);
  font-size: 0.7rem;
  line-height: 1.6;
}

.spin {
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Feedback & success ---------------------------------------------------- */

.feedback {
  margin-bottom: 24px;
  padding: 17px;
  border-radius: 13px;
  outline: none;
}

.feedback--fallback {
  border: 1px solid rgba(168, 199, 250, 0.18);
  background: rgba(168, 199, 250, 0.055);
}

.feedback--error {
  border: 1px solid rgba(255, 136, 136, 0.2);
  background: rgba(255, 136, 136, 0.05);
}

.feedback__head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.feedback__icon {
  display: grid;
  width: 34px;
  height: 34px;
  flex: none;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--blue);
}

.feedback--error .feedback__icon {
  color: var(--danger);
}

.feedback__title {
  color: var(--text);
  font-size: 0.94rem;
  font-weight: 560;
  letter-spacing: -0.015em;
  line-height: 1.4;
}

.feedback__body,
.feedback__warn {
  margin-top: 5px;
  color: var(--text-secondary);
  font-size: 0.79rem;
  line-height: 1.65;
}

.feedback__warn {
  color: #ffc3c3;
}

.feedback--fallback .feedback__warn {
  color: var(--warning);
}

.feedback__note {
  margin-top: 10px;
  color: var(--text-tertiary);
  font-size: 0.7rem;
  line-height: 1.6;
}

.feedback__copy-status {
  min-height: 1em;
  margin-top: 8px;
  color: var(--green);
  font-size: 0.72rem;
}

.feedback__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.success-panel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 4px;
  outline: none;
}

.success-panel__icon {
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  border: 1px solid rgba(147, 231, 179, 0.2);
  border-radius: 50%;
  background: rgba(147, 231, 179, 0.09);
  color: var(--green);
  box-shadow: 0 0 40px -14px rgba(147, 231, 179, 0.4);
}

.success-panel__title {
  margin-top: 22px;
  font-size: clamp(1.5rem, 1.2rem + 1vw, 2rem);
  font-weight: 570;
  letter-spacing: -0.03em;
}

.success-panel__body {
  max-width: 52ch;
  margin-top: 12px;
  color: var(--text-secondary);
  font-size: 0.87rem;
  line-height: 1.75;
}

.success-panel__ref {
  margin-top: 14px;
  color: var(--text-tertiary);
  font-size: 0.7rem;
}

.success-panel__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 26px;
}

.honeypot {
  position: absolute !important;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

/* Sidebar --------------------------------------------------------------- */

.order-sidebar {
  position: sticky;
  top: calc(var(--nav-h) + var(--nav-top) + 22px);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sidebar-card {
  padding: 22px;
  border-radius: var(--r-md);
}

.sidebar-card__title {
  font-size: 1rem;
  font-weight: 560;
  letter-spacing: -0.02em;
  line-height: 1.4;
}

.sidebar-card__intro {
  margin-top: 8px;
  color: var(--text-tertiary);
  font-size: 0.76rem;
  line-height: 1.65;
}

.sidebar-steps {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 16px;
}

.sidebar-steps li {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
}

.sidebar-steps li:not(:last-child)::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 26px;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--line), transparent);
}

.sidebar-steps__num {
  display: grid;
  width: 26px;
  height: 26px;
  flex: none;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.025);
  color: var(--text-tertiary);
  font-size: 0.55rem;
}

.sidebar-steps h3 {
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 530;
  line-height: 1.4;
}

.sidebar-steps p {
  margin-top: 3px;
  color: var(--text-tertiary);
  font-size: 0.72rem;
  line-height: 1.6;
}

.sidebar-contact {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 16px;
}

.sidebar-contact__row {
  display: flex;
  min-height: 38px;
  align-items: center;
  gap: 9px;
  border-bottom: 1px solid var(--line-soft);
  color: var(--text-secondary);
  font-size: 0.73rem;
  transition: color var(--dur-fast) var(--ease-out);
}

a.sidebar-contact__row:hover {
  color: var(--text);
}

.sidebar-contact__row svg {
  flex: none;
  color: var(--text-tertiary);
}

.sidebar-contact__row--static {
  border-bottom: 0;
  padding-top: 7px;
}

.sidebar-contact__key {
  color: var(--text-tertiary);
  font-size: 0.67rem;
}

.privacy-card {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  padding: 17px;
  border: 1px solid var(--line-soft);
  border-radius: var(--r-sm);
  background: rgba(255, 255, 255, 0.018);
}

.privacy-card__icon {
  display: grid;
  width: 28px;
  height: 28px;
  flex: none;
  place-items: center;
  border: 1px solid rgba(147, 231, 179, 0.13);
  border-radius: 8px;
  color: var(--green);
}

.privacy-card__title {
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 530;
  line-height: 1.5;
}

.privacy-card__body {
  margin-top: 3px;
  color: var(--text-tertiary);
  font-size: 0.7rem;
  line-height: 1.62;
}

@media (max-width: 1040px) {
  .order-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .order-sidebar {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .privacy-card {
    grid-column: 1 / -1;
  }
}

@media (max-width: 700px) {
  .form-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .field--full {
    grid-column: auto;
  }

  .form-head {
    flex-direction: column;
    gap: 8px;
  }

  .form-head__mark {
    display: none;
  }

  .form-actions {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }

  .order-sidebar {
    grid-template-columns: minmax(0, 1fr);
  }

  .privacy-card {
    grid-column: auto;
  }

  .feedback__actions {
    flex-direction: column;
  }

  .feedback__actions :deep(.btn) {
    width: 100%;
  }

  .success-panel__actions {
    width: 100%;
    flex-direction: column;
  }

  .success-panel__actions :deep(.btn) {
    width: 100%;
  }
}

@media (max-width: 520px) {
  .form-panel {
    padding: 19px;
    border-radius: var(--r-md);
  }

  .order-aside {
    padding: 20px;
  }

  .form-actions :deep(.btn) {
    width: 100%;
  }

  .feedback {
    padding: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .spin {
    animation: none;
  }
}
</style>
