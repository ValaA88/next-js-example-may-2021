describe('Management Dashboard', () => {
  it('creates a new user', () => {
    cy.visit('/users/management');
    cy.get('[data-cy="users-management-create-link"]')
      .should('be.visible')
      .click();

    cy.visit('/register');

    const testId = new Date().getTime();
    const userFirstName = `test user first name ${testId}`;
    const userLastName = `test user first name ${testId}`;
    const userUsername = `test-user-username-${testId}`;
    const userPassword = `test-user-password-${testId}`;

    cy.get('[data-cy="register-first-name"]').type(userFirstName);
    cy.get('[data-cy="register-last-name"]').type(userLastName);
    cy.get('[data-cy="register-username"]').type(userUsername);
    cy.get('[data-cy="register-password"]').type(userPassword + '{enter}');

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
