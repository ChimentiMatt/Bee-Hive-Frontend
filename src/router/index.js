import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import SpellingList from '../views/SpellingListView.vue'
import Hub from '../views/HubView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'landing',
            component: LandingView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupView
        },
        {
            path: '/spellinglist',
            name: 'spellinglist',
            component: SpellingList
        },
        {
            path: '/hub',
            name: 'hub',
            component: Hub
        },
    ]
})
export default router
