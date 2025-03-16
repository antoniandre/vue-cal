import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'

/**
 * Composable for observing section elements in the viewport and tracking the active section.
 * @param {Object} options - Configuration options
 * @param {Function} options.onSectionChange - Callback when active section changes
 * @param {String} options.sectionSelector - Query selector for the sections to observe
 * @param {Number} options.initialDelay - Delay before initial observation in ms
 * @param {Number} options.routeChangeDelay - Delay after route changes in ms
 * @param {Number} options.scrollDebounce - Debounce time for scroll events in ms
 * @returns {Object} - Observer methods and state
 */
export function useSectionObserver(options = {}) {
  const {
    onSectionChange,
    sectionSelector = '[id^="ex--"]',
    initialDelay = 500,
    routeChangeDelay = 300,
    scrollDebounce = 200
  } = options

  const route = useRoute()
  const observer = ref(null)
  const scrollTimer = ref(null)
  const activeSection = ref(null)

  /**
   * Initialize the intersection observer.
   */
  async function initializeObserver() {
    // Wait for DOM updates to ensure sections are available.
    await nextTick()

    // Cleanup previous observer if it exists.
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }

    const sections = document.querySelectorAll(sectionSelector)
    if (!sections.length) return

    const minThreshold = window.innerHeight * 0.01 // 1% of viewport height.
    const maxThreshold = window.innerHeight * 0.47 // 47% of viewport height.

    observer.value = new IntersectionObserver(entries => {
      if (!observer.value) return

      let topmostSection = null
      let nextVisibleSection = null

      for (const entry of entries) {
        const { top } = entry.boundingClientRect

        // If section's top is between 1%-47% of viewport, consider it as the topmost candidate.
        if ((top >= minThreshold && top <= maxThreshold) && (!topmostSection || top < topmostSection.top)) {
          topmostSection = { id: entry.target.id, top }
        }

        // If section's top is between 0%-47% of viewport, consider it as the next visible section.
        if ((top >= 0 && top <= maxThreshold) && (!nextVisibleSection || top < nextVisibleSection.top)) {
          nextVisibleSection = { id: entry.target.id, top }
        }
      }

      // Update the active section.
      if (topmostSection) updateActiveSection(`#${topmostSection.id}`)
      else if (nextVisibleSection) updateActiveSection(`#${nextVisibleSection.id}`)
    }, {
      root: null, // Uses the viewport as the root.
      threshold: 0.0, // Fires when any part of an element enters/exits the viewport.
      rootMargin: '0% 0% -60%' // Set the detection range: top sides bottom.
    })

    // Observe all matching sections.
    for (const section of sections) observer.value.observe(section)
  }

  /**
   * Update the active section and call the change handler.
   * @param {String} section - The section identifier.
   */
  function updateActiveSection(section) {
    if (activeSection.value !== section) {
      activeSection.value = section
      if (typeof onSectionChange === 'function') {
        onSectionChange(section)
      }
    }
  }

  /**
   * Debounce function for scroll events.
   */
  const debounceScroll = () => {
    if (scrollTimer.value) clearTimeout(scrollTimer.value)
    scrollTimer.value = setTimeout(initializeObserver, scrollDebounce)
  }

  // Set up watchers and listeners.
  onMounted(() => {
    // Add scroll event listener.
    window.addEventListener('scroll', debounceScroll)

    // Initialize observer with a delay.
    setTimeout(initializeObserver, initialDelay)
  })

  // Watch for route and hash changes.
  watch(() => `${route.name}${route.hash}`, () => {
    // Reset observer and reinitialize after route change
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }
    setTimeout(initializeObserver, routeChangeDelay)
  })

  // Cleanup.
  onBeforeUnmount(() => {
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }

    window.removeEventListener('scroll', debounceScroll)

    if (scrollTimer.value) {
      clearTimeout(scrollTimer.value)
      scrollTimer.value = null
    }
  })

  return {
    activeSection,
    initializeObserver,
    updateActiveSection
  }
}
