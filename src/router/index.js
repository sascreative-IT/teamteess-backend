import Vue from 'vue'
import Router from 'vue-router'

import AdminLayout from '@/components/AdminLayout'
import Dashboard from '@/pages/Dashboard'
import DesignersDashboard from '@/pages/designers/Dashboard'
import DesignRequests from '@/pages/designers/DesignRequests'
import DyoOrders from '@/pages/designers/dyo/Orders';
import FactoryOrders from '@/pages/factory/order/Orders';
import FactoryOrderView from '@/pages/factory/order/FactoryOrderView';
import FactoryOrderItemView from '@/pages/factory/order/OrderItemView';
import DyoOrderView from '@/pages/designers/dyo/DyoOrderView';
import DyoOrderItemView from '@/pages/designers/dyo/DyoOrderItemView';
import DesignRequest from '@/pages/designers/DesignRequest'
import UpdateDesignRequestStatus from '@/pages/designers/UpdateDesignRequestStatus'

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
                path: '/designer/design-requests/:status/:paymentStatus',
                name: 'DesignRequests',
                component: DesignRequests
            },
            {
                path: '/designer/design-request/:id',
                name: 'DesignRequest',
                component: DesignRequest
            },
            {
                path: '/designer/design-request/update-status/:id',
                name: 'UpdateDesignRequestStatus',
                component: UpdateDesignRequestStatus
            },
            {
                path: '/designer/dyo-orders/:status',
                name: 'DyoOrders',
                component: DyoOrders
            },
            {
                path: '/designer/dyo-orders/view/:id',
                name: 'DyoOrderView',
                component: DyoOrderView
            },
            {
                path: '/designer/dyo-orders/view/:id/:itemId',
                name: 'DyoOrderItemView',
                component: DyoOrderItemView
            },
            {
                path: '/factory/orders/:status',
                name: 'FactoryOrders',
                component: FactoryOrders
            },
            {
                path: '/factory/orders/view/:id',
                name: 'FactoryOrderView',
                component: FactoryOrderView
            },
            {
                path: '/factory/orders/view/:id/:itemId',
                name: 'FactoryOrderItemView',
                component: FactoryOrderItemView
            },
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