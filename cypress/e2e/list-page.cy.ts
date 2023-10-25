describe('Приложение корректно отрабатывает компонент ListPage', (): void => {
    beforeEach((): void => {
        cy.visit('/list');
        cy.url().should('include', '/list');
    })
})