import * as elements from "cypress/helpers/registerHtmlElements";

const registerUser = (email: string, password: string) => {
    cy.visit('/register');
    
    elements.getEmailInput().type(email);
    elements.getPasswordInput().type(password);
    elements.getConfirmPasswordInput().type(password);
    elements.getUserNameInput().type('aa');
    elements.getNameInput().type('aaa');
    elements.getBirthDayDateInput().type(new Date('2002-07-16').toISOString());
  
    elements.getRegisterButton().click();
}

export default registerUser;