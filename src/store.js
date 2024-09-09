import { inject, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const $waveui = inject('$waveui')
  const darkMode = ref(false)

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    localStorage.theme = darkMode.value ? 'dark' : 'light'
    $waveui.switchTheme(darkMode.value ? 'dark' : 'light')
  }

  const applyTheme = theme => {
    darkMode.value = theme === 'dark'
    localStorage.theme = theme
    $waveui.switchTheme(theme)
  }

  return {
    darkMode,
    toggleDarkMode,
    applyTheme
  }
})