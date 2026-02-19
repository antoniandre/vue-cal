/// <reference types="cypress" />

describe('Vue Cal - Smoke Test', () => {
  beforeEach(() => {
    cy.visit('/test', { timeout: 5000 })
    cy.get('.vuecal', { timeout: 5000 }).should('be.visible')
    cy.get('.vuecal--ready', { timeout: 6000 }).should('exist')
    cy.wait(600) // Allow async events and fetchEvents to load
  })

  it('should load the test page successfully', () => {
    cy.get('.vuecal').should('exist')
    cy.get('.vuecal--ready').should('exist')
  })

  it('should display the calendar with schedules', () => {
    // Check for schedule headings (Room A, B, C)
    cy.contains('Room A').should('be.visible')
    cy.contains('Room B').should('be.visible')
    cy.contains('Room C').should('be.visible')
  })

  it('should display the time column', () => {
    cy.get('.vuecal__time-column').should('be.visible')
    cy.get('.vuecal__time-cell').should('have.length.greaterThan', 0)
  })

  it('should display events', () => {
    cy.get('.vuecal__event', { timeout: 5000 }).should('have.length.greaterThan', 0)
    cy.get('.vuecal__event').first().should('contain', 'Event')
  })

  it('should display weekday headings', () => {
    cy.get('.vuecal__weekday').should('have.length', 7)
  })

  it('should have navigation controls', () => {
    cy.get('.vuecal__nav--prev').should('exist')
    cy.get('.vuecal__nav--next').should('exist')
    cy.contains('Today').should('exist')
  })

  it('should have view switcher buttons', () => {
    cy.contains('Days').should('be.visible')
    cy.contains('Week').should('be.visible')
  })

  it('should have all-day label and bar visible', () => {
    cy.get('.vuecal__scrollable').scrollIntoView()
    cy.get('.vuecal__all-day-label').should('exist')
    cy.get('.vuecal__all-day').should('exist')
  })

  it('should have time column and body', () => {
    cy.get('.vuecal__time-column').should('exist')
    cy.get('.vuecal__body').should('exist')
  })

  it('should have schedule headings', () => {
    cy.get('.vuecal__schedule--heading').should('have.length.greaterThan', 0)
  })

  it('should display all-day label', () => {
    cy.get('.vuecal__all-day-label').should('be.visible')
    cy.get('.vuecal__all-day-label').invoke('text').should('match', /all-day|All-day/i)
  })

  it('should show the now line', () => {
    cy.get('.vuecal__now-line').should('exist')
  })

  describe('Alignment Checks', () => {
    it('should align all-day label with all-day bar', () => {
      cy.get('.vuecal__all-day-label').then($label => {
        cy.get('.vuecal__all-day').then($bar => {
          const labelRect = $label[0].getBoundingClientRect()
          const barRect = $bar[0].getBoundingClientRect()

          // Top alignment should be within 2px
          expect(Math.abs(labelRect.top - barRect.top)).to.be.lessThan(2)
        })
      })
    })

    it('should align time column with body', () => {
      cy.get('.vuecal__time-column').then($timeCol => {
        cy.get('.vuecal__body').then($body => {
          const timeColRect = $timeCol[0].getBoundingClientRect()
          const bodyRect = $body[0].getBoundingClientRect()

          // Should be positioned correctly
          expect(timeColRect.left).to.be.lessThan(bodyRect.left)
        })
      })
    })

    it('should have equal width schedule columns', () => {
      cy.get('.vuecal__schedule--heading').then($schedules => {
        const widths = []
        $schedules.each((i, el) => {
          widths.push(el.getBoundingClientRect().width)
        })

        // All widths should be equal (within 2px tolerance)
        if (widths.length > 1) {
          const firstWidth = widths[0]
          widths.forEach(width => {
            expect(Math.abs(width - firstWidth)).to.be.lessThan(3)
          })
        }
      })
    })
  })

  describe('Interactions', () => {
    it('should toggle theme when clicking Toggle Theme button', () => {
      cy.contains('Toggle Theme').click()
      cy.wait(300)
      cy.get('.vuecal').should('exist')
    })

    it('should switch to Days view', () => {
      cy.contains('button', 'Days').click()
      cy.wait(500)
      cy.get('.vuecal--days-view').should('exist')
    })

    it('should navigate to next week', () => {
      cy.get('.vuecal__title').invoke('text').then((originalTitle) => {
        cy.get('.vuecal__nav--next').click()
        cy.wait(300)
        cy.get('.vuecal__title').invoke('text').should('not.equal', originalTitle)
      })
    })

    it('should navigate to previous week', () => {
      cy.get('.vuecal__title').invoke('text').then((originalTitle) => {
        cy.get('.vuecal__nav--prev').click()
        cy.wait(300)
        cy.get('.vuecal__title').invoke('text').should('not.equal', originalTitle)
      })
    })

    it('should add event when clicking Add event button', () => {
      cy.get('.vuecal__event').its('length').then((initialCount) => {
        cy.contains('button', 'Add event').first().click()
        cy.wait(400)
        cy.get('.vuecal__event').should('have.length.greaterThan', initialCount)
      })
    })

    it('should toggle horizontal mode', () => {
      cy.contains('Horizontal').click()
      cy.wait(400)
      // After toggle, horizontal should be off (it starts as true in test page)
      cy.get('.vuecal').should('not.have.class', 'vuecal--horizontal')

      // Toggle back
      cy.contains('Horizontal').click()
      cy.wait(400)
      cy.get('.vuecal').should('have.class', 'vuecal--horizontal')
    })
  })

  describe('Event Display', () => {
    it('should display event titles', () => {
      cy.get('.vuecal__event').first().should('contain', 'Event')
    })

    it('should display events', () => {
      cy.get('.vuecal__event').should('exist')
    })

    it('should show events in schedule cells', () => {
      cy.get('.vuecal__schedule--cell').should('exist')
    })
  })

  describe('Responsive Behavior', () => {
    it('should display correctly on mobile', () => {
      cy.viewport(375, 667)
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })

    it('should display correctly on tablet', () => {
      cy.viewport(768, 1024)
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
    })

    it('should display correctly on desktop', () => {
      cy.viewport(1920, 1080)
      cy.wait(300)
      cy.get('.vuecal').should('be.visible')
      cy.get('.vuecal__event').should('exist')
    })
  })
})
