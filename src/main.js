import { createApp } from 'vue'
import router from './router'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import App from './app.vue'

import '@mdi/font/css/materialdesignicons.min.css'

const app = createApp(App)

app.use(router)
app.use(WaveUI, {
  iconsLigature: 'material-icons',
  colors: {
    primary: '#42b983',
    secondary: '#2c3e50',
    lightgrey: '#eee'
  },
  theme: 'auto'
})

app.mount('#app')
