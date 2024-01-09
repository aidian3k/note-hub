interface RegisterPageElements {
	emailInput: string;
	passwordInput: string;
	confirmPasswordInput: string;
	birthDayDateInput: string;
	userNameInput: string;
	nameInput: string;
	registerButton: string;
	emailErrorText: string;
	passwordErrorText: string;
	registrationProblemDialogText: string;
}

const registerPageElements: RegisterPageElements = {
	emailInput: 'app-register > div > div > div > form > div > mat-form-field:nth-child(1) input',
	passwordInput: 'app-register > div > div > div > form > div > mat-form-field:nth-child(2) input',
	confirmPasswordInput:
		'app-register > div > div > div > form > div > mat-form-field:nth-child(3) input',
	birthDayDateInput: 'input[formcontrolname="birthdayDate"]',
	userNameInput: 'input[formcontrolname="firstName"]',
	nameInput: 'input[formcontrolname="lastName"]',
	registerButton: 'app-register > div > div > div > form > button',
	emailErrorText: '#mat-error-0',
	passwordErrorText: '#mat-error-1',
	registrationProblemDialogText: 'mat-dialog-container h2'
};

export const getEmailInput = (): Cypress.Chainable<JQuery<HTMLElement>> => {
	return cy.get(registerPageElements.emailInput);
};

export const getPasswordInput = (): Cypress.Chainable<JQuery<HTMLElement>> => {
	return cy.get(registerPageElements.passwordInput);
};

export const getConfirmPasswordInput = (): Cypress.Chainable<JQuery<HTMLElement>> => {
	return cy.get(registerPageElements.confirmPasswordInput);
};

export const getBirthDayDateInput = (): Cypress.Chainable<JQuery<HTMLElement>> => {
	return cy.get(registerPageElements.birthDayDateInput);
};

export const getUserNameInput = (): Cypress.Chainable<JQuery<HTMLElement>> => {
	return cy.get(registerPageElements.userNameInput);
};

export const getNameInput = (): Cypress.Chainable<JQuery<HTMLElement>> => {
	return cy.get(registerPageElements.nameInput);
};

export const getRegisterButton = (): Cypress.Chainable<JQuery<HTMLElement>> => {
	return cy.get(registerPageElements.registerButton);
};

export const getEmailErrorText = (): Cypress.Chainable<JQuery<HTMLElement>> => {
	return cy.get(registerPageElements.emailErrorText);
};

export const getPasswordErrorText = (): Cypress.Chainable<JQuery<HTMLElement>> => {
	return cy.get(registerPageElements.passwordErrorText);
};

export const getRegistrationProblemDialogText = (): Cypress.Chainable<JQuery<HTMLElement>> => {
	return cy.get(registerPageElements.registrationProblemDialogText);
};
