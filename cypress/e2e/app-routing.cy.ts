import {
    BASE_URL,
    FIBONACCI_PAGE,
    LIST_PAGE,
    MAIN_PAGE,
    QUEUE_PAGE,
    SORTING_PAGE,
    STACK_PAGE,
    STRING_PAGE
} from "../../src/constants/routes";


describe('Приложение корректно отрабатывает переходы по страницам', (): void => {
    beforeEach((): void => {
        cy.visit(BASE_URL)
    })
    afterEach((): void => {
        cy.get('p').contains('К оглавлению').click();
        cy.url().should('include', MAIN_PAGE);
    })
    it('Открыта страница с алгоритмом разворота строки по адресу /recursion', (): void => {
        cy.get('[data-testid="recursion"]').click();
        cy.url().should('include', STRING_PAGE);
    })
    it('Открыта страница с алгоритмом последовательности Фибоначи по адресу /fibonacci', ():void => {
        cy.get('[data-testid="fibonacci"]').click();
        cy.url().should('include', FIBONACCI_PAGE);
    })
    it('Открыта страница с алгоритмом сортировки массива по адресу /sorting', (): void => {
        cy.get('[data-testid="sorting"]').click();
        cy.url().should('include', SORTING_PAGE);
    })
    it('Открыта страница с алгоритмом стека по адресу /stack', (): void => {
        cy.get('[data-testid="stack"]').click();
        cy.url().should('include', STACK_PAGE);
    })
    it('Открыта страница с алгоритмом очереди по адресу /queue', (): void => {
        cy.get('[data-testid="queue"]').click();
        cy.url().should('include', QUEUE_PAGE);
    })
    it('Открыта страница с алгоритмом связного списка по адресу /list', (): void => {
        cy.get('[data-testid="list"]').click();
        cy.url().should('include', LIST_PAGE);
    })
});