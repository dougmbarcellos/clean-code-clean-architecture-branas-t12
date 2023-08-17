describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Passageiro');
    cy.contains('Motorista');
  });
});
