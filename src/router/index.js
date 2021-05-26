import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import DashboardHome from '@/pages/Home'
import DashboardProduct from '@/pages/Product'
import Login from '@/pages/Login'

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: { name: 'DashboardHome' }
    },
    {
        path: '/dashboard',
        component: Dashboard,
        children: [
            {
                path: '/',
                redirect: { name: 'DashboardHome' }
            },
            {
                path: 'home',
                name: 'DashboardHome',
                component: DashboardHome
            },
            {
                path: 'product',
                name: 'DashboardProduct',
                component: DashboardProduct
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

const router = new Router({
    mode: 'history',
    routes
});

export default router