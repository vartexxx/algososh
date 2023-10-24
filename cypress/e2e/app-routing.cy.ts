describe('Приложение корректно отрабатывает переходы по страницам', (): void => {
    beforeEach((): void => {
        cy.visit('http://localhost:3000')
    })
    afterEach((): void => {
        cy.get('p').contains('К оглавлению').click();
        cy.url().should('include', '/');
    })
    it('Открыта страница с алгоритмом разворота строки по адресу /recursion', (): void => {
        cy.get('[data-testid="recursion"]').click();
        cy.url().should('include', '/recursion');
    })
    it('Открыта страница с алгоритмом последовательности Фибоначи по адресу /fibonacci', ():void => {
        cy.get('[data-testid="fibonacci"]').click();
        cy.url().should('include', '/fibonacci');
    })
    it('Открыта страница с алгоритмом сортировки массива по адресу /sorting', (): void => {
        cy.get('[data-testid="sorting"]').click();
        cy.url().should('include', '/sorting');
    })
    it('Открыта страница с алгоритмом стека по адресу /stack', (): void => {
        cy.get('[data-testid="stack"]').click();
        cy.url().should('include', '/stack');
    })
    it('Открыта страница с алгоритмом очереди по адресу /queue', (): void => {
        cy.get('[data-testid="queue"]').click();
        cy.url().should('include', '/queue');
    })
    it('Открыта страница с алгоритмом связного списка по адресу /list', (): void => {
        cy.get('[data-testid="list"]').click();
        cy.url().should('include', '/list')
    })
});