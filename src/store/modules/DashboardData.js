import DashboardDataService from '@/services/DashboardDataService';


const state = {
    factoryDashboardData: []
};

const mutations = {
    SET_FETCH_FACTORY_DASHBOARD_DATA_SUCCESS(state, factoryDashboardData) {
        state.factoryDashboardData = factoryDashboardData;
    },
}

const actions = {
    fetchFactoryDashboardData({commit}) {
        return DashboardDataService.fetchFactoryData().then(response => {
            commit('SET_FETCH_FACTORY_DASHBOARD_DATA_SUCCESS', response.data);
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

};
const getters = {
    getFactoryDashboardData() {
        return this.dashboardData;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
