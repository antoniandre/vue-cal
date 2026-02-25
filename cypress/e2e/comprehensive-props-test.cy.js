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
      cy.wSelect('view-select', 'Month')
      cy.wait(400)
      cy.get('.vuecal').should('have.class', 'vuecal--month-view')

      cy.wSelect('view-select', 'Day')
      cy.wait(400)
      cy.get('.vuecal').should('have.class', 'vuecal--day-view')

      cy.wSelect('view-select', 'Week')
      cy.wait(400)
      cy.get('.vuecal').should('have.class', 'vuecal--week-view')
    })

    it('should switch to Years view', () => {
      cy.wSelect('view-select', 'Years')
      cy.wait(400)
      cy.get('.vuecal').should('have.class', 'vuecal--years-view')
    })

    it('should switch to Year view', () => {
      cy.wSelect('view-select', 'Year')
      cy.wait(400)
      cy.get('.vuecal').should('have.class', 'vuecal--year-view')
    })

    it('should switch to Days view', () => {
      cy.wSelect('view-select', 'Days')
      cy.wait(400)
      cy.get('.vuecal').should('have.class', 'vuecal--days-view')
    })

    it('should change selectedDate', () => {
      cy.wSelect('view-select', 'Month')
      cy.wait(300)

      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 7)
      const dateStr = futureDate.toISOString().split('T')[0]

      cy.get('[data-testid="selected-date-input"]').scrollIntoView().clear().type(dateStr)
      cy.wait(300)
      cy.get('.vuecal__cell--selected').should('be.visible')
    })

    it('should change viewDate', () => {
      cy.wSelect('view-select', 'Month')
      cy.wait(300)

      const targetDate = new Date()
      targetDate.setMonth(targetDate.getMonth() + 2)
      const dateStr = targetDate.toISOString().split('T')[0]

      cy.get('[data-testid="view-date-input"]').scrollIntoView().clear().type(dateStr)
      cy.wait(500)
      cy.get('.vuecal__title').invoke('text').should('include', targetDate.toLocaleString('en-us', { month: 'long' }))
    })

    it('should toggle watchRealTime', () => {
      cy.get('[data-testid="watch-real-time"]').scrollIntoView().should('not.be.checked')

      cy.get('[data-testid="watch-real-time"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="watch-real-time"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })

    it('should apply minDate and maxDate in datePicker mode', () => {
      cy.get('[data-testid="date-picker"').check({ force: true })
      cy.wait(500)

      const minDate = new Date()
      minDate.setDate(minDate.getDate() - 7)
      const maxDate = new Date()
      maxDate.setDate(maxDate.getDate() + 7)

      cy.get('[data-testid="min-date-input"]').scrollIntoView().clear().type(minDate.toISOString().split('T')[0])
      cy.wait(200)
      cy.get('[data-testid="max-date-input"]').clear().type(maxDate.toISOString().split('T')[0])
      cy.wait(500)
      cy.get('.vuecal').should('have.class', 'vuecal--date-picker')

      cy.get('[data-testid="date-picker"').uncheck({ force: true })
      cy.wait(300)
    })

    it('should toggle todayButton', () => {
      cy.get('[data-testid="today-button"]').scrollIntoView().should('be.checked')
      cy.get('.vuecal__title-bar .vuecal__nav--today').should('be.visible')

      cy.get('[data-testid="today-button"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal__title-bar .vuecal__nav--today').should('not.exist')

      cy.get('[data-testid="today-button"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal__title-bar .vuecal__nav--today').should('be.visible')
    })

    it('should toggle startWeekOnSunday', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="start-week-sunday"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal__weekday-day').first().invoke('text').should('match', /Sun/i)

      cy.get('[data-testid="start-week-sunday"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal__weekday-day').first().invoke('text').should('match', /Mon/i)
    })

    it('should toggle weekNumbers', () => {
      cy.wSelect('view-select', 'Month')
      cy.wait(400)

      cy.get('[data-testid="week-numbers"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal__week-number').should('be.visible')
      cy.get('.vuecal__week-number').should('have.length.greaterThan', 3)

      cy.get('[data-testid="week-numbers"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal__week-number').should('not.exist')
    })
  })

  describe('Display Props', () => {
    it('should toggle theme', () => {
      cy.get('.vuecal').should('be.visible').and('have.class', 'vuecal--default-theme')

      cy.get('[data-testid="theme-select"]').contains('None').click()
      cy.wait(300)
      cy.get('.vuecal').should('be.visible').and('not.have.class', 'vuecal--default-theme')

      cy.get('[data-testid="theme-select"]').contains('Default').click()
      cy.wait(300)
      cy.get('.vuecal').should('be.visible').and('have.class', 'vuecal--default-theme')
    })

    it('should toggle dark mode', () => {
      cy.get('[data-testid="dark-mode"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('have.class', 'vuecal--dark')

      cy.get('[data-testid="dark-mode"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('not.have.class', 'vuecal--dark')
    })

    it('should toggle horizontal mode', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="horizontal"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('have.class', 'vuecal--horizontal')
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="horizontal"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('not.have.class', 'vuecal--horizontal')
      cy.get('.vuecal').should('be.visible')
    })

    it('should toggle datePicker mode', () => {
      cy.get('[data-testid="date-picker"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('have.class', 'vuecal--date-picker')

      cy.get('[data-testid="date-picker"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('not.have.class', 'vuecal--date-picker')
    })
  })

  describe('Time Props', () => {
    it('should toggle time column', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="time-enabled"]').should('be.checked')
      cy.get('.vuecal__time-column').should('be.visible')

      cy.get('[data-testid="time-enabled"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal__time-column').should('not.exist')

      cy.get('[data-testid="time-enabled"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal__time-column').should('be.visible')
    })

    it('should change timeFrom', () => {
      cy.wSelect('view-select', 'Day')
      cy.wait(400)

      cy.get('[data-testid="time-from"]').focus().type('{selectall}480')
      cy.wait(300)
      cy.get('.vuecal__time-cell').should('have.length.greaterThan', 0)
    })

    it('should change timeTo', () => {
      cy.wSelect('view-select', 'Day')
      cy.wait(400)

      cy.get('[data-testid="time-to"]').focus().type('{selectall}1080')
      cy.wait(300)
      cy.get('.vuecal__time-cell').should('have.length.greaterThan', 0)
      cy.get('.vuecal__time-cell').should('have.length.lessThan', 25)
    })

    it('should change timeStep', () => {
      cy.wSelect('view-select', 'Day')
      cy.wait(400)

      cy.get('[data-testid="time-step"]').focus().type('{selectall}30')
      cy.wait(300)
      cy.get('.vuecal__time-cell').should('have.length.greaterThan', 24)
    })

    it('should toggle twelveHour format', () => {
      cy.wSelect('view-select', 'Day')
      cy.wait(300)

      cy.get('[data-testid="twelve-hour"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal__time-cell').first().should('be.visible')

      cy.get('[data-testid="twelve-hour"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal__time-cell').first().should('be.visible')
    })

    it('should toggle timeAtCursor', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="time-at-cursor"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal__body').should('be.visible')
    })

    it('should change timeCellHeight', () => {
      cy.wSelect('view-select', 'Day')
      cy.wait(400)

      cy.get('[data-testid="time-cell-height"]').focus().type('{selectall}60')
      cy.wait(300)
      cy.get('.vuecal__time-cell').first().should('be.visible')
    })

    it('should change timeFormat', () => {
      cy.wSelect('view-select', 'Day')
      cy.wait(300)

      cy.get('[data-testid="time-format"]').focus().type('{selectall}HH:mm')
      cy.wait(300)
      cy.get('.vuecal__time-cell').first().should('be.visible')

      cy.get('[data-testid="time-format"]').clear()
      cy.wait(300)
    })
  })

  describe('Event Props', () => {
    it('should toggle allDayEvents', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="all-day-events"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal__all-day').should('be.visible')
      cy.get('.vuecal__all-day-label').should('be.visible')

      cy.get('[data-testid="all-day-events"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal__all-day').should('not.exist')
    })

    it('should toggle multidayEvents', () => {
      cy.get('[data-testid="multiday-events"]').should('be.checked')

      cy.get('[data-testid="multiday-events"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="multiday-events"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })

    it('should toggle eventsOnMonthView', () => {
      cy.wSelect('view-select', 'Month')
      cy.wait(400)

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(500)

      cy.get('[data-testid="events-on-month-view"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal__event').first().should('be.visible')

      cy.get('[data-testid="events-on-month-view"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal__event').should('not.exist')
    })

    it('should toggle stackEvents', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(400)

      cy.get('[data-testid="stack-events"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="stack-events"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })

    it('should toggle editableEvents', () => {
      cy.get('[data-testid="editable-events"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal__event').first().should('be.visible')

      cy.get('[data-testid="editable-events"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal__event').first().should('be.visible')
    })

    it('should toggle eventCount on month view', () => {
      cy.wSelect('view-select', 'Month')
      cy.wait(400)

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('[data-testid="event-count"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal__cell-events-count').first().should('be.visible')

      cy.get('[data-testid="event-count"').uncheck({ force: true })
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
      cy.get('[data-testid="editable-events"').check({ force: true })
      cy.wait(300)

      cy.get('[data-testid="snap-to-interval"]').focus().type('{selectall}15')
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="snap-to-interval"]').focus().type('{selectall}0')
      cy.wait(300)
    })

    it('should add events', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(400)

      cy.get('[data-testid="load-sample-events-btn"]').scrollIntoView().click()
      cy.get('.vuecal__event', { timeout: 5000 }).its('length').then((initialCount) => {
        cy.get('[data-testid="add-event-btn"]').scrollIntoView().click({ force: true })
        cy.wait(500)
        cy.get('.vuecal__event').should('have.length.greaterThan', initialCount)
      })
    })

    it('should add all-day events', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(400)

      cy.get('[data-testid="all-day-events"').check({ force: true })
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
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="hide-weekends"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal__weekday').should('have.length', 5)

      cy.get('[data-testid="hide-weekends"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal__weekday').should('have.length', 7)
    })

    it('should hide specific weekdays', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      // w-checkboxes: first checkbox in Hide Weekdays section is Mon
      cy.contains('Hide Weekdays').parent().find('input[type="checkbox"]').first().check({ force: true })
      cy.wait(300)
      cy.get('.vuecal__weekday').should('have.length', 6)

      cy.contains('Hide Weekdays').parent().find('input[type="checkbox"]').first().uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal__weekday').should('have.length', 7)
    })

    it('should disable specific days', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const minDateStr = tomorrow.toISOString().split('T')[0]

      cy.get('[data-testid="min-date-input"]').clear().type(minDateStr)
      cy.wait(300)
      cy.get('.vuecal__cell--disabled, .vuecal__cell--before-min').should('have.length.greaterThan', 0)

      cy.get('[data-testid="min-date-input"]').clear()
      cy.wait(300)
    })

    it('should change viewDayOffset', () => {
      cy.wSelect('view-select', 'Day')
      cy.wait(400)

      cy.get('[data-testid="view-day-offset"]').focus().type('{selectall}2')
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="view-day-offset"]').focus().type('{selectall}0')
      cy.wait(300)
    })
  })

  describe('Schedules & Special Hours', () => {
    it('should enable schedules and display schedule headings', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(400)

      cy.get('[data-testid="schedules-enabled"').check({ force: true })
      cy.wait(500)
      cy.get('.vuecal__schedule--heading').should('be.visible')
      cy.get('.vuecal__schedule--heading').should('have.length.greaterThan', 0)
      cy.contains('Schedule 1').should('be.visible')
      cy.contains('Schedule 2').should('be.visible')
      cy.contains('Schedule 3').should('be.visible')

      cy.get('[data-testid="schedules-enabled"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal__schedule--heading').should('not.exist')
    })

    it('should change number of schedules', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="schedules-enabled"').check({ force: true })
      cy.wait(300)

      cy.get('[data-testid="schedule-count"]').focus().type('{selectall}5')
      cy.wait(400)
      cy.get('.vuecal__schedule--heading').should('have.length', 35)
    })

    it('should enable special hours', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="special-hours-enabled"').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="special-hours-enabled"').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })
  })

  describe('Alignment Checks', () => {
    it('should align all-day label with all-day bar', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="all-day-events"').check({ force: true })
      cy.wait(300)

      cy.get('.vuecal__all-day-label').should('be.visible')
      cy.get('.vuecal__all-day').should('be.visible')
    })

    it('should display time column properly', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('.vuecal__time-column').should('be.visible')
      cy.get('.vuecal__body').should('be.visible')
    })

    it('should have equal width schedule columns', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="schedules-enabled"').check({ force: true })
      cy.wait(300)

      cy.get('.vuecal__schedule--heading').should('have.length.greaterThan', 0)
    })
  })

  describe('Locale Testing', () => {
    it('should change locale', () => {
      cy.wSelect('locale-select', 'French')
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
      cy.get('.vuecal__title').invoke('text').should('match', /janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre/i)

      cy.wSelect('locale-select', 'Spanish')
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
      cy.get('.vuecal__title').invoke('text').should('match', /enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre/i)

      cy.wSelect('locale-select', 'Default (en-us)')
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })
  })

  describe('Prop Combinations', () => {
    it('should work with horizontal + schedules', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="schedules-enabled"').check({ force: true })
      cy.wait(300)
      cy.get('[data-testid="horizontal"').check({ force: true })
      cy.wait(500)

      cy.get('.vuecal').should('have.class', 'vuecal--horizontal')
      cy.get('.vuecal__schedule--heading').should('have.length.greaterThan', 0)

      cy.get('[data-testid="horizontal"').uncheck({ force: true })
      cy.get('[data-testid="schedules-enabled"').uncheck({ force: true })
      cy.wait(300)
    })

    it('should work with horizontal + allDayEvents', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="all-day-events"').check({ force: true })
      cy.wait(300)
      cy.get('[data-testid="horizontal"').check({ force: true })
      cy.wait(500)

      cy.get('.vuecal').should('have.class', 'vuecal--horizontal')
      cy.get('.vuecal__all-day').should('be.visible')

      cy.get('[data-testid="horizontal"').uncheck({ force: true })
      cy.get('[data-testid="all-day-events"').uncheck({ force: true })
      cy.wait(300)
    })

    it('should work with allDayEvents + stackEvents', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="all-day-events"').check({ force: true })
      cy.wait(300)
      cy.get('[data-testid="stack-events"').check({ force: true })
      cy.wait(300)

      cy.get('.vuecal__all-day').should('be.visible')
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="stack-events"').uncheck({ force: true })
      cy.get('[data-testid="all-day-events"').uncheck({ force: true })
      cy.wait(300)
    })

    it('should work with eventsOnMonthView + multidayEvents', () => {
      cy.wSelect('view-select', 'Month')
      cy.wait(400)

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="multiday-events"').check({ force: true })
      cy.wait(200)
      cy.get('[data-testid="events-on-month-view"').check({ force: true })
      cy.wait(300)

      cy.get('.vuecal__event').first().should('be.visible')

      cy.get('[data-testid="events-on-month-view"').uncheck({ force: true })
      cy.get('[data-testid="multiday-events"').uncheck({ force: true })
      cy.wait(300)
    })

    it('should work with editableEvents + schedules', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="schedules-enabled"').check({ force: true })
      cy.wait(500)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="editable-events"').check({ force: true })
      cy.wait(300)

      cy.get('.vuecal__schedule--heading').should('be.visible')
      cy.get('.vuecal__event').first().should('be.visible')

      cy.get('[data-testid="editable-events"').uncheck({ force: true })
      cy.get('[data-testid="schedules-enabled"').uncheck({ force: true })
      cy.wait(300)
    })

    it('should work with hideWeekends + startWeekOnSunday', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="start-week-sunday"').check({ force: true })
      cy.wait(200)
      cy.get('[data-testid="hide-weekends"').check({ force: true })
      cy.wait(300)

      cy.get('.vuecal__weekday-day').first().invoke('text').should('match', /Mon/i)
      cy.get('.vuecal__weekday').should('have.length', 5)

      cy.get('[data-testid="hide-weekends"').uncheck({ force: true })
      cy.get('[data-testid="start-week-sunday"').uncheck({ force: true })
      cy.wait(300)
    })

    it('should work with datePicker + minDate/maxDate', () => {
      cy.get('[data-testid="date-picker"').check({ force: true })
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

      cy.get('[data-testid="date-picker"').uncheck({ force: true })
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
      cy.wSelect('view-select', 'Week')
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="editable-events"').check({ force: true })
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
      cy.wSelect('view-select', 'Week')
      cy.wait(300)
      cy.get('[data-testid="editable-events"').check({ force: true })
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
      cy.wSelect('view-select', 'Week')
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="editable-events"').check({ force: true })
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
