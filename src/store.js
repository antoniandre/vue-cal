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

  // Active section or example in page, using an intersection observer in the top-bar component.
  const activeSection = null

  return {
    darkMode,
    toggleDarkMode,
    applyTheme,
    activeSection
  }
})
