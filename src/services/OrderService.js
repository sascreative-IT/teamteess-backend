import {privateAPI} from './API'

export default {

    markAsPaid: async (orderId) => {
        return privateAPI.put('/orders/tests/' + orderId)
    },

    cancelOrder: async (orderId) => {
        return privateAPI.post('/orders/change-status/cancel/' + orderId)
    },

    sentToFactory: async (orderId) => {
        return privateAPI.post('/orders/change-status/send-order-to-factory/' + orderId)
    },

    processingInFactory: async (orderId) => {
        return privateAPI.post('/orders/change-status/processing-in-factory/' + orderId)
    },

    sentToWareHouse: async (orderId, message) => {
        return privateAPI.post('/orders/change-status/send-order-to-wareHouse/' + orderId, {message: message})
    },

    processingInWareHouse: async (orderId) => {
        return privateAPI.post('/orders/change-status/processing-in-wareHouse/' + orderId)
    },

    shipOrder: async (orderId, message) => {
        return privateAPI.post('/orders/change-status/ship-order/' + orderId, {message: message})
    },

    readyToPickup: async (orderId, message) => {
        return privateAPI.post('/orders/change-status/ready-to-pickup/' + orderId, {message: message})
    },

    completeOrder: async (orderId) => {
        return privateAPI.post('/orders/change-status/complete/' + orderId)
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

    fetchWarehouseOrders: async (status) => {
        return privateAPI.get('/orders/warehouse-orders/' + status)
    },

    fetchTestOrders: async () => {
        return privateAPI.get('/orders/tests')
    },

    updateStatus: async (orderId, payload) => {
        return privateAPI.put('/secure/orders/update-status/' + orderId, payload)
    },
}