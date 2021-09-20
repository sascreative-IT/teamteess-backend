import {privateAPI} from './API'

export default {

    cancelOrder: async (orderId) => {
        return privateAPI.post('/orders/cancel/'+ orderId)
    },

    sentToFactory: async (orderId) => {
        return privateAPI.post('/orders/send-order-to-factory/'+ orderId)
    },

    processingInFactory: async (orderId) => {
        return privateAPI.post('/orders/processing-in-factory/'+ orderId)
    },

    sentToWareHouse: async (orderId, message) => {
        return privateAPI.post('/orders/send-order-to-wareHouse/'+ orderId, {message: message})
    },

    processingInWareHouse: async (orderId) => {
        return privateAPI.post('/orders/processing-in-wareHouse/'+ orderId)
    },

    shipOrder: async (orderId) => {
        return privateAPI.post('/orders/ship-order/'+ orderId)
    },

    completeOrder: async (orderId) => {
        return privateAPI.post('/orders/complete/'+ orderId)
    },


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
        return privateAPI.get('/orders/factory-orders/' + status)
    },

    updateStatus: async (orderId, payload) => {
        return privateAPI.put('/secure/orders/update-status/'+ orderId, payload)
    },
}