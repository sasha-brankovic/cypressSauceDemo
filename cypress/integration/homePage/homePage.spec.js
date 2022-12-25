/// <reference types = 'cypress'/>

import { homePage } from '../../fixtures/homePage'
import { homePageElements } from '../../support/pom_objects/homePageElements'
import { cartPageElements } from '../../support/pom_objects/cartPageElements'
import { cartPage } from '../../fixtures/cartPage'

const rightUser = Cypress.env("rightUser")

describe ('Test select items', () => {
    before(() => {
        cy.visit('/')
        cy.login(rightUser.username, rightUser.password)
    })

    it('Click on item button "Add To Cart"', () => {
        cy.get(homePageElements.items).children().then((item) => {
            for(let i = 0; i < item.length; i++){
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
})