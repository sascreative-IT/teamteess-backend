import DesignRequestService from '@/services/DesignRequestService';


const state = {
    designRequests: [],
    designRequest: {},
    designChangeRequest: {}
};
const mutations = {
    SET_FETCH_DESIGN_REQUESTS_SUCCESS(state, designRequests) {
        state.designRequests = designRequests;
    },

    SET_FETCH_DESIGN_REQUEST_SUCCESS(state, designRequest) {
        state.designRequest = designRequest;
    },

    SET_FETCH_DESIGN_CHANGE_REQUEST_SUCCESS(state, designChangeRequest) {
        state.designChangeRequest = designChangeRequest;
    },

};
const actions = {
    fetchDesignRequests({commit}, status) {
        return DesignRequestService.fetchDesignRequests(status).then(response => {
            commit('SET_FETCH_DESIGN_REQUESTS_SUCCESS', response.data);
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    fetchDesignRequest({commit}, recordId) {
        return DesignRequestService.fetchDesignRequest(recordId).then(response => {
            commit('SET_FETCH_DESIGN_REQUEST_SUCCESS', response.data);
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    updateDesignerStatus({commit},payload) {
        return DesignRequestService.updateDesignerStatus(payload.id, payload.data).then(response => {
            commit('SET_FETCH_DESIGN_REQUEST_SUCCESS', response.data);
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    updateChangeRequestDesignerStatus({commit},payload) {
        return DesignRequestService.updateChangeRequestDesignerStatus(payload.id, payload.data).then(response => {
            commit('SET_FETCH_DESIGN_CHANGE_REQUEST_SUCCESS', response.data);
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error);
        });
    },


    startWorking({commit},payload) {
        return DesignRequestService.startWorking(payload.id).then(response => {
            commit('SET_FETCH_DESIGN_REQUEST_SUCCESS', response.data);
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    updateEstimation({commit},payload) {
        return DesignRequestService.updateEstimation(payload.id, payload.data).then(response => {
            commit('SET_FETCH_DESIGN_REQUEST_SUCCESS', response.data);
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error);
        });
    },


};
const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
