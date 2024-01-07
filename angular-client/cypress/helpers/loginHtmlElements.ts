interface LoginPageElements {
    emailInput: string;
    passwordInput: string;
    loginButton: string;
    emailError: string;
    passwordError: string;
  }
  
  const loginPageElements: LoginPageElements = {
    emailInput: 'app-login mat-form-field:nth-child(1) input',
    passwordInput: 'app-login mat-form-field:nth-child(2) input',
    loginButton: 'app-login button',
    emailError: 'app-login mat-error:nth-child(1)',
    passwordError: '[id="mat-error-1"]',
  };
  
  export const getEmailInput = (): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get(loginPageElements.emailInput);
  };
  
  export const getPasswordInput = (): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get(loginPageElements.passwordInput);
  };

  export const getLoginButton = (): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get(loginPageElements.passwordInput);
  };

  export const getEmailError = (): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get(loginPageElements.emailError);
  };

  export const getPasswordError = (): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get(loginPageElements.passwordError);
  };
  
  
  