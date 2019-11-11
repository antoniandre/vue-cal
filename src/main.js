// Polyfill.
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import vuetify from './plugins/vuetify'
import router from './router'
import App from './app'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
