declare namespace Cypress {
    interface Chainable<Subject = any> {
        login(username:any, password:any): Chainable<any>;
        addItemsToCart(): Chainable<any>;
        fillBuyerInfo(): Chainable<any>;
    }
}