describe('create course', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

    // botão "Criar novo curso"
    cy.get('button').first().click()

    // nível escolar
    cy.get('select').eq(0).select('UniversityGraduate')

    // grau
    cy.get('select').eq(1).select('BachelorDegree')

    // gerar número aleatório para usar nos inputs
    const randomNumber = Math.floor(Math.random() * 100)

    // nome do curso
    cy.get('input').eq(0).type(`Teste Course ${randomNumber}`)

    // código do curso
    cy.get('input').eq(1).type(`${randomNumber}`)

    // botão "Salvar"
    cy.get('button').last().click()

    // voltar pra lista de cursos
    cy.location('pathname').should('eq', '/')
  })
})

export {}
