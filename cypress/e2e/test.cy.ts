describe('visit homepage', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('h1').should(
      'text',
      "Let's help you find / create the perfect venue.",
    );
  });
});
