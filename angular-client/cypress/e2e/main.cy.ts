import registerUser from '../helpers/registerUser';
import * as elements from '../helpers/loginHtmlElements';
import createNote from '../helpers/CreateNote';

describe('Main page testes', () => {
	beforeEach(() => {
		const randomEmail = `user${Cypress._.shuffle('abcdefghijklmnopqrstuvwxyz').join(
			''
		)}@example.com`;
		const password = '123';
		registerUser(randomEmail, password);

		elements.getEmailInput().type(randomEmail);
		elements.getPasswordInput().type(password);
		elements.getLoginButton().click();
	});

	it('Should enter the profile dialog and display profile information when user clicks profile button', () => {
		const randomEmail = `user${Cypress._.shuffle('abcdefghijklmnopqrstuvwxyz').join(
			''
		)}@example.com`;
		const password = '123';
		registerUser(randomEmail, password);

		elements.getEmailInput().type(randomEmail);
		elements.getPasswordInput().type(password);
		elements.getLoginButton().click();
		cy.contains('button', 'Profile').click();
		cy.get('span.text-yellow-300')
			.invoke('text')
			.then(email => {
				const actualEmailPart = email.match(/'([^']*)'/)[1];
				expect(actualEmailPart.trim()).to.equal(randomEmail);
			});
	});

	it('Should enter about us page and display information when user clicks about as button', () => {
		cy.contains('button', 'About us').click();
		cy.get('div.flex.justify-between.items-center').then(container => {
			const headingText = container.find('h2.mat-dialog-title#mat-dialog-title-0').text();
			const actualText = 'About us';
			expect(headingText.trim()).to.equal(actualText);
		});
	});

	it('Should enter content us page and display information when user clicks contact us button', () => {
		cy.contains('button', 'Contact us').click();
		cy.get('div.flex.justify-between.items-center').then(container => {
			const headingText = container.find('h2.mat-dialog-title#mat-dialog-title-0').text();
			const actualText = 'Contact us';
			expect(headingText.trim()).to.equal(actualText);
		});
	});

	it('Should logout user when user clicks the logout button', () => {
		cy.contains('button', 'Logout').click();
		cy.url().should('contain', 'login');
	});

	it('Should correctly add new note when user wants to add new note', () => {
		cy.contains('app-navbar-button', 'Create note').click();
		cy.get('input#title').wait(100).type('New title');
		cy.get('textarea#message').invoke('val', 'Some content').type('{enter}');
		cy.contains('mat-dialog-actions button', 'Create').click();
		cy.get('app-note').should('exist');
	});

	it('Should correctly delete added note when user wants to delete the note', () => {
		createNote('New title', 'Some content');
		cy.contains('Button', 'Delete').click();
		cy.get('button.bg-red-800').click();
		cy.get('app-note').should('not.exist');
	});
});
