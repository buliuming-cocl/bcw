import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { MessageKey } from '@/i18n'
import HomeView from '@/views/HomeView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    titleKey?: MessageKey
    descKey?: MessageKey
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { titleKey: 'meta.home.title', descKey: 'meta.home.description' },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { titleKey: 'meta.services.title', descKey: 'meta.services.description' },
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: () => import('@/views/PricingView.vue'),
    meta: { titleKey: 'meta.pricing.title', descKey: 'meta.pricing.description' },
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('@/views/PortfolioView.vue'),
    meta: { titleKey: 'meta.portfolio.title', descKey: 'meta.portfolio.description' },
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/OrderView.vue'),
    meta: { titleKey: 'meta.order.title', descKey: 'meta.order.description' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { titleKey: 'meta.about.title', descKey: 'meta.about.description' },
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/views/FaqView.vue'),
    meta: { titleKey: 'meta.faq.title', descKey: 'meta.faq.description' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { titleKey: 'meta.notFound.title', descKey: 'meta.notFound.description' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return {
        el: to.hash,
        top: 104,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      }
    }
    return { top: 0 }
  },
})

export default router
