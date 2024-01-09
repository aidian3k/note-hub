import registerUser from '../helpers/registerUser';
import * as elements from '../helpers/loginHtmlElements';
import createNote from '../helpers/createNote';
import searchNote from '../helpers/searchNote';

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

	it('Should correctly edit added note when user wants to edit the note', () => {
		createNote('New note title', 'Some content');

		cy.contains('app-note button', 'Read more').click();
		cy.contains('app-note-read button span mat-icon', 'edit').click();
		cy.get('textarea[id="message"]').wait(100).type(' and new content');
		cy.contains('mat-dialog-actions button', 'Update').click();

		cy.get('simple-snack-bar').should('contain', 'Successfully updated note!');
	});

	it('Should display whole content when user want to read more from note', () => {
		createNote('New note title', 'Some content');

		cy.contains('app-note button', 'Read more').click();

		cy.get('mat-dialog-container app-note-read p').should('contain', 'Some content');
	});

	it('Should verify mandatory fields when user does not enter mandatory fields during the creation', () => {
		cy.contains('app-navbar-button', 'Create note').click();
		cy.get('input[id="title"]').wait(100).focus().blur();
		cy.get('textarea[id="message"]').wait(100).focus().blur();

		cy.get('mat-error').should('contain', 'This field is required');
	});

	it('Should correctly find note by title when user enters valid title in the search', () => {
		createNote('New note title', 'Some content');

		searchNote('New note title');

		cy.get('app-note').should('have.length', 1);
	});

	it('Should find zero notes when notes are not added to the user', () => {
		createNote('First note title', 'Some content');
		createNote('Second note title', 'Some content');
		createNote('Third note title', 'Some content');
		createNote('Fourth note title', 'Some content');

		searchNote('Non existing note title');

		cy.get('app-note').should('have.length', 0);
	});
});
