// ***********************************************
// Custom commands for Vue Cal E2E testing
// ***********************************************

// Command to wait for Vue Cal to be ready
Cypress.Commands.add('waitForVueCal', () => {
  cy.get('.vuecal--ready', { timeout: 10000 }).should('exist')
})

// Command to check if element is visible in viewport
Cypress.Commands.add('isInViewport', { prevSubject: true }, (subject) => {
  const rect = subject[0].getBoundingClientRect()

  expect(rect.top).to.be.at.least(0)
  expect(rect.left).to.be.at.least(0)
  expect(rect.bottom).to.be.at.most(Cypress.config('viewportHeight'))
  expect(rect.right).to.be.at.most(Cypress.config('viewportWidth'))

  return subject
})

// Command to check alignment between two elements
Cypress.Commands.add('checkAlignment', (element1Selector, element2Selector, alignmentType = 'top') => {
  cy.get(element1Selector).then($el1 => {
    cy.get(element2Selector).then($el2 => {
      const rect1 = $el1[0].getBoundingClientRect()
      const rect2 = $el2[0].getBoundingClientRect()

      switch (alignmentType) {
        case 'top':
          expect(Math.abs(rect1.top - rect2.top)).to.be.lessThan(2)
          break
        case 'bottom':
          expect(Math.abs(rect1.bottom - rect2.bottom)).to.be.lessThan(2)
          break
        case 'left':
          expect(Math.abs(rect1.left - rect2.left)).to.be.lessThan(2)
          break
        case 'right':
          expect(Math.abs(rect1.right - rect2.right)).to.be.lessThan(2)
          break
        case 'verticalCenter':
          const center1 = rect1.top + rect1.height / 2
          const center2 = rect2.top + rect2.height / 2
          expect(Math.abs(center1 - center2)).to.be.lessThan(2)
          break
        case 'horizontalCenter':
          const hCenter1 = rect1.left + rect1.width / 2
          const hCenter2 = rect2.left + rect2.width / 2
          expect(Math.abs(hCenter1 - hCenter2)).to.be.lessThan(2)
          break
      }
    })
  })
})

// Command to simulate drag and drop
Cypress.Commands.add('dragAndDrop', { prevSubject: 'element' }, (subject, targetSelector, options = {}) => {
  const dataTransfer = new DataTransfer()

  cy.wrap(subject)
    .trigger('mousedown', { which: 1, force: true })
    .trigger('dragstart', { dataTransfer, force: true })

  cy.get(targetSelector)
    .trigger('dragenter', { dataTransfer, force: true })
    .trigger('dragover', { dataTransfer, force: true })
    .trigger('drop', { dataTransfer, force: true })

  cy.wrap(subject)
    .trigger('dragend', { dataTransfer, force: true })
    .trigger('mouseup', { which: 1, force: true })

  return cy.wrap(subject)
})

// Command to simulate touch drag
Cypress.Commands.add('touchDrag', { prevSubject: 'element' }, (subject, deltaX, deltaY) => {
  const rect = subject[0].getBoundingClientRect()
  const startX = rect.left + rect.width / 2
  const startY = rect.top + rect.height / 2

  cy.wrap(subject)
    .trigger('touchstart', {
      touches: [{ clientX: startX, clientY: startY }],
      force: true
    })
    .trigger('touchmove', {
      touches: [{ clientX: startX + deltaX / 2, clientY: startY + deltaY / 2 }],
      force: true
    })
    .trigger('touchmove', {
      touches: [{ clientX: startX + deltaX, clientY: startY + deltaY }],
      force: true
    })
    .trigger('touchend', { force: true })

  return cy.wrap(subject)
})

// Command to check event position and size
Cypress.Commands.add('checkEventBounds', { prevSubject: 'element' }, (subject, expectedBounds) => {
  const rect = subject[0].getBoundingClientRect()

  if (expectedBounds.top !== undefined) {
    expect(Math.abs(rect.top - expectedBounds.top)).to.be.lessThan(5)
  }
  if (expectedBounds.left !== undefined) {
    expect(Math.abs(rect.left - expectedBounds.left)).to.be.lessThan(5)
  }
  if (expectedBounds.width !== undefined) {
    expect(Math.abs(rect.width - expectedBounds.width)).to.be.lessThan(5)
  }
  if (expectedBounds.height !== undefined) {
    expect(Math.abs(rect.height - expectedBounds.height)).to.be.lessThan(5)
  }

  return cy.wrap(subject)
})

// Command to get cell by date
Cypress.Commands.add('getCellByDate', (date) => {
  return cy.get(`.vuecal__cell[data-date*="${date}"]`)
})

// Command to create event by dragging in cell
Cypress.Commands.add('createEventByDrag', (cellSelector, startY, endY) => {
  cy.get(cellSelector).then($cell => {
    const rect = $cell[0].getBoundingClientRect()
    const startX = rect.left + rect.width / 2

    cy.get(cellSelector)
      .trigger('mousedown', { clientX: startX, clientY: startY, force: true })
      .trigger('mousemove', { clientX: startX, clientY: endY, force: true })
      .trigger('mouseup', { clientX: startX, clientY: endY, force: true })
  })
})
