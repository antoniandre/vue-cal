/// <reference types="cypress" />

describe('Timezone display', () => {
  beforeEach(() => {
    cy.visit('/test-timezone', { timeout: 10000 })
    cy.get('[data-testid="timezone-test-root"]', { timeout: 15000 }).should('be.visible')
    cy.get('.vuecal', { timeout: 15000 }).should('be.visible')
  })

  it('uses civil day bounds on DST spring-forward (not fixed 24h)', () => {
    cy.get('[data-testid="timezone-test-root"]', { timeout: 15000 })
      .invoke('attr', 'data-cell-span-ms')
      .should('be.a', 'string')
      .then(span => {
        const ms = Number(span)
        expect(ms).to.be.lessThan(24 * 60 * 60 * 1000 - 1)
        expect(ms).to.be.greaterThan(22 * 60 * 60 * 1000)
      })
  })

  it('shows timed event on the correct day column', () => {
    cy.get('.vuecal__scrollable', { timeout: 15000 }).scrollTo('bottom')
    cy.get('.tz-test-event', { timeout: 15000 }).scrollIntoView().should('be.visible')
  })

  it('shows events in day view', () => {
    cy.get('.vuecal__event', { timeout: 15000 }).should('have.length.at.least', 1)
  })

  it('treats exclusive next-midnight all-day end as single day', () => {
    cy.get('[data-testid="timezone-test-root"]')
      .invoke('attr', 'data-exclusive-multiday')
      .should('eq', 'false')
  })

  it('counts civil days across DST with countDays', () => {
    cy.get('[data-testid="timezone-test-root"]')
      .invoke('attr', 'data-count-days-dst')
      .should('eq', '3')
  })

  it('advances week view with one next click (timezone example)', () => {
    cy.visit('/examples/date-and-time#ex--timezone', { timeout: 10000 })
    cy.get('.example--timezone .vuecal', { timeout: 15000 }).should('be.visible')
    cy.get('.example--timezone .vuecal__title').invoke('text').then(title => {
      cy.get('.example--timezone .vuecal__nav--next').click()
      cy.get('.example--timezone .vuecal__title').invoke('text').should('not.equal', title)
    })
  })

  it('advances month view with one next click (timezone example)', () => {
    cy.visit('/examples/date-and-time#ex--timezone', { timeout: 10000 })
    cy.get('.example--timezone .vuecal', { timeout: 15000 }).should('be.visible')
    cy.get('.example--timezone .vuecal__view-button').contains('Month').click()
    cy.get('.example--timezone .vuecal__title').invoke('text').then(title => {
      cy.get('.example--timezone .vuecal__nav--next').click()
      cy.get('.example--timezone .vuecal__title').invoke('text').should('not.equal', title)
    })
  })
})
