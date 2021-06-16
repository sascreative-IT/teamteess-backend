import CommentService from '@/services/CommentService';


const state = {
    comments: [],
    comment: {},
};
const mutations = {
    SET_FETCH_COMMENT_SUCCESS(state, comment) {
        state.comment = comment;
    },

    SET_FETCH_COMMENTS_SUCCESS(state, comments) {
        state.comments = comments;
    },

    SET_STORE_COMMENT_SUCCESS(state, comment) {
        state.comment = comment;
    },

};
const actions = {
    storeComment({commit}, payload) {
        return CommentService.storeComment(payload).then(response => {
            commit('SET_STORE_COMMENT_SUCCESS', response);
            return Promise.resolve(response);
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
