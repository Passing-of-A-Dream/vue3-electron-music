import { createRouter, createWebHistory } from 'vue-router'
import OnLineMusic from '../views/OnLineMusic.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/onlinemusic'
    },
    {
      path: '/onlinemusic',
      name: 'onlinemusic',
      component: OnLineMusic
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import("@/views/Settings.vue")
    }
  ]
})

export default router
