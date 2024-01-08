const CreateNote = (title: string, content: string) => {
	cy.contains('app-navbar-button', 'Create note').click();
	cy.get('input#title').wait(100).type(title);
	cy.get('textarea#message').type(content);
	cy.contains('mat-dialog-actions button', 'Create').click();
};

export default CreateNote;
