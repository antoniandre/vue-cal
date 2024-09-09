import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import App from './app.vue'

import '@mdi/font/css/materialdesignicons.min.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(WaveUI, {
  colors: {
    light: {
      primary: '#42b983',
      secondary: '#2c3e50',
      lightgrey: '#eee'
    },
    dark: {
      primary: '#73daab',
      secondary: '#fff',
      lightgrey: '#444'
    }
  },
  theme: 'auto'
})

app.mount('#app')
