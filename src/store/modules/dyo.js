import dyoService from '@/services/DyoService';

const state = () => ({
    design: {},
})

const getters = {
    getDesign(state) {
        return state.design;
    }
}

const mutations = {
    SET_FETCH_DESIGN_ACTION(state, design) {
        state.design = design;
    },
}

const actions = {
    fetchDesign({commit}, payload) {
        return dyoService.fetchDesign(payload)
            .then(({data}) => {
                commit('SET_FETCH_DESIGN_ACTION', data)
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },
    updateDesignerStatus({commit}, payload) {
        return dyoService.updateDesignerStatus(payload.id, {
            'status' : payload.status,
            'estimation' : payload.estimation,
            'comments' : payload.comments,
            'attachment' : payload.attachment,
        })
            .then(({data}) => {
                commit('SET_FETCH_DESIGN_ACTION', data)
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}