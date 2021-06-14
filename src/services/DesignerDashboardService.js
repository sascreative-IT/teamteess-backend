import {privateAPI} from './API'

export default {

    fetchDashboardData: async () => {
        return privateAPI.get('/secure/designer/dashboard')
    },

}