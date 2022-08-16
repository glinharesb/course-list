describe('edit course', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

    // edit icon
    cy.get('td > div > div').eq(0).click()

    cy.get('input')
      .first()
      .type(`${Math.floor(Math.random() * 100)}`)

    // botão "Salvar"
    cy.get('button').last().click()

    // voltar pra lista de cursos
    cy.location('pathname').should('eq', '/')
  })
})

export {}
