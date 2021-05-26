import Vue from 'vue'
import Vuex from 'vuex'
import sideBar from './modules/sidebarModule';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        sideBar
    }
})
