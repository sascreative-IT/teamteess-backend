import Vue from 'vue'
import Router from 'vue-router'

import AdminLayout from '@/components/AdminLayout'
import Dashboard from '@/pages/Dashboard'
import DesignersDashboard from '@/pages/DesignersDashboard'

import Login from '@/pages/Login'

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: AdminLayout,
        children: [
            {
                path: '/',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: '/designer',
                redirect: { name: 'DesignersDashboard' }
            },
            {
                path: '/designer/dashboard',
                name: 'DesignersDashboard',
                component: DesignersDashboard
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