import { createRouter, createWebHashHistory } from 'vue-router'

import WelcomeScreen from '../views/WelcomeScreen.vue'
import StudentsLeaderboard from '../views/StudentsLeaderboard.vue'

const router = createRouter({
    history: createWebHashHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            component: WelcomeScreen
        },
        {
            path: '/students-leaderboard',
            component: StudentsLeaderboard
        },
        {
            path: '/books',
            component: () =>
                import ('../views/Books.vue')
        },
        {
            path: '/manage',
            component: () =>
                import ('../views/Manage.vue')
        },
        {
            path: '/settings',
            component: () =>
                import ('../views/Settings.vue')
        }
    ]
})

export default router