describe('Приложение запускается', (): void => {
    it('Приложение должно быть доступно по адресу localhost:3000', (): void => {
        cy.visit('http://localhost:3000')
    })
})