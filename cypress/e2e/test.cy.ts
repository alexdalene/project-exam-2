describe('visit homepage', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('h1').should('text', 'Hello, world!');
  });
  it('fails', () => {
    cy.visit('/');
    cy.get('h1').should('text', 'Hello, world');
  });
});
