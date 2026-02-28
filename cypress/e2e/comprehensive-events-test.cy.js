/// <reference types="cypress" />

describe('Vue Cal - Events Test', () => {
  beforeEach(() => {
    cy.visit('/test-comprehensive', {
      timeout: 60000,
      retryOnStatusCodeFailure: true,
      retryOnNetworkFailure: true
    })
    cy.get('.controls-panel', { timeout: 15000 }).should('be.visible')
    cy.get('[data-testid="vue-cal"]', { timeout: 15000 }).should('be.visible')
    cy.wait(1500)
  })

  describe('Event Display', () => {
    it('should display timed events in week view', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('.vuecal__event').should('have.length.greaterThan', 5)
      cy.get('.vuecal__event').first().scrollIntoView().should('be.visible')
    })

    it('should display all-day events when enabled', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="all-day-events"]').check({ force: true })
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('.vuecal__all-day').scrollIntoView().should('be.visible')
      cy.get('.vuecal__all-day .vuecal__event').should('have.length.at.least', 1)
    })

    it('should display events on month view when eventsOnMonthView is enabled', () => {
      cy.wSelect('view-select', 'Month')
      cy.wait(300)

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="events-on-month-view"]').check({ force: true })
      cy.wait(300)

      cy.get('.vuecal__event').should('have.length.at.least', 1)
      cy.get('.vuecal__event').first().scrollIntoView().should('be.visible')

      cy.get('[data-testid="events-on-month-view"]').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal__event').should('not.exist')
    })

    it('should display event count on month view when eventCount is enabled', () => {
      cy.wSelect('view-select', 'Month')
      cy.wait(300)

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="event-count"]').check({ force: true })
      cy.wait(300)

      cy.get('.vuecal__cell-events-count').first().scrollIntoView().should('be.visible')

      cy.get('[data-testid="event-count"]').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal__cell-events-count').should('not.exist')
    })

    it('should display multiday events', () => {
      cy.get('[data-testid="multiday-events"]').should('be.checked')
      cy.wSelect('view-select', 'Week')
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('.vuecal__event').should('have.length.at.least', 1)
    })

    it('should stack overlapping events when stackEvents is enabled', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="stack-events"]').check({ force: true })
      cy.wait(300)

      cy.get('.vuecal').should('be.visible')
      cy.get('.vuecal__event').should('have.length.at.least', 1)

      cy.get('[data-testid="stack-events"]').uncheck({ force: true })
      cy.wait(300)
    })

    it('should display events in day view', () => {
      cy.wSelect('view-select', 'Day')
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('.vuecal').should('have.class', 'vuecal--day-view')
      cy.get('.vuecal__event').should('have.length.at.least', 1)
    })

    it('should display events in days view', () => {
      cy.wSelect('view-select', 'Days')
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('.vuecal').should('have.class', 'vuecal--days-view')
      cy.get('.vuecal__event').should('have.length.at.least', 1)
    })

    it('should display timeless events when time is disabled', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="time-enabled"]').uncheck({ force: true })
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('.vuecal').should('not.have.class', 'vuecal--view-has-time')
      cy.get('.vuecal__event').should('have.length.at.least', 1)

      cy.get('[data-testid="time-enabled"]').check({ force: true })
      cy.wait(300)
    })

    it('should respond to event click', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('.vuecal__event').first().scrollIntoView().click({ force: true })
      cy.wait(200)
      cy.get('.vuecal').should('be.visible')
    })
  })

  describe('Event Create - Programmatically', () => {
    it('should add timed event via button', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="load-sample-events-btn"]').scrollIntoView().click()
      cy.get('.vuecal__event', { timeout: 5000 }).its('length').then((initialCount) => {
        cy.get('[data-testid="add-event-btn"]').scrollIntoView().click({ force: true })
        cy.wait(300)
        cy.get('.vuecal__event').should('have.length.greaterThan', initialCount)
      })
    })

    it('should add all-day event via button', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="all-day-events"]').check({ force: true })
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('.vuecal__all-day .vuecal__event').its('length').then((initialCount) => {
        cy.get('[data-testid="add-all-day-event-btn"]').scrollIntoView().click({ force: true })
        cy.wait(300)
        cy.get('.vuecal__all-day .vuecal__event').should('have.length.greaterThan', initialCount)
      })
    })

    it('should add background event via button', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('.vuecal__event', { timeout: 5000 }).its('length').then((initialCount) => {
        cy.get('[data-testid="add-background-event-btn"]').scrollIntoView().click({ force: true })
        cy.wait(300)
        cy.get('.vuecal__event').should('have.length.greaterThan', initialCount)
        cy.get('.vuecal__event.background-event').should('exist')
      })
    })
  })

  describe('Event Create - By Drag', () => {
    it('should create event by dragging in cell', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="editable-events"]').check({ force: true })
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('.vuecal__event', { timeout: 5000 }).its('length').then((initialCount) => {
        cy.get('.vuecal__body .vuecal__cell').first().scrollIntoView().then($cell => {
          const rect = $cell[0].getBoundingClientRect()
          const startX = rect.left + rect.width / 2
          const startY = rect.top + rect.height / 4
          const endY = rect.top + rect.height / 2

          cy.get('.vuecal__body .vuecal__cell').first()
            .trigger('mousedown', { clientX: startX, clientY: startY, which: 1, force: true })
            .trigger('mousemove', { clientX: startX, clientY: endY, force: true })
            .trigger('mouseup', { clientX: startX, clientY: endY, which: 1, force: true })
        })
        cy.wait(300)
        cy.get('.vuecal__event').should('have.length.greaterThan', initialCount)
      })
    })
  })

  describe('Event Delete', () => {
    it('should clear all events', () => {
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('.vuecal__event').should('have.length.greaterThan', 0)

      cy.get('[data-testid="clear-events-btn"]').click()
      cy.wait(300)
      cy.get('.vuecal__event').should('not.exist')
    })

    it('should delete event via double-click and delete button', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="editable-events"]').check({ force: true })
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('.vuecal__event', { timeout: 5000 }).its('length').then((initialCount) => {
        cy.get('.vuecal__event').first().scrollIntoView().dblclick({ force: true })
        cy.wait(300)
        cy.get('.vuecal__event-delete').should('be.visible').click({ force: true })
        cy.wait(300)
        cy.get('.vuecal__event').should('have.length.lessThan', initialCount)
      })
    })
  })

  describe('Event Drag & Drop', () => {
    it('should allow dragging event to different cell', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="editable-events"]').check({ force: true })
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('.vuecal__event').first().scrollIntoView().should('be.visible')
      cy.get('.vuecal__cell:not(.vuecal__all-day)').then($cells => {
        const eventCell = $cells.filter((i, el) => el.querySelector('.vuecal__event'))
        const targetCell = $cells.filter((i, el) => !el.querySelector('.vuecal__event')).first()
        if (targetCell.length && eventCell.length) {
          cy.get('.vuecal__event').first().then($event => {
            const dataTransfer = new DataTransfer()
            cy.wrap($event)
              .trigger('mousedown', { which: 1, force: true })
              .trigger('dragstart', { dataTransfer, force: true })
            cy.wrap(targetCell[0])
              .trigger('dragenter', { dataTransfer, force: true })
              .trigger('dragover', { dataTransfer, force: true })
              .trigger('drop', { dataTransfer, force: true })
            cy.wrap($event)
              .trigger('dragend', { dataTransfer, force: true })
              .trigger('mouseup', { which: 1, force: true })
          })
          cy.wait(300)
        }
      })
      cy.get('.vuecal').should('be.visible')
    })
  })

  describe('Event Resize', () => {
    it('should allow resizing event when editable', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="editable-events"]').check({ force: true })
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('.vuecal__event').first().scrollIntoView().should('be.visible')
      cy.get('.vuecal__event-resizer').first().then($resizer => {
        const rect = $resizer[0].getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2

        cy.wrap($resizer)
          .trigger('mousedown', { clientX: x, clientY: y, which: 1, force: true })
          .trigger('mousemove', { clientX: x, clientY: y + 50, force: true })
          .trigger('mouseup', { clientX: x, clientY: y + 50, which: 1, force: true })
      })
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })
  })

  describe('Layout - Horizontal vs Vertical', () => {
    it('should display events in horizontal layout', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="horizontal"]').check({ force: true })
      cy.wait(300)

      cy.get('.vuecal').should('have.class', 'vuecal--horizontal')
      cy.get('.vuecal__event').should('have.length.at.least', 1)

      cy.get('[data-testid="horizontal"]').uncheck({ force: true })
      cy.wait(300)
    })

    it('should display all-day events in horizontal layout', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="all-day-events"]').check({ force: true })
      cy.wait(300)
      cy.get('[data-testid="horizontal"]').check({ force: true })
      cy.wait(300)

      cy.get('.vuecal').should('have.class', 'vuecal--horizontal')
      cy.get('.vuecal__all-day').scrollIntoView().should('be.visible')

      cy.get('[data-testid="horizontal"]').uncheck({ force: true })
      cy.get('[data-testid="all-day-events"]').uncheck({ force: true })
      cy.wait(300)
    })

    it('should display events in vertical layout (default)', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)

      cy.get('.vuecal').should('not.have.class', 'vuecal--horizontal')
      cy.get('.vuecal__event').should('have.length.at.least', 1)
    })
  })

  describe('Event Prop Combinations', () => {
    it('should work with eventsOnMonthView + multidayEvents', () => {
      cy.wSelect('view-select', 'Month')
      cy.wait(300)

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="multiday-events"]').check({ force: true })
      cy.wait(200)
      cy.get('[data-testid="events-on-month-view"]').check({ force: true })
      cy.wait(300)

      cy.get('.vuecal__event').first().scrollIntoView().should('be.visible')

      cy.get('[data-testid="events-on-month-view"]').uncheck({ force: true })
      cy.get('[data-testid="multiday-events"]').uncheck({ force: true })
      cy.wait(300)
    })

    it('should work with allDayEvents + stackEvents', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="all-day-events"]').check({ force: true })
      cy.wait(300)
      cy.get('[data-testid="stack-events"]').check({ force: true })
      cy.wait(300)

      cy.get('.vuecal__all-day').scrollIntoView().should('be.visible')
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="stack-events"]').uncheck({ force: true })
      cy.get('[data-testid="all-day-events"]').uncheck({ force: true })
      cy.wait(300)
    })

    it('should work with editableEvents + schedules', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)

      cy.get('[data-testid="schedules-enabled"]').check({ force: true })
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="editable-events"]').check({ force: true })
      cy.wait(300)

      cy.get('.vuecal__schedule--heading').should('be.visible')
      cy.get('.vuecal__event').first().scrollIntoView().should('be.visible')

      cy.get('[data-testid="editable-events"]').uncheck({ force: true })
      cy.get('[data-testid="schedules-enabled"]').uncheck({ force: true })
      cy.wait(300)
    })
  })

  describe('Event Editable Props', () => {
    it('should toggle editableEvents', () => {
      cy.get('[data-testid="editable-events"]').check({ force: true })
      cy.wait(300)
      cy.get('.vuecal__event').first().scrollIntoView().should('be.visible')

      cy.get('[data-testid="editable-events"]').uncheck({ force: true })
      cy.wait(300)
      cy.get('.vuecal__event').first().scrollIntoView().should('be.visible')
    })

    it('should change eventCreateMinDrag', () => {
      cy.get('[data-testid="event-create-min-drag"]').focus().type('{selectall}25')
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="event-create-min-drag"]').focus().type('{selectall}15')
      cy.wait(300)
    })

    it('should change snapToInterval', () => {
      cy.get('[data-testid="editable-events"]').check({ force: true })
      cy.wait(300)

      cy.get('[data-testid="snap-to-interval"]').focus().type('{selectall}15')
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')

      cy.get('[data-testid="snap-to-interval"]').focus().type('{selectall}0')
      cy.wait(300)
    })
  })

  describe('Load Sample Events', () => {
    it('should load sample events', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)
      cy.get('[data-testid="clear-events-btn"]').click()
      cy.wait(300)

      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('.vuecal__event').should('have.length.greaterThan', 5)
      cy.get('.vuecal__event').first().scrollIntoView().should('be.visible')
    })
  })

  describe('Touch Device - Events', () => {
    it('should respond to touch events for event drag', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="editable-events"]').check({ force: true })
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
      cy.get('[data-testid="editable-events"]').check({ force: true })
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
        cy.wait(600)
        cy.wrap($cell)
          .trigger('touchmove', {
            touches: [{ clientX: x, clientY: y + 50 }],
            force: true
          })
          .trigger('touchend', { force: true })
      })
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })

    it('should use touchDrag command for event interaction', () => {
      cy.wSelect('view-select', 'Week')
      cy.wait(300)
      cy.get('[data-testid="load-sample-events-btn"]').click()
      cy.wait(300)
      cy.get('[data-testid="editable-events"]').check({ force: true })
      cy.wait(300)

      cy.viewport(375, 667)
      cy.wait(300)

      cy.get('.vuecal__event').first().then($el => cy.wrap($el).touchDrag(30, 40))
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })
  })
})
