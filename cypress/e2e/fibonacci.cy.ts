import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";


describe('Приложение корректно отрабатывает компонент FibonacciPage', (): void => {
    beforeEach((): void => {
        cy.visit('/fibonacci');
        cy.url().should('include', '/fibonacci');
    })
    it('Кнопка добавления недоступна, если поле input пусто', (): void => {
        cy.get('button').should('be.disabled');
        cy.get('input').type('3');
        cy.get('button').eq(1).should('not.be.disabled');
    })
    it('Числа корректно генерируются', (): void => {
        cy.get('input').type(6);
        cy.get('button').eq(1).click();
        cy.get('button').eq(1).should('be.disabled');
        cy.wait(SHORT_DELAY_IN_MS * 6);
        cy.get('div[class*=circle_content]').should('have.length', 6);
        cy.get('div[class*=circle_content] div p:first-of-type').eq(6).should('have.text', '13');
    })
})