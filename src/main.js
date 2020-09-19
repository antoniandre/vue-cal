// Polyfill.
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { createApp, h } from 'vue'
// Vuetify does not work on Vue 3 yet.
// import vuetify from './plugins/vuetify'
import router from './router'
import App from './app'
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/brands.css'

createApp({
  // vuetify,
  render: () => h(App)
}).use(router).mount('#app')
