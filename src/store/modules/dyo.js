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
            'source_file': payload.source_file,
        })
            .then(({data}) => {
                commit('SET_FETCH_DESIGN_ACTION', data)
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    updateFrontImageSnapshot({commit}, payload) {
        return dyoService.updateFrontImageSnapshot(payload.id, {
            'front_design_snapshot' : payload.front_design_snapshot
        })
            .then(({data}) => {
                commit('SET_FETCH_DESIGN_ACTION', data)
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    updateBackImageSnapshot({commit}, payload) {
        return dyoService.updateBackImageSnapshot(payload.id, {
            'back_design_snapshot' : payload.back_design_snapshot
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