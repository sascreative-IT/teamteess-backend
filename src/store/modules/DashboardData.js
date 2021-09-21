import DashboardDataService from '@/services/DashboardDataService';


const state = {
    factoryDashboardData: [],
    warehouseDashboardData: []
};

const mutations = {
    SET_FETCH_FACTORY_DASHBOARD_DATA_SUCCESS(state, factoryDashboardData) {
        state.factoryDashboardData = factoryDashboardData;
    },

    SET_FETCH_WAREHOUSE_DASHBOARD_DATA_SUCCESS(state, warehouseDashboardData) {
        state.warehouseDashboardData = warehouseDashboardData;
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

    fetchWarehouseDashboardData({commit}) {
        return DashboardDataService.fetchWarehouseData().then(response => {
            commit('SET_FETCH_WAREHOUSE_DASHBOARD_DATA_SUCCESS', response.data);
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

};
const getters = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
