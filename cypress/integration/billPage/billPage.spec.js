/// <reference types = 'cypress'/>

import { billPageElements } from "../../support/pom_objects/billPageElements"
import { cartPageElements } from "../../support/pom_objects/cartPageElements"

const rightUser = Cypress.env("rightUser")

describe('Test bill page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login(rightUser.username, rightUser.password)
        cy.addItemsToCart()
    })
    it('Compare Sum of all selected items to Total', () => {
        let unfilteredSumOfTotal = ''
        let unfilteredArrayOfTotal = []
        let calculatedTotal = 0
        let total
        cy.get(cartPageElements.buttonContinueBuying).click()
        cy.fillBuyerInfo()
        cy.get(cartPageElements.buttonContinueBuyingAnother).click()
        cy.get(billPageElements.itemsPriceList)
        .children()
        .then((element) => {
            for (let i = 0; i < (element.length - 2); i++) {
                cy.get(billPageElements.cartItem)
                .find(billPageElements.itemPrice).eq(i)
                .then(($element) => {
                    unfilteredSumOfTotal += Cypress._.map($element, 'innerText')
                })
            }
        }).then(() => {
            unfilteredArrayOfTotal = unfilteredSumOfTotal.split('$')
            unfilteredArrayOfTotal.shift()
            for(let i = 0; i < unfilteredArrayOfTotal.length; i++){
                calculatedTotal += parseFloat(unfilteredArrayOfTotal[i])
            }
        })
        cy.get(billPageElements.total).then(($element) => {
            total = parseFloat(Cypress._.map($element, 'innerText').toString().replace('Item total: $', ''))
            expect(calculatedTotal).to.eq(total)
        })
    })
})