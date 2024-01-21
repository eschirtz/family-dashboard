import { createRouter, createWebHistory } from 'vue-router'
import MockupView from '@/views/MockupView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MockupView
    },
  ]
})

export default router
