import {privateAPI} from './API'

export default {

    fetchDesignRequests: async (status) => {
        return privateAPI.get('/secure/design-requests/?status=' + status)
    },

    fetchDesignRequest: async (id) => {
        return privateAPI.get('/secure/design-requests/' + id)
    },

    updateDesignerStatus: async (id, payload) => {
        console.log(payload);
        return privateAPI.put('/secure/design-requests/designer-status/' + id, payload)
    },
}