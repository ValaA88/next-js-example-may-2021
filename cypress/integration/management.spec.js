describe('Management Dashboard', () => {
  it('creates a new user', () => {
    cy.visit('/users/management');
    cy.get('[data-cy="users-management-create-link"]')
      .should('be.visible')
      .click();

    const testId = new Date().getTime();
    const userFirstName = `test user first name ${testId}`;
    const userLastName = `test user first name ${testId}`;

    cy.get('[data-cy="users-management-create-first-name"]').type(
      userFirstName,
    );
    cy.get('[data-cy="users-management-create-last-name"]').type(
      userLastName + '{enter}',
    );

    cy.get('[data-cy="users-management-read-page-h1"]').should('be.visible');

    // Get the id from the DOM
    let id;
    cy.get('[data-cy="users-management-read-page-id"]').should(($span) => {
      id = $span.text();
    });

    // Verify that this id is also in the URL
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/users/management/${id}/read`);
    });

    cy.go('back').go('back');
    cy.get('[data-cy="users-management-read-link"]')
      .should('be.visible')
      .click();

    // Maybe an anti-pattern, since you should just use data-cy
    // instead
    cy.get(
      `[data-cy="users-management-read-page-user-${userFirstName}-${userLastName}"] button`,
    )
      .contains('Delete')
      .click();

    cy.get('body').should('not.contain', userFirstName);
    cy.get('body').should('not.contain', userLastName);
  });
});
