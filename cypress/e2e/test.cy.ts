describe('visit homepage', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('h1').should(
      'text',
      "We'll help you find / create the perfect venue.",
    );
  });
});
