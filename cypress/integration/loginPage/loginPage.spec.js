/// <reference types = 'cypress'/>

import { homePage } from '../../fixtures/homePage'
import { loginPageErrors } from '../../fixtures/loginPage'
import { logInPageElements } from "../../support/pom_objects/logInPageElements"
import { homePageElements } from '../../support/pom_objects/homePageElements'

const rightUser = Cypress.env("rightUser")
const wrongUser = Cypress.env("wrongUser")

describe ('test login page', () => {
    beforeEach(() => {
        cy.visit('/')
        
    })

    it('Do login with wrong username', () => {
        cy.get(logInPageElements.username).type(wrongUser.username)
        cy.get(logInPageElements.password).type(rightUser.password)
        cy.get(logInPageElements.signIn).click()
        cy.get(logInPageElements.signInError).should('contain.text', loginPageErrors.wrongCredentials)
    })

    it('Do login with wrong password', () => {
        cy.get(logInPageElements.username).type(rightUser.username)
        cy.get(logInPageElements.password).type(wrongUser.password)
        cy.get(logInPageElements.signIn).click()
        cy.get(logInPageElements.signInError).should('contain.text', loginPageErrors.wrongCredentials)
    })

    it('Do login with empty username', () => {
        cy.get(logInPageElements.username).clear()
        cy.get(logInPageElements.password).type(rightUser.password)
        cy.get(logInPageElements.signIn).click()
        cy.get(logInPageElements.signInError).should('contain.text', loginPageErrors.usernameRequired)
    })

    it('Do login with empty password', () => {
        cy.get(logInPageElements.username).type(rightUser.username)
        cy.get(logInPageElements.password).clear()
        cy.get(logInPageElements.signIn).click()
        cy.get(logInPageElements.signInError).should('contain.text', loginPageErrors.passwordRequired)
    })

    it('Do login with incorrect credentials', () => {
        cy.get(logInPageElements.username).type(wrongUser.username)
        cy.get(logInPageElements.password).type(wrongUser.password)
        cy.get(logInPageElements.signIn).click()
        cy.get(logInPageElements.signInError).should('contain.text', loginPageErrors.wrongCredentials)
    })

    it('Do login with correct credentials', () => {
        cy.get(logInPageElements.username).type(rightUser.username)
        cy.get(logInPageElements.password).type(rightUser.password)
        cy.get(logInPageElements.signIn).click()
        cy.get(homePageElements.headerTextElement).should('contain.text', homePage.headerText)
    })

})