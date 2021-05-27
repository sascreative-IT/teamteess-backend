import ProductService from '@/services/ProductService';

// init state
const state = () => ({
    product: {},
    products: [],
})

const getters = {
    getProduct(state) {
        return state.product;
    },
}

const mutations = {
    SET_FETCH_PRODUCTS_SUCCESS(state, products) {
        state.products = products;
    },

    SET_FETCH_PRODUCT_SUCCESS(state, product) {
        state.product = product;
    },
}

const actions = {
    fetchProducts({commit}, payload) {
        return ProductService.fetchProducts(payload)
            .then(({data}) => {
                commit('SET_FETCH_PRODUCTS_SUCCESS', data.data)
                return Promise.resolve(data.data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    fetchProduct({commit}, productId) {
        return ProductService.fetchProduct(productId)
            .then(({data}) => {
                commit('SET_FETCH_PRODUCT_SUCCESS', data)
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