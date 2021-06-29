import {privateAPI} from './API'

export default {

    fetchDyoOrders: async (status) => {
        return privateAPI.get('/secure/designer/dyo-orders/?status=' + status)
    },

    fetchOrder: async (orderId) => {
        return privateAPI.get('/orders/' + orderId)
    },

    fetchOrderItem: async (orderItemId) => {
        return privateAPI.get('/orders/item/' + orderItemId)
    },

    fetchFactoryOrders: async (status) => {
        return privateAPI.get('/secure/factory/orders/?status=' + status)
    },

    updateStatus: async (orderId, payload) => {
        return privateAPI.put('/secure/orders/update-status/'+ orderId, payload)
    },
}