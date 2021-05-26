import Vue from 'vue'
import Router from 'vue-router'

import AdminLayout from '@/components/AdminLayout'
import Dashboard from '@/pages/Dashboard'
import DesignersDashboard from '@/pages/designers/Dashboard'
import DesignRequests from '@/pages/designers/DesignRequests'
import DesignRequest from '@/pages/designers/DesignRequest'

import Login from '@/pages/Login'

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: AdminLayout,
        meta: { requiresAuth: true },
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
            },
            {
                path: '/designer/design-requests',
                name: 'DesignRequests',
                component: DesignRequests
            },
            {
                path: '/designer/design-request/:id',
                name: 'DesignRequest',
                component: DesignRequest
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = new Router({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('token')
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/login')
    }
    next()
});

export default router