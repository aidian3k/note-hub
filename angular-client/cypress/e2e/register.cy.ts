import * as elements from "cypress/helpers/registerHtmlElements";

describe('Register page tests', () => {
  it('Should register button be disabled when register password does not match confirm password', () => {
    cy.visit('/register');

    elements.getEmailInput().type('adrian@wp.pl');
    elements.getPasswordInput().type('some');
    elements.getConfirmPasswordInput().type('some-other');
    elements.getUserNameInput().type('aa');
    elements.getNameInput().type('aaa');
    elements.getBirthDayDateInput().type(new Date('2002-07-16').toISOString());

    elements.getRegisterButton().should('be.disabled');
  })
  
  it('Should display errors when user does not provide any email and password', () => {
    cy.visit('/register');

    elements.getEmailInput().click();
    elements.getPasswordInput().click();
    elements.getPasswordInput().click();
    elements.getUserNameInput().type('aa');
    elements.getNameInput().type('aaa');
    elements.getBirthDayDateInput().type(new Date('2002-07-16').toISOString());

    elements.getRegisterButton().should('be.disabled');
    elements.getPasswordErrorText().invoke('text').invoke('trim').should('eq', 'This field is required');
    elements.getEmailErrorText().invoke('text').invoke('trim').should('eq', 'This field is required');
  })

  it('Should correctly create user when provided data is correct', () => {
    cy.visit('/register');
  
    const randomEmail = `user${Cypress._.shuffle('abcdefghijklmnopqrstuvwxyz').join('')}@example.com`;
  
    elements.getEmailInput().type(randomEmail);
    elements.getPasswordInput().type('some');
    elements.getConfirmPasswordInput().type('some');
    elements.getUserNameInput().type('aa');
    elements.getNameInput().type('aaa');
    elements.getBirthDayDateInput().type(new Date('2002-07-16').toISOString());
  
    elements.getRegisterButton().click();
  
    cy.wait(3000);
  
    cy.url().should('include', 'login');
  });

  it('Should register button be disabled when birthday date is not valid', () => {
    cy.visit('/register');

    elements.getEmailInput().type('adrian@wp.pl');
    elements.getPasswordInput().type('some');
    elements.getConfirmPasswordInput().type('some-other');
    elements.getUserNameInput().type('aa');
    elements.getNameInput().type('aaa');
    elements.getBirthDayDateInput().type('200202-31-31');

    elements.getRegisterButton().should('be.disabled');
  })

  it('Should throw an error when trying to create user that already exists', () => {
    cy.visit('/register');
    
    elements.getEmailInput().type('adrian@wp.pl');
    elements.getPasswordInput().type('some');
    elements.getConfirmPasswordInput().type('some');
    elements.getUserNameInput().type('aa');
    elements.getNameInput().type('aaa');
    elements.getBirthDayDateInput().type(new Date('2002-07-16').toISOString());
  
    elements.getRegisterButton().click();
  
    cy.wait(3000);
  
    cy.url().should('include', 'register');
  })
})