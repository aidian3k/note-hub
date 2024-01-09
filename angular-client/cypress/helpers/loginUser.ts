import * as elements from 'cypress/helpers/loginHtmlElements';

const loginUser = (email: string, password: string) => {
	cy.visit('/login');

	elements.getEmailInput().type(email);
	elements.getPasswordInput().type(password);

	elements.getLoginButton().click();
};

export default loginUser;
