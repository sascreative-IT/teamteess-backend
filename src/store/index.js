import Vue from 'vue'
import Vuex from 'vuex'
import sideBar from './modules/sidebarModule';
import user from './modules/user';
import designRequest from './modules/designRequest';
import designerDashboard from './modules/designerDashboard';
import product from './modules/product';
import order from './modules/order';
import system from './modules/system';
import dyo from './modules/dyo';
import comment from './modules/comment';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        sideBar,
        user,
        designRequest,
        product,
        order,
        system,
        designerDashboard,
        dyo,
        comment
    }
})
