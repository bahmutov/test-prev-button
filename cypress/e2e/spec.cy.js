// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { recurse } from 'cypress-recurse'

describe('Verify the recursive', () => {
  it('check the recurse', () => {
    cy.visit('https://www.ncbi.nlm.nih.gov/gene')
    cy.get('#term').type('p53')
    cy.get('#search').click()
    cy.wait(2000)
    cy.get('a').contains('Next').click()
    cy.get('a').contains('Next').click()
    cy.get('a').contains('Next').click() //< Prev
    recurse(
      () => cy.get('a').contains('< Prev').should(Cypress._.noop),
      Cypress._.isEmpty,
      {
        post() {
          cy.get('a').contains('< Prev').click({ force: true })
        },
        delay: 2_000,
        limit: 10,
        timeout: 30_000,
        log: true,
      },
    )
  })
})
