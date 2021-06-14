import DesignerDashboardService from '@/services/DesignerDashboardService';


const state = {
    dashboardData: []
};

const mutations = {
    SET_FETCH_DASHBOARD_DATA_SUCCESS(state, dashboardData) {
        state.dashboardData = dashboardData;
    },
}

const actions = {
    fetchDashboardData({commit}, status) {
        return DesignerDashboardService.fetchDashboardData(status).then(response => {
            commit('SET_FETCH_DASHBOARD_DATA_SUCCESS', response.data);
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
