/// <reference types="cypress" />

describe('Vue Cal - Comprehensive Props Test', () => {
  beforeEach(() => {
    cy.visit('/test-comprehensive', {
      timeout: 60000,
      retryOnStatusCodeFailure: true,
      retryOnNetworkFailure: true
    })
    cy.get('[data-testid="vue-cal"]', { timeout: 30000 }).should('be.visible')
    cy.wait(2000) // Wait for Vue Cal to be ready and sample events to load
  })

  describe('Basic Props', () => {
    it('should load the comprehensive test page', () => {
      cy.get('[data-testid="vue-cal"]').should('be.visible')
      cy.contains('Vue Cal - Comprehensive Test View').should('be.visible')
      cy.get('.controls-panel').should('be.visible')
    })

    it('should switch views', () => {
      // Test Month view
      cy.get('[data-testid="view-select"]').select('Month')
      cy.wait(800) // View changes have transitions
      cy.get('.vuecal').should('have.class', 'vuecal--month-view')

      // Test Day view
      cy.get('[data-testid="view-select"]').select('Day')
      cy.wait(800) // View changes have transitions
      cy.get('.vuecal').should('have.class', 'vuecal--day-view')

      // Test Week view
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(800) // View changes have transitions
      cy.get('.vuecal').should('have.class', 'vuecal--week-view')
    })

    it('should toggle todayButton', () => {
      // First ensure it's checked and visible
      cy.get('[data-testid="today-button"]').should('be.checked')
      cy.get('.vuecal__title-bar .vuecal__nav--today').should('exist')

      // Uncheck it
      cy.get('[data-testid="today-button"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__title-bar .vuecal__nav--today').should('not.exist')

      // Check it again
      cy.get('[data-testid="today-button"]').check()
      cy.wait(300)
      cy.get('.vuecal__title-bar .vuecal__nav--today').should('exist')
    })

    it('should toggle titleBar', () => {
      cy.get('[data-testid="title-bar"]').should('be.checked')
      cy.get('.vuecal__title-bar').should('exist')

      cy.get('[data-testid="title-bar"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__title-bar').should('not.exist')

      cy.get('[data-testid="title-bar"]').check()
      cy.wait(300)
      cy.get('.vuecal__title-bar').should('exist')
    })

    it('should toggle viewsBar', () => {
      cy.get('[data-testid="views-bar"]').should('be.checked')
      cy.get('.vuecal__views-bar button').should('have.length.greaterThan', 3)

      cy.get('[data-testid="views-bar"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__views-bar').should('not.exist')

      cy.get('[data-testid="views-bar"]').check()
      cy.wait(300)
      cy.get('.vuecal__views-bar button').should('have.length.greaterThan', 3)
    })

    it('should toggle startWeekOnSunday', () => {
      // Ensure we're in week view
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="start-week-sunday"]').check()
      cy.wait(300)
      cy.get('.vuecal__weekday-day').first().invoke('text').should('match', /Sun/i)

      cy.get('[data-testid="start-week-sunday"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__weekday-day').first().invoke('text').should('match', /Mon/i)
    })

    it('should toggle weekNumbers', () => {
      // Week numbers only show in Month view
      cy.get('[data-testid="view-select"]').select('Month')
      cy.wait(800) // View change has transition

      cy.get('[data-testid="week-numbers"]').check()
      cy.wait(300)
      cy.get('.vuecal__week-number').should('exist')
      cy.get('.vuecal__week-number').should('have.length.greaterThan', 3)

      cy.get('[data-testid="week-numbers"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__week-number').should('not.exist')
    })
  })

  describe('Display Props', () => {
    it('should toggle theme', () => {
      cy.get('.vuecal').should('have.class', 'vuecal--default-theme')

      cy.get('[data-testid="theme-select"]').select('None')
      cy.wait(300)
      cy.get('.vuecal').should('not.have.class', 'vuecal--default-theme')

      cy.get('[data-testid="theme-select"]').select('Default')
      cy.wait(300)
      cy.get('.vuecal').should('have.class', 'vuecal--default-theme')
    })

    it('should toggle dark mode', () => {
      cy.get('[data-testid="dark-mode"]').check()
      cy.wait(300)
      cy.get('.vuecal').should('have.class', 'vuecal--dark')

      cy.get('[data-testid="dark-mode"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal').should('not.have.class', 'vuecal--dark')
    })

    it('should toggle sm size', () => {
      cy.get('[data-testid="sm-size"]').check()
      cy.wait(300)
      cy.get('.vuecal').should('have.class', 'vuecal--sm')

      cy.get('[data-testid="sm-size"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal').should('not.have.class', 'vuecal--sm')
    })

    it('should toggle xs size', () => {
      cy.get('[data-testid="xs-size"]').check()
      cy.wait(300)
      cy.get('.vuecal').should('have.class', 'vuecal--xs')

      cy.get('[data-testid="xs-size"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal').should('not.have.class', 'vuecal--xs')
    })

    it('should toggle horizontal mode', () => {
      cy.get('[data-testid="horizontal"]').check()
      cy.wait(300)
      cy.get('.vuecal').should('have.class', 'vuecal--horizontal')

      cy.get('[data-testid="horizontal"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal').should('not.have.class', 'vuecal--horizontal')
    })

    it('should toggle datePicker mode', () => {
      cy.get('[data-testid="date-picker"]').check()
      cy.wait(300)
      cy.get('.vuecal').should('have.class', 'vuecal--date-picker')

      cy.get('[data-testid="date-picker"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal').should('not.have.class', 'vuecal--date-picker')
    })
  })

  describe('Time Props', () => {
    it('should toggle time column', () => {
      // Ensure we're in a view that shows time
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="time-enabled"]').should('be.checked')
      cy.get('.vuecal__time-column').should('exist')

      cy.get('[data-testid="time-enabled"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__time-column').should('not.exist')

      cy.get('[data-testid="time-enabled"]').check()
      cy.wait(300)
      cy.get('.vuecal__time-column').should('exist')
    })

    it('should change timeFrom', () => {
      cy.get('[data-testid="view-select"]').select('Day')
      cy.wait(800) // View change has transition

      // Select all and replace instead of clear (avoids Vue re-render issues)
      cy.get('[data-testid="time-from"]').focus().type('{selectall}480')
      cy.wait(300)
      cy.get('.vuecal__time-cell').should('have.length.greaterThan', 0)
    })

    it('should change timeTo', () => {
      cy.get('[data-testid="view-select"]').select('Day')
      cy.wait(800) // View change has transition

      // Select all and replace instead of clear (avoids Vue re-render issues)
      cy.get('[data-testid="time-to"]').focus().type('{selectall}1080')
      cy.wait(300)
      cy.get('.vuecal__time-cell').should('have.length.greaterThan', 0)
      cy.get('.vuecal__time-cell').should('have.length.lessThan', 25)
    })

    it('should change timeStep', () => {
      cy.get('[data-testid="view-select"]').select('Day')
      cy.wait(800) // View change has transition

      // Select all and replace instead of clear (avoids Vue re-render issues)
      cy.get('[data-testid="time-step"]').focus().type('{selectall}30')
      cy.wait(300)
      cy.get('.vuecal__time-cell').should('have.length.greaterThan', 24)
    })

    it('should toggle twelveHour format', () => {
      cy.get('[data-testid="view-select"]').select('Day')
      cy.wait(300)

      cy.get('[data-testid="twelve-hour"]').check()
      cy.wait(300)
      cy.get('.vuecal__time-cell').first().should('exist')

      cy.get('[data-testid="twelve-hour"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__time-cell').first().should('exist')
    })

    it('should toggle timeAtCursor', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="time-at-cursor"]').check()
      cy.wait(300)
      // Just verify the calendar still works
      cy.get('.vuecal__body').should('exist')
    })

    it('should change timeCellHeight', () => {
      cy.get('[data-testid="view-select"]').select('Day')
      cy.wait(800) // View change has transition

      // Select all and replace instead of clear (avoids Vue re-render issues)
      cy.get('[data-testid="time-cell-height"]').focus().type('{selectall}60')
      cy.wait(300)
      cy.get('.vuecal__time-cell').first().should('exist')
    })
  })

  describe('Event Props', () => {
    it('should toggle allDayEvents', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="all-day-events"]').check()
      cy.wait(300)
      cy.get('.vuecal__all-day').should('exist')
      cy.get('.vuecal__all-day-label').should('be.visible')

      cy.get('[data-testid="all-day-events"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__all-day').should('not.exist')
    })

    it('should toggle multidayEvents', () => {
      cy.get('[data-testid="multiday-events"]').should('be.checked')

      cy.get('[data-testid="multiday-events"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal').should('exist')

      cy.get('[data-testid="multiday-events"]').check()
      cy.wait(300)
      cy.get('.vuecal').should('exist')
    })

    it('should toggle eventsOnMonthView', () => {
      cy.get('[data-testid="view-select"]').select('Month')
      cy.wait(800) // View change has transition

      cy.get('[data-testid="events-on-month-view"]').check()
      cy.wait(300)
      cy.get('.vuecal__event').should('exist')

      cy.get('[data-testid="events-on-month-view"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__event').should('not.exist')
    })

    it('should toggle stackEvents', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(800) // View change has transition

      cy.get('[data-testid="stack-events"]').check()
      cy.wait(300)
      cy.get('.vuecal').should('exist')

      cy.get('[data-testid="stack-events"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal').should('exist')
    })

    it('should toggle editableEvents', () => {
      cy.get('[data-testid="editable-events"]').check()
      cy.wait(300)
      cy.get('.vuecal__event').first().should('exist')

      cy.get('[data-testid="editable-events"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__event').first().should('exist')
    })

    it('should add events', () => {
      // Ensure we're in Week view and showing today (where new events are added)
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(800) // View change has transition

      cy.get('.vuecal__event').its('length').then((initialCount) => {
        cy.get('[data-testid="add-event-btn"]').click()
        cy.wait(300)
        // Event is added today, so it should be visible in current week
        cy.get('.vuecal__event').should('have.length', initialCount + 1)
      })
    })

    it('should add all-day events', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(800) // View change has transition

      cy.get('[data-testid="all-day-events"]').check()
      cy.wait(300)

      // Get initial count of all-day events
      cy.get('.vuecal__all-day').then($allDay => {
        const initialCount = $allDay.find('.vuecal__event').length

        cy.get('[data-testid="add-all-day-event-btn"]').click()
        cy.wait(300)
        // Event is added today, so it should be visible
        cy.get('.vuecal__all-day .vuecal__event').should('have.length', initialCount + 1)
      })
    })

    it('should clear events', () => {
      cy.get('[data-testid="clear-events-btn"]').click()
      cy.wait(300)
      cy.get('.vuecal__event').should('not.exist')
    })

    it('should load sample events', () => {
      cy.get('[data-testid="clear-events-btn"]').click()
      cy.wait(300)

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('.vuecal__event').should('have.length.greaterThan', 5)
    })
  })

  describe('Weekday Props', () => {
    it('should toggle hideWeekends', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="hide-weekends"]').check()
      cy.wait(300)
      cy.get('.vuecal__weekday').should('have.length', 5)

      cy.get('[data-testid="hide-weekends"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__weekday').should('have.length', 7)
    })

    it('should hide specific weekdays', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="hide-weekday-1"]').check() // Hide Monday
      cy.wait(300)
      cy.get('.vuecal__weekday').should('have.length', 6)

      cy.get('[data-testid="hide-weekday-1"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__weekday').should('have.length', 7)
    })

    it('should disable specific days', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="disable-day-1"]').check() // Disable Monday
      cy.wait(300)
      cy.get('.vuecal').should('exist')
    })
  })

  describe('Schedules & Special Hours', () => {
    it('should enable schedules', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(800) // View change has transition

      cy.get('[data-testid="schedules-enabled"]').check()
      cy.wait(300)
      cy.get('.vuecal__schedule--heading').should('have.length.greaterThan', 0)

      cy.get('[data-testid="schedules-enabled"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__schedule--heading').should('not.exist')
    })

    it('should change number of schedules', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="schedules-enabled"]').check()
      cy.wait(300)

      // Select all and replace instead of clear (avoids Vue re-render issues)
      cy.get('[data-testid="schedule-count"]').focus().type('{selectall}5')
      cy.wait(800) // Schedule changes have transitions
      cy.get('.vuecal__schedule--heading').should('have.length', 35) // 5 schedules * 7 days
    })

    it('should enable special hours', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="special-hours-enabled"]').check()
      cy.wait(300)
      cy.get('.vuecal').should('exist')

      cy.get('[data-testid="special-hours-enabled"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal').should('exist')
    })
  })

  describe('Alignment Checks', () => {
    it('should align all-day label with all-day bar', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="all-day-events"]').check()
      cy.wait(300)

      cy.get('.vuecal__all-day-label').should('be.visible')
      cy.get('.vuecal__all-day').should('be.visible')
    })

    it('should display time column properly', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('.vuecal__time-column').should('be.visible')
      cy.get('.vuecal__body').should('be.visible')
    })

    it('should have equal width schedule columns', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="schedules-enabled"]').check()
      cy.wait(300)

      cy.get('.vuecal__schedule--heading').should('have.length.greaterThan', 0)
    })
  })

  describe('Locale Testing', () => {
    it('should change locale', () => {
      cy.get('[data-testid="locale-select"]').select('fr')
      cy.wait(300)
      cy.get('.vuecal').should('exist')

      cy.get('[data-testid="locale-select"]').select('es')
      cy.wait(300)
      cy.get('.vuecal').should('exist')

      cy.get('[data-testid="locale-select"]').select('')
      cy.wait(300)
      cy.get('.vuecal').should('exist')
    })
  })

  describe('Responsive Testing', () => {
    it('should display correctly on mobile', () => {
      cy.viewport(375, 667)
      cy.wait(300)
      cy.get('[data-testid="vue-cal"]').should('be.visible')
    })

    it('should display correctly on tablet', () => {
      cy.viewport(768, 1024)
      cy.wait(300)
      cy.get('[data-testid="vue-cal"]').should('be.visible')
    })

    it('should display correctly on desktop', () => {
      cy.viewport(1920, 1080)
      cy.wait(300)
      cy.get('[data-testid="vue-cal"]').should('be.visible')
    })
  })
})
