import Vue from 'vue'
import Router from 'vue-router'

import AdminLayout from '@/components/AdminLayout'
import DesignersDashboard from '@/pages/designers/Dashboard'
import DesignRequestDashboard from '@/pages/designers/DesignRequestDashboard'
import DesignRequests from '@/pages/designers/DesignRequests'
import TestOrders from '@/pages/admin/order/TestOrders';
import DyoOrders from '@/pages/designers/dyo/Orders'
import FactoryDashboard from '@/pages/factory/Dashboard'
import AdminDashboard from '@/pages/admin/Dashboard'
import WarehouseDashboard from '@/pages/warehouse/Dashboard'
import DesignHouseOrders from '@/pages/designHouse/order/Orders';
import FactoryOrders from '@/pages/factory/order/Orders';
import WarehouseOrders from '@/pages/warehouse/order/Orders';
import FactoryOrderView from '@/pages/factory/order/FactoryOrderView';
import WarehouseOrderView from '@/pages/warehouse/order/WarehouseOrderView';
import FactoryOrderItemView from '@/pages/factory/order/OrderItemView';
import DyoOrderView from '@/pages/designers/dyo/DyoOrderView';
import DyoOrderItemView from '@/pages/designers/dyo/DyoOrderItemView';
import DesignRequest from '@/pages/designers/DesignRequest'
import UpdateDesignRequestStatus from '@/pages/designers/UpdateDesignRequestStatus'
import OrderTimeLineView from '@/pages/order/TimeLineView';

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
                component: AdminDashboard
            },
            {
                path: '/test-orders',
                name: 'TestOrders',
                component: TestOrders
            },
            {
                path: '/designer',
                redirect: { name: 'DesignersDashboard' }
            },
            {
                path: '/design-house/dashboard',
                name: 'DesignersDashboard',
                component: DesignersDashboard
            },
            {
                path: '/design-house/design-request-dashboard',
                name: 'DesignRequestDashboard',
                component: DesignRequestDashboard
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
                path: '/factory/dashboard',
                name: 'FactoryDashboard',
                component: FactoryDashboard
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
            {
                path: '/warehouse/dashboard',
                name: 'WarehouseDashboard',
                component: WarehouseDashboard
            },
            {
                path: '/design-house/orders/:status',
                name: 'DesignHouseOrders',
                component: DesignHouseOrders
            },
            {
                path: '/warehouse/orders/:status',
                name: 'WarehouseOrders',
                component: WarehouseOrders
            },
            {
                path: '/warehouse/orders/view/:id',
                name: 'WarehouseOrderView',
                component: WarehouseOrderView
            },
            {
                path: '/orders/time-line/:id',
                name: 'OrderTimeLineView',
                component: OrderTimeLineView
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