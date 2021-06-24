import {privateAPI} from './API'

export default {

    fetchDesignRequests: async (payload) => {
        return privateAPI.get('/secure/design-requests/?status=' + payload.status + '&payment-status=' + payload.paymentStatus)
    },

    fetchDesignRequest: async (id) => {
        return privateAPI.get('/secure/design-requests/' + id)
    },

    updateDesignerStatus: async (id, payload) => {
        return privateAPI.put('/secure/design-requests/designer-status/' + id, payload)
    },

    updateChangeRequestDesignerStatus: async (id, payload) => {
        return privateAPI.put('/secure/design-requests/change-request/designer-status/' + id, payload)
    },

    startWorking: async (id) => {
        return privateAPI.put('/secure/design-requests/start-working/' + id)
    },

    updateEstimation: async (id, payload) => {
        return privateAPI.put('/secure/design-requests/change-request/designer-estimation/' + id, payload)
    }
}