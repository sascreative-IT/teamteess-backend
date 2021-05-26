import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'

import '@/assets/css/tailwind.css'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(Element, { locale })

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

