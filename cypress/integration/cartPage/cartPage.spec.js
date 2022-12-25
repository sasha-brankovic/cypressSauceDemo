/// <reference types = 'cypress'/>

import { cartPage } from "../../fixtures/cartPage"
import { cartPageElements } from "../../support/pom_objects/cartPageElements"

const rightUser = Cypress.env("rightUser")

describe('Test cart page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login(rightUser.username, rightUser.password)
        cy.addItemsToCart()
    })
    it('Test button "Continue Shopping"', () => {
        cy.get(cartPageElements.cartElement).click()
        cy.get(cartPageElements.textYourCart, {timeout: 15000}).should('have.text', cartPage.headerText)
    })
    
    it('Test remove items from cart', () => {
        cy.get(cartPageElements.cartElement).click()
        cy.get(cartPageElements.textYourCart).should('have.text', cartPage.headerText)
        cy.get(cartPageElements.selectedItemsList).children().then((element) => {
            for(let i = 2; i < element.length; i++){
                cy.get(cartPageElements.buttonRemoveItemList)
                .eq(0)
                .click()
            }
            cy.get('.cart_list').should('have.length', 1)
        })
    })

    it('Test continue buying', () => {
        cy.get(cartPageElements.buttonContinueBuying).click()
        cy.fillBuyerInfo()
        cy.get(cartPageElements.buttonContinueBuyingAnother).click()
        cy.get(cartPageElements.buttonFinish).click()
        cy.get(cartPageElements.endOfShopping).should('contain.text', cartPage.endOfShoppingText)
    })
})