const searchNote = (text: string) => {
  cy.get('mat-form-field input').type(text);
  cy.contains('mat-icon', 'search').click();
};

export default searchNote;
