import * as elements from "cypress/helpers/loginHtmlElements";
import registerUser from "cypress/helpers/registerUser";

describe('Login page tests', () => {
  it('Should not login user when user does not exist', () => {
    cy.visit('/login');

    elements.getEmailInput().type('nonexistinguser@wp.pl');
    elements.getPasswordInput().type('nonexistingpassword');
    elements.getLoginButton().click();

    cy.url().should('contain', 'login');
  })
  
  it('Should display error message when user does not enter email', () => {
    cy.visit('/login');
    
    elements.getEmailInput().click();
    elements.getLoginButton().click();
    elements.getEmailError().invoke('text').invoke('trim').should('eq', 'Username field is required');
  })

  it('Should display error message when user does not enter password', () => {
    cy.visit('/login');

    elements.getPasswordInput().click();
    elements.getLoginButton().click();
    elements.getPasswordError().invoke('text').invoke('trim').should('eq', 'Password field is required');
  });

  it('Should login user properly when user exists', () => {
    const randomEmail = `user${Cypress._.shuffle('abcdefghijklmnopqrstuvwxyz').join('')}@example.com`;
    const password = '123';
    registerUser(randomEmail, password);

    cy.wait(3000);

    elements.getEmailInput().type(randomEmail);
    elements.getPasswordInput().type(password);
    elements.getLoginButton().click();

    cy.wait(3000);
    cy.url().should('not.contain', 'login');
  })
})