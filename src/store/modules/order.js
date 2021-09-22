import OrderService from "@/services/OrderService";

const state = () => ({
    orders: [],
    testOrders: [],
    factoryOrders: [],
    warehouseOrders: [],
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
    },
    getFactoryOrders(state) {
        return state.factoryOrders;
    },

}

const mutations = {
    SET_ORDERS(state, orders) {
        state.orders = orders;
    },

    SET_ORDER(state, order) {
        state.order = order;
    },

    SET_TEST_ORDERS(state, orders) {
        state.testOrders = orders;
    },


    SET_ORDER_ITEM(state, orderItem) {
        state.orderItem = orderItem;
    },

    SET_FACTORY_ORDERS(state, orders) {
        state.factoryOrders = orders;
    },

    SET_WAREHOUSE_ORDERS(state, orders) {
        state.warehouseOrders = orders;
    },
}

const actions = {
    fetchOrder({commit}, orderId) {
        return OrderService.fetchOrder(orderId)
            .then(({data}) => {
                commit('SET_ORDER', data)
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    cancelOrder({commit}, orderId) {
        return OrderService.cancelOrder(orderId)
            .then(({data}) => {
                commit('SET_ORDER', data)
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    sentToFactory({commit}, orderId) {
        return OrderService.sentToFactory(orderId)
            .then(({data}) => {
                commit('SET_ORDER', data)
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    processingInFactory({commit}, orderId) {
        return OrderService.processingInFactory(orderId)
            .then(({data}) => {
                commit('SET_ORDER', data)
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    sentToWareHouse({commit}, orderData) {
        return OrderService.sentToWareHouse(orderData.orderId, orderData.message)
            .then(({data}) => {
                commit('SET_ORDER', data)
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    processingInWareHouse({commit}, orderId) {
        return OrderService.processingInWareHouse(orderId)
            .then(({data}) => {
                commit('SET_ORDER', data)
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    shipOrder({commit}, orderData) {
        return OrderService.shipOrder(orderData.orderId, orderData.message)
            .then(({data}) => {
                commit('SET_ORDER', data)
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    readyToPickup({commit}, orderData) {
        return OrderService.readyToPickup(orderData.orderId, orderData.message)
            .then(({data}) => {
                commit('SET_ORDER', data)
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    completeOrder({commit}, orderId) {
        return OrderService.completeOrder(orderId)
            .then(({data}) => {
                commit('SET_ORDER', data)
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    /*
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
    */

    fetchTestOrders({commit}) {
        return OrderService.fetchTestOrders().then(response => {
            commit('SET_TEST_ORDERS', response.data);
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    markAsPaid({commit}, orderId) {
        return OrderService.markAsPaid(orderId)
            .then(({data}) => {
                commit('SET_ORDER', data)
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    fetchDyoOrders({commit}, status) {
        return OrderService.fetchDyoOrders(status).then(response => {
            commit('SET_ORDERS', response.data);
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    fetchFactoryOrders({commit}, status) {
        return OrderService.fetchFactoryOrders(status).then(response => {
            commit('SET_FACTORY_ORDERS', response.data);
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    fetchWarehouseOrders({commit}, status) {
        return OrderService.fetchWarehouseOrders(status).then(response => {
            commit('SET_WAREHOUSE_ORDERS', response.data);
            return Promise.resolve(response);
        }).catch(error => {
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

    updateStatus({commit}, payload) {
        return OrderService.updateStatus(payload.id, {
            'status': payload.status,
        })
            .then(({data}) => {
                commit('SET_ORDER', data)
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
};