import { createApp, h } from 'vue'
import router from './router'
import App from './app.vue'

createApp({
  render: () => h(App)
}).use(router).mount('#app')
