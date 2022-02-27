import {privateAPI} from './API'

export default {

    fetchDesignHouseData: async () => {
        return privateAPI.get('/dashboard/design-house-dashboard-data')
    },

    fetchFactoryData: async () => {
        return privateAPI.get('/dashboard/factory-dashboard-data')
    },

    fetchWarehouseData: async () => {
        return privateAPI.get('/dashboard/warehouse-dashboard-data')
    },

    fetchDesignRequestDashboardData: async () => {
        return privateAPI.get('/dashboard/design-request-dashboard-data')
    },
}