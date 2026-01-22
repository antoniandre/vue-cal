// ***********************************************************
// This file is processed and loaded automatically before your test files.
// ***********************************************************

import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test on uncaught exceptions
  return false
})
