import {privateAPI} from './API'

export default {

    markAsPaid: async (orderId) => {
        return privateAPI.put('/orders/tests/' + orderId)
    },

    cancelOrder: async (orderId) => {
        return privateAPI.post('/orders/change-status/cancel/' + orderId)
    },

    processingInDesignHouse: async (orderId) => {
        return privateAPI.post('/orders/change-status/processing-in-design-house/' + orderId)
    },

    sentToFactory: async (orderId, message) => {
        return privateAPI.post('/orders/change-status/send-order-to-factory/' + orderId, {message: message})
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

    fetchDesignHouseOrders: async (q) => {
        return privateAPI.get('/orders/design-house-orders/' + q)
    },

    fetchFactoryOrders: async (q) => {
        return privateAPI.get('/orders/factory-orders/' + q)
    },

    fetchWarehouseOrders: async (q) => {
        return privateAPI.get('/orders/warehouse-orders/' + q)
    },

    fetchTestOrders: async () => {
        return privateAPI.get('/orders/tests')
    },

    updateStatus: async (orderId, payload) => {
        return privateAPI.put('/secure/orders/update-status/' + orderId, payload)
    },
}