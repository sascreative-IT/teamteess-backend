import UserService from '@/services/UserService';


const state = {
    loggedIn: false,
    user: {}
};
const mutations = {
    SET_LOGIN_SUCCESS(state, user) {
        state.loggedIn = true;
        state.user = user;
    },

    SET_LOGOUT_SUCCESS(state) {
        state.loggedIn = false;
        state.user = {}
    },
};
const actions = {
    loginUser({commit}, payload) {
        return UserService.login(payload).then(response => {
            commit('SET_LOGIN_SUCCESS', response.data.user);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user))
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    logoutUser({commit}) {
        try{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            commit('SET_LOGOUT_SUCCESS');
            return Promise.resolve({
                'is_logout': true
            });
        }catch (e) {
            return Promise.resolve({
                'is_logout': false,
                'error': e
            });
        }
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
