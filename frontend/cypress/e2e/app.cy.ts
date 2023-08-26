describe('testes gerais', () => {
  it('deve visitar a página inicial', () => {
    cy.visit('/');
    cy.contains('Passageiro');
    cy.contains('Motorista');
  });

  it('deve alterar a url quando clicar em Passageiro', () => {
    cy.visit('/');
    cy.get<HTMLAnchorElement>('.passenger-entry').click();
    cy.location('pathname').should('equal', '/create-passenger');
  });

  it('deve alterar a url quando clicar em Motorista', () => {
    cy.visit('/');
    cy.get<HTMLAnchorElement>('.passenger-entry').click();
    cy.location('pathname').should('equal', '/create-passenger');
  });
});
