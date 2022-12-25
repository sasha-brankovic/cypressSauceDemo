/// <reference types="cypress" />
/// <reference path="index.d.ts" />

import { logInPageElements } from './pom_objects/logInPageElements'
import { homePageElements } from './pom_objects/homePageElements';
import { homePage } from '../fixtures/homePage';
import { cartPageElements } from './pom_objects/cartPageElements';
import { cartPage } from '../fixtures/cartPage';


Cypress.Commands.add('login', (username, password) => {
    cy.get(logInPageElements.username).type(username);
    cy.get(logInPageElements.password).type(password);
    cy.get(logInPageElements.signIn).click();
})

Cypress.Commands.add('addItemsToCart', () => {
    cy.get(homePageElements.items).children().then((item) => {
        for (let i = 0; i < item.length; i++) {
            cy.get(homePageElements.selectItem)
                .eq(i)
                .click()
            cy.get(homePageElements.selectItem)
                .eq(i)
                .should('have.text', homePage.textOnItemAfterSelect)
        }
    })
    cy.get(homePageElements.shoppingCart).click()
    cy.get(cartPageElements.textYourCart).should('contain.text', cartPage.headerText)
})

Cypress.Commands.add('fillBuyerInfo', () => {
    cy.get(cartPageElements.inputFirstName).type(cartPage.firstName)
    cy.get(cartPageElements.inputLastName).type(cartPage.lastName)
    cy.get(cartPageElements.inputPostalCode).type(cartPage.postalCode)
})