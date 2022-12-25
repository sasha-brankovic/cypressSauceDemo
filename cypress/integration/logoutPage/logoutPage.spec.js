/// <reference types = 'cypress'/>

import { homePageElements } from "../../support/pom_objects/homePageElements"
import { logInPageElements } from "../../support/pom_objects/logInPageElements"
import { loginPage } from "../../fixtures/loginPage"

const rightUser = Cypress.env("rightUser")

describe ('Test logout', () => {
    before(() => {
        cy.visit('/')
        cy.login(rightUser.username, rightUser.password)
    })

    it('Do logout', () => {
        cy.get(homePageElements.burgerMenu).click()
        cy.get(homePageElements.linkToLoginPage, {timeout: 5000}).click({force: true})
        cy.get(logInPageElements.signIn).should('have.value', loginPage.buttonLogInValue)
    })

})