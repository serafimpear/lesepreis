import { createRouter, createWebHashHistory } from 'vue-router'

import StudentsLeaderboard from '../views/StudentsLeaderboard.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { path: "/students-leaderboard" }
    },
    {
      path: '/students-leaderboard',
      component: StudentsLeaderboard
    },
    {
      path: '/books',
      component: () => import('../views/Books.vue')
    },
    {
      path: '/manage',
      component: () => import('../views/Manage.vue')
    },
    {
      path: '/settings',
      component: () => import('../views/Settings.vue')
    }
  ]
})

export default router