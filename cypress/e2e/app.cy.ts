describe('App Component Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads and displays the correct title', () => {
    cy.title().should('eq', 'Holidaze');
  });

  it('checks if the main header and description are correct', () => {
    cy.get('h1').contains('Holidaze').should('be.visible');
    cy.get('p')
      .contains('Venues from around the world, all in one place.')
      .should('be.visible');
  });

  it('navigates to the venues page when the Get Started button is clicked', () => {
    cy.get('a').contains('Get Started').click();
    cy.url().should('include', '/venues');
  });
});
