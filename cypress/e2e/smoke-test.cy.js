/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/test-comprehensive', { timeout: 5000 })
  cy.wait(600) // Allow async events and fetchEvents to load.
})

describe('Global Rendering', () => {
  it('should display the side panel and the calendar in the page', () => {
    cy.get('.controls-panel').should('be.visible')
    cy.get('.vuecal').should('be.visible')
  })

  it('should have view switcher buttons in the header', () => {
    cy.get('.vuecal__views-bar').should('be.visible')
    cy.get('.vuecal__view-button').should('have.length', 6)
  })

  it('should have navigation controls in the header', () => {
    cy.get('.vuecal__nav--prev').should('be.visible')
    cy.get('.vuecal__nav--next').should('be.visible')
    cy.get('.vuecal__nav--today').should('be.visible')
  })

  it('should display the view title in the header', () => {
    cy.get('.vuecal__title-bar').should('be.visible')
    cy.get('.vuecal__title').should('be.visible').and('not.be.empty')
  })

  it('should display scrollable wrap with time column, headings and body', () => {
    cy.get('.vuecal__scrollable-wrap').should('be.visible')
    cy.get('.vuecal__time-column').should('be.visible')
    cy.get('.vuecal__time-column .vuecal__time-cell').should('have.length.greaterThan', 0)
    cy.get('.vuecal__headings').should('be.visible')
    cy.get('.vuecal__headings .vuecal__weekday').should('have.length', 7)
    cy.get('.vuecal__body').should('be.visible')
    cy.get('.vuecal__body .vuecal__cell').should('have.length.greaterThan', 0)
    cy.get('.vuecal__cell-events').should('be.visible')
  })

  it('should have week view active by default with today cell and now line', () => {
    cy.get('.vuecal').should('have.class', 'vuecal--week-view')
    cy.get('.vuecal__scrollable').should('have.class', 'vuecal__scrollable--week-view')
    cy.get('.vuecal__cell--today').should('be.visible')
    cy.get('.vuecal__now-line').scrollIntoView().should('be.visible')
    const hhmm = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    cy.get('.vuecal__now-line').should('have.attr', 'title', hhmm)
  })

  it('should display events', () => {
    cy.get('.vuecal__event', { timeout: 5000 }).should('have.length.greaterThan', 0)
    cy.get('.vuecal__event').first().should('contain', 'Event')
  })
})

describe('Switching views', () => {
  it('should switch views from view buttons and update scrollable class', () => {
    // View buttons order: Day(0), Days(1), Week(2), Month(3), Year(4), Years(5).
    cy.get('.vuecal__view-button').eq(3).click() // Month.
    cy.wait(300)
    cy.get('.vuecal').should('have.class', 'vuecal--month-view')
    cy.get('.vuecal__scrollable').should('have.class', 'vuecal__scrollable--month-view')

    cy.get('.vuecal__view-button').eq(0).click() // Day.
    cy.wait(300)
    cy.get('.vuecal').should('have.class', 'vuecal--day-view')
    cy.get('.vuecal__scrollable').should('have.class', 'vuecal__scrollable--day-view')

    cy.get('.vuecal__view-button').eq(2).click() // Week.
    cy.wait(300)
    cy.get('.vuecal').should('have.class', 'vuecal--week-view')
    cy.get('.vuecal__scrollable').should('have.class', 'vuecal__scrollable--week-view')
  })

  it('should navigate earlier and later with arrow buttons', () => {
    cy.get('.vuecal__title').invoke('text').then((originalTitle) => {
      cy.get('.vuecal__nav--next').click()
      cy.wait(300)
      cy.get('.vuecal__title').invoke('text').should('not.equal', originalTitle)
    })

    cy.get('.vuecal__title').invoke('text').then((afterNext) => {
      cy.get('.vuecal__nav--prev').click()
      cy.wait(300)
      cy.get('.vuecal__title').invoke('text').should('not.equal', afterNext)
    })
  })

  it('should click today button to return to page containing today, then button is disabled with active class', () => {
    // Navigate away from today first.
    cy.get('.vuecal__nav--next').click()
    cy.wait(300)
    cy.get('.vuecal__cell--today').should('not.exist')

    // Click today button.
    cy.get('.vuecal__nav--today').click()
    cy.wait(300)
    cy.get('.vuecal__cell--today').should('be.visible')

    // Today button should be disabled and have active class.
    cy.get('.vuecal__nav--today').should('have.class', 'vuecal__nav--active')
    cy.get('.vuecal__nav--today').should('be.disabled')
  })
})
