declare namespace Cypress {
    interface Chainable<Subject = any> {
        login(username:any, password:any): Chainable<any>;
    }
}