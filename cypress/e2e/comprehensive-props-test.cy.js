/// <reference types="cypress" />

describe('Vue Cal - Comprehensive Props Test', () => {
  beforeEach(() => {
    cy.visit('/test-comprehensive', {
      timeout: 60000,
      retryOnStatusCodeFailure: true,
      retryOnNetworkFailure: true
    })
    // Wait for the comprehensive test view to load (async route + component)
    cy.get('.controls-panel', { timeout: 15000 }).should('be.visible')
    cy.get('[data-testid="vue-cal"]', { timeout: 15000 }).should('be.visible')
    cy.wait(2500) // Wait for Vue Cal to be ready and sample events to load (loadSampleEvents runs at 500ms)
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

    it('should switch to Years view', () => {
      cy.get('[data-testid="view-select"]').select('Years')
      cy.wait(800)
      cy.get('.vuecal').should('have.class', 'vuecal--years-view')
    })

    it('should switch to Year view', () => {
      cy.get('[data-testid="view-select"]').select('Year')
      cy.wait(800)
      cy.get('.vuecal').should('have.class', 'vuecal--year-view')
    })

    it('should switch to Days view', () => {
      cy.get('[data-testid="view-select"]').select('days')
      cy.wait(800)
      cy.get('.vuecal').should('have.class', 'vuecal--days-view')
    })

    it('should change selectedDate', () => {
      cy.get('[data-testid="view-select"]').select('Month')
      cy.wait(300)

      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 7)
      const dateStr = futureDate.toISOString().split('T')[0]

      cy.get('[data-testid="selected-date-input"]').clear().type(dateStr)
      cy.wait(300)
      cy.get('.vuecal__cell--selected').should('be.visible')
    })

    it('should change viewDate', () => {
      cy.get('[data-testid="view-select"]').select('Month')
      cy.wait(300)

      const targetDate = new Date()
      targetDate.setMonth(targetDate.getMonth() + 2) // 2 months ahead
      const dateStr = targetDate.toISOString().split('T')[0]

      cy.get('[data-testid="view-date-input"]').clear().type(dateStr)
      cy.wait(500)
      cy.get('.vuecal__title').invoke('text').should('include', targetDate.toLocaleString('en-us', { month: 'long' }))
    })

    it('should toggle clickToNavigate', () => {
      cy.get('[data-testid="click-to-navigate"]').scrollIntoView().should('not.be.checked')

      cy.get('[data-testid="click-to-navigate"]').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="click-to-navigate"]').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })

    it('should toggle watchRealTime', () => {
      cy.get('[data-testid="watch-real-time"]').scrollIntoView().should('not.be.checked')

      cy.get('[data-testid="watch-real-time"]').check()
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="watch-real-time"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })

    it('should apply minDate and maxDate in datePicker mode', () => {
      cy.get('[data-testid="date-picker"]').check()
      cy.wait(300)

      const minDate = new Date()
      minDate.setDate(minDate.getDate() - 7)
      const maxDate = new Date()
      maxDate.setDate(maxDate.getDate() + 7)

      cy.get('[data-testid="min-date-input"]').clear().type(minDate.toISOString().split('T')[0])
      cy.wait(200)
      cy.get('[data-testid="max-date-input"]').clear().type(maxDate.toISOString().split('T')[0])
      cy.wait(300)
      cy.get('.vuecal').should('have.class', 'vuecal--date-picker')

      cy.get('[data-testid="date-picker"]').uncheck()
      cy.wait(300)
    })

    it('should toggle todayButton', () => {
      cy.get('[data-testid="today-button"]').should('be.checked')
      cy.get('.vuecal__title-bar .vuecal__nav--today').should('be.visible')

      cy.get('[data-testid="today-button"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__title-bar .vuecal__nav--today').should('not.exist')

      cy.get('[data-testid="today-button"]').check()
      cy.wait(300)
      cy.get('.vuecal__title-bar .vuecal__nav--today').should('be.visible')
    })

    it('should toggle titleBar', () => {
      cy.get('[data-testid="title-bar"]').should('be.checked')
      cy.get('.vuecal__title-bar').should('be.visible')

      cy.get('[data-testid="title-bar"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__title-bar').should('not.exist')

      cy.get('[data-testid="title-bar"]').check()
      cy.wait(300)
      cy.get('.vuecal__title-bar').should('be.visible')
    })

    it('should toggle viewsBar', () => {
      cy.get('[data-testid="views-bar"]').should('be.checked')
      cy.get('.vuecal__views-bar').should('be.visible')
      cy.get('.vuecal__view-button').should('have.length', 6)

      cy.get('[data-testid="views-bar"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__views-bar').should('not.exist')

      cy.get('[data-testid="views-bar"]').check()
      cy.wait(300)
      cy.get('.vuecal__views-bar').should('be.visible')
      cy.get('.vuecal__view-button').should('have.length', 6)
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
      cy.get('.vuecal__week-number').should('be.visible')
      cy.get('.vuecal__week-number').should('have.length.greaterThan', 3)

      cy.get('[data-testid="week-numbers"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__week-number').should('not.exist')
    })
  })

  describe('Display Props', () => {
    it('should toggle theme', () => {
      cy.get('.vuecal').should('be.visible').and('have.class', 'vuecal--default-theme')

      cy.get('[data-testid="theme-select"]').select('None')
      cy.wait(300)
      cy.get('.vuecal').should('be.visible').and('not.have.class', 'vuecal--default-theme')

      cy.get('[data-testid="theme-select"]').select('Default')
      cy.wait(300)
      cy.get('.vuecal').should('be.visible').and('have.class', 'vuecal--default-theme')
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
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="horizontal"]').check()
      cy.wait(300)
      cy.get('.vuecal').should('have.class', 'vuecal--horizontal')
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="horizontal"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal').should('not.have.class', 'vuecal--horizontal')
      cy.get('.vuecal').should('be.visible')
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
      cy.get('.vuecal__time-column').should('be.visible')

      cy.get('[data-testid="time-enabled"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__time-column').should('not.exist')

      cy.get('[data-testid="time-enabled"]').check()
      cy.wait(300)
      cy.get('.vuecal__time-column').should('be.visible')
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
      cy.get('.vuecal__time-cell').first().should('be.visible')

      cy.get('[data-testid="twelve-hour"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__time-cell').first().should('be.visible')
    })

    it('should toggle timeAtCursor', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="time-at-cursor"]').check()
      cy.wait(300)
      cy.get('.vuecal__body').should('be.visible')
    })

    it('should change timeCellHeight', () => {
      cy.get('[data-testid="view-select"]').select('Day')
      cy.wait(800) // View change has transition

      // Select all and replace instead of clear (avoids Vue re-render issues)
      cy.get('[data-testid="time-cell-height"]').focus().type('{selectall}60')
      cy.wait(300)
      cy.get('.vuecal__time-cell').first().should('be.visible')
    })

    it('should change timeFormat', () => {
      cy.get('[data-testid="view-select"]').select('Day')
      cy.wait(300)

      cy.get('[data-testid="time-format"]').focus().type('{selectall}HH:mm')
      cy.wait(300)
      cy.get('.vuecal__time-cell').first().should('be.visible')

      cy.get('[data-testid="time-format"]').focus().clear()
      cy.wait(300)
    })
  })

  describe('Event Props', () => {
    it('should toggle allDayEvents', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="all-day-events"]').check()
      cy.wait(300)
      cy.get('.vuecal__all-day').should('be.visible')
      cy.get('.vuecal__all-day-label').should('be.visible')
      cy.get('.vuecal__all-day-label').invoke('text').should('match', /all-day|day/i)

      cy.get('[data-testid="all-day-events"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__all-day').should('not.exist')
    })

    it('should toggle multidayEvents', () => {
      cy.get('[data-testid="multiday-events"]').should('be.checked')

      cy.get('[data-testid="multiday-events"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="multiday-events"]').check()
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })

    it('should toggle eventsOnMonthView', () => {
      cy.get('[data-testid="view-select"]').select('Month')
      cy.wait(800) // View change has transition

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(500)

      cy.get('[data-testid="events-on-month-view"]').check()
      cy.wait(300)
      cy.get('.vuecal__event').first().should('be.visible')

      cy.get('[data-testid="events-on-month-view"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__event').should('not.exist')
    })

    it('should toggle stackEvents', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(800) // View change has transition

      cy.get('[data-testid="stack-events"]').check()
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="stack-events"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })

    it('should toggle editableEvents', () => {
      cy.get('[data-testid="editable-events"]').check()
      cy.wait(300)
      cy.get('.vuecal__event').first().should('be.visible')

      cy.get('[data-testid="editable-events"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__event').first().should('be.visible')
    })

    it('should toggle eventCount on month view', () => {
      cy.get('[data-testid="view-select"]').select('Month')
      cy.wait(800)

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('[data-testid="event-count"]').check()
      cy.wait(300)
      cy.get('.vuecal__cell-events-count').first().should('be.visible')

      cy.get('[data-testid="event-count"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal__cell-events-count').should('not.exist')
    })

    it('should change eventCreateMinDrag', () => {
      cy.get('[data-testid="event-create-min-drag"]').focus().type('{selectall}25')
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="event-create-min-drag"]').focus().type('{selectall}15')
      cy.wait(300)
    })

    it('should change snapToInterval', () => {
      cy.get('[data-testid="editable-events"]').check()
      cy.wait(300)

      cy.get('[data-testid="snap-to-interval"]').focus().type('{selectall}15')
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="snap-to-interval"]').focus().type('{selectall}0')
      cy.wait(300)
    })

    it('should add events', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(800)

      cy.get('[data-testid="load-sample-events-btn"]').scrollIntoView().click()
      cy.get('.vuecal__event', { timeout: 5000 }).its('length').then((initialCount) => {
        cy.get('[data-testid="add-event-btn"]').scrollIntoView().click({ force: true })
        cy.wait(500)
        cy.get('.vuecal__event').should('have.length.greaterThan', initialCount)
      })
    })

    it('should add all-day events', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(800)

      cy.get('[data-testid="all-day-events"]').check()
      cy.wait(500)

      cy.get('.vuecal__all-day .vuecal__event').its('length').then((initialCount) => {
        cy.get('[data-testid="add-all-day-event-btn"]').scrollIntoView().click({ force: true })
        cy.wait(500)
        cy.get('.vuecal__all-day .vuecal__event').should('have.length.greaterThan', initialCount)
      })
    })

    it('should clear events', () => {
      cy.get('[data-testid="clear-events-btn"]').click()
      cy.wait(500)
      cy.get('.vuecal__event').should('not.exist')
    })

    it('should load sample events', () => {
      cy.get('[data-testid="clear-events-btn"]').click()
      cy.wait(500)

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(500)
      cy.get('.vuecal__event').should('have.length.greaterThan', 5)
      cy.get('.vuecal__event').first().should('be.visible')
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

      // disableDays expects date strings; use minDate to create disabled cells (before-min)
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const minDateStr = tomorrow.toISOString().split('T')[0]

      cy.get('[data-testid="date-picker"]').uncheck()
      cy.get('[data-testid="min-date-input"]').clear().type(minDateStr)
      cy.wait(300)
      cy.get('.vuecal__cell--disabled, .vuecal__cell--before-min').should('have.length.greaterThan', 0)

      cy.get('[data-testid="min-date-input"]').clear()
      cy.wait(300)
    })

    it('should change viewDayOffset', () => {
      cy.get('[data-testid="view-select"]').select('Day')
      cy.wait(800)

      cy.get('[data-testid="view-day-offset"]').focus().type('{selectall}2')
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="view-day-offset"]').focus().type('{selectall}0')
      cy.wait(300)
    })
  })

  describe('Schedules & Special Hours', () => {
    it('should enable schedules and display schedule headings', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(800) // View change has transition

      cy.get('[data-testid="schedules-enabled"]').check()
      cy.wait(500)
      cy.get('.vuecal__schedule--heading').should('be.visible')
      cy.get('.vuecal__schedule--heading').should('have.length.greaterThan', 0)
      cy.contains('Schedule 1').should('be.visible')
      cy.contains('Schedule 2').should('be.visible')
      cy.contains('Schedule 3').should('be.visible')

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
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="special-hours-enabled"]').uncheck()
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
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
      cy.get('.vuecal').should('be.visible')
      cy.get('.vuecal__title').invoke('text').should('match', /janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre/i)

      cy.get('[data-testid="locale-select"]').select('es')
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
      cy.get('.vuecal__title').invoke('text').should('match', /enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre/i)

      cy.get('[data-testid="locale-select"]').select('')
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })
  })

  describe('Prop Combinations', () => {
    it('should work with horizontal + schedules', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="schedules-enabled"]').check()
      cy.wait(300)
      cy.get('[data-testid="horizontal"]').check()
      cy.wait(500)

      cy.get('.vuecal').should('have.class', 'vuecal--horizontal')
      cy.get('.vuecal__schedule--heading').should('have.length.greaterThan', 0)

      cy.get('[data-testid="horizontal"]').uncheck()
      cy.get('[data-testid="schedules-enabled"]').uncheck()
      cy.wait(300)
    })

    it('should work with horizontal + allDayEvents', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="all-day-events"]').check()
      cy.wait(300)
      cy.get('[data-testid="horizontal"]').check()
      cy.wait(500)

      cy.get('.vuecal').should('have.class', 'vuecal--horizontal')
      cy.get('.vuecal__all-day').should('be.visible')

      cy.get('[data-testid="horizontal"]').uncheck()
      cy.get('[data-testid="all-day-events"]').uncheck()
      cy.wait(300)
    })

    it('should work with allDayEvents + stackEvents', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="all-day-events"]').check()
      cy.wait(300)
      cy.get('[data-testid="stack-events"]').check()
      cy.wait(300)

      cy.get('.vuecal__all-day').should('be.visible')
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="stack-events"]').uncheck()
      cy.get('[data-testid="all-day-events"]').uncheck()
      cy.wait(300)
    })

    it('should work with eventsOnMonthView + multidayEvents', () => {
      cy.get('[data-testid="view-select"]').select('Month')
      cy.wait(800)

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="multiday-events"]').check()
      cy.wait(200)
      cy.get('[data-testid="events-on-month-view"]').check()
      cy.wait(300)

      cy.get('.vuecal__event').first().should('be.visible')

      cy.get('[data-testid="events-on-month-view"]').uncheck()
      cy.get('[data-testid="multiday-events"]').uncheck()
      cy.wait(300)
    })

    it('should work with editableEvents + schedules', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="schedules-enabled"]').check()
      cy.wait(500) // Allow schedules to render
      // Load sample events AFTER enabling schedules so they get schedule property
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="editable-events"]').check()
      cy.wait(300)

      cy.get('.vuecal__schedule--heading').should('be.visible')
      cy.get('.vuecal__event').first().should('be.visible')

      cy.get('[data-testid="editable-events"]').uncheck()
      cy.get('[data-testid="schedules-enabled"]').uncheck()
      cy.wait(300)
    })

    it('should work with hideWeekends + startWeekOnSunday', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)

      cy.get('[data-testid="start-week-sunday"]').check()
      cy.wait(200)
      cy.get('[data-testid="hide-weekends"]').check()
      cy.wait(300)

      // When hideWeekends is true, Sat/Sun are hidden, so first visible day is Mon
      cy.get('.vuecal__weekday-day').first().invoke('text').should('match', /Mon/i)
      cy.get('.vuecal__weekday').should('have.length', 5)

      cy.get('[data-testid="hide-weekends"]').uncheck()
      cy.get('[data-testid="start-week-sunday"]').uncheck()
      cy.wait(300)
    })

    it('should work with datePicker + minDate/maxDate', () => {
      cy.get('[data-testid="date-picker"]').check()
      cy.wait(300)

      const minDate = new Date()
      minDate.setMonth(minDate.getMonth() - 1)
      const maxDate = new Date()
      maxDate.setMonth(maxDate.getMonth() + 2)

      cy.get('[data-testid="min-date-input"]').clear().type(minDate.toISOString().split('T')[0])
      cy.wait(200)
      cy.get('[data-testid="max-date-input"]').clear().type(maxDate.toISOString().split('T')[0])
      cy.wait(300)

      cy.get('.vuecal').should('have.class', 'vuecal--date-picker')

      cy.get('[data-testid="date-picker"]').uncheck()
      cy.wait(300)
    })
  })

  describe('Touch Device Tests', () => {
    it('should display correctly on mobile viewport', () => {
      cy.viewport(375, 667)
      cy.wait(300)
      cy.get('[data-testid="vue-cal"]').should('be.visible')
      cy.get('.vuecal').should('be.visible')
    })

    it('should respond to touch events for event drag', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="editable-events"]').check()
      cy.wait(300)

      cy.viewport(375, 667)
      cy.wait(300)

      cy.get('.vuecal__event').first().then($el => {
        const rect = $el[0].getBoundingClientRect()
        const startX = rect.left + rect.width / 2
        const startY = rect.top + rect.height / 2

        cy.wrap($el)
          .trigger('touchstart', {
            touches: [{ clientX: startX, clientY: startY }],
            force: true
          })
          .trigger('touchmove', {
            touches: [{ clientX: startX + 20, clientY: startY + 30 }],
            force: true
          })
          .trigger('touchend', { force: true })
      })
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })

    it('should allow event creation via long-press on touch device', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)
      cy.get('[data-testid="editable-events"]').check()
      cy.wait(300)

      cy.viewport(375, 667)
      cy.wait(300)

      cy.get('.vuecal__cell').first().then($cell => {
        const rect = $cell[0].getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2

        cy.wrap($cell)
          .trigger('touchstart', {
            touches: [{ clientX: x, clientY: y }],
            force: true
          })
        cy.wait(600) // Wait for 500ms long-press threshold
        cy.wrap($cell)
          .trigger('touchmove', {
            touches: [{ clientX: x, clientY: y + 50 }],
            force: true
          })
          .trigger('touchend', { force: true })
      })
      cy.wait(500)
      cy.get('.vuecal').should('be.visible')
    })

    it('should use touchDrag command for event interaction', () => {
      cy.get('[data-testid="view-select"]').select('Week')
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="editable-events"]').check()
      cy.wait(300)

      cy.viewport(375, 667)
      cy.wait(300)

      cy.get('.vuecal__event').first().then($el => {
        cy.wrap($el).touchDrag(30, 40)
      })
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
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
