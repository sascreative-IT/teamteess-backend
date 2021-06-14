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
}