describe('Can navigate around pages', () => {
  it('can visit all pages and load all page content', () => {
    cy.visit('/');
    cy.contains('Using the HTML');

    cy.get('[data-cy="header-about-link"]').click();
    cy.get('[data-cy="about-page-h1"]').should('be.visible');

    cy.get('[data-cy="header-users-link"]').click();
    cy.get('[data-cy="users-page-h1"]').should('be.visible');

    // This is an example of a "flaky" test - a test that
    // will not work in all circumstances
    //
    // This is considered bad practice - usually you want
    // to verify that you have the data first
    cy.get('[data-cy="users-page-user-4"]').click();
    cy.get('[data-cy="user-page-user-4"]').should('be.visible');

    // Another flaky test (if user 999 did exist, this breaks)
    cy.visit('/users/999');
    cy.get('[data-cy="user-page-user-not-found"]').should('be.visible');
  });
});
