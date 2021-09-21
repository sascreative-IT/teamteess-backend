import {privateAPI} from './API'

export default {

    fetchFactoryData: async () => {
        return privateAPI.get('/dashboard/factory-dashboard-data')
    },

    fetchWarehouseData: async () => {
        return privateAPI.get('/dashboard/warehouse-dashboard-data')
    },
}