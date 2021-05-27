import OrderService from "@/services/OrderService";

const state = () => ({
    orders: [],
    order: {},
    orderItem: {}
})

const getters = {
    getOrder(state) {
        return state.order;
    },
    getOrders(state) {
        return state.orders;
    },
    getOrderItem(state) {
        return state.orderItem;
    }

}

const mutations = {
    SET_ORDERS(state, orders) {
        state.orders = orders;
    },

    SET_ORDER(state, order) {
        state.order = order;
    },

    SET_ORDER_ITEM(state, orderItem) {
        state.orderItem = orderItem;
    },
}

const actions = {
    fetchOrder({commit}, orderId) {
        return OrderService.fetchOrder(orderId)
            .then(({data}) => {
                commit('SET_ORDER', data)
                return Promise.resolve({data});
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    fetchOrders({commit}) {
        return OrderService.fetchOrders()
            .then(({data}) => {
                commit('SET_ORDERS', data)
                return Promise.resolve({data});
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    fetchOrderItem({commit}, orderItemId) {
        return OrderService.fetchOrderItem(orderItemId)
            .then(({data}) => {
                commit('SET_ORDER_ITEM', data)
                return Promise.resolve({data});
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
};