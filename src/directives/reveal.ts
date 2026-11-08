import type { Directive } from 'vue'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-revealed')
        observer?.unobserve(entry.target)
      }
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -8% 0px',
    },
  )
  return observer
}

/**
 * v-reveal
 * A small, dependency-free scroll reveal. The binding value is an optional
 * stagger index. Content stays visible when motion is reduced.
 */
export const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion.matches) {
      return
    }
    const delayIndex = Math.min(Math.max(binding.value ?? 0, 0), 8)
    el.style.setProperty('--reveal-delay', `${delayIndex * 55}ms`)
    el.classList.add('reveal')
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
