import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: ['md', 'fa']
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#42b983',
        secondary: '#2c3e50',
        lightgrey: '#eee'
      }
    }
  }
})
