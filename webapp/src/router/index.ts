import { createRouter, createWebHistory } from 'vue-router'
import LinearTasks from '../views/LinearTasks.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LinearTasks
    },
  ]
})

export default router
