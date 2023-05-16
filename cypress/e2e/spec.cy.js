// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { recurse } from 'cypress-recurse'

describe('Verify the recursive', () => {
  it('check the recurse', () => {
    cy.visit('/gene')
    cy.get('#term').type('p53')
    cy.get('#search').click()
    cy.get('#pageno').should('have.value', 1)
    cy.contains('a.active', 'Next').click()
    cy.get('#pageno').should('have.value', 2)
    cy.contains('a.active', 'Next').click()
    cy.get('#pageno').should('have.value', 3)
    cy.contains('a.active', 'Next').click()
    recurse(
      () => cy.contains('a.active', 'Prev').should(Cypress._.noop),
      Cypress._.isEmpty,
      {
        post() {
          cy.get('#pageno')
            .invoke('val')
            .then((page) => {
              cy.contains('a.active', 'Prev').click()
              cy.get('#pageno').should('not.have.value', page)
            })
        },
        delay: 2_000,
        limit: 10,
        timeout: 30_000,
        log: true,
      },
    )
    cy.get('#pageno').should('have.value', 1)
  })
})
