import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";


describe('Приложение корректно отрабатывает компонент StackPage', (): void => {
    beforeEach((): void => {
        cy.visit('/stack');
        cy.url().should('include', '/stack');
    })
    it('Все кнопки добавления недоступны, если поле input пусто', (): void => {
        cy.get('button').eq(1).should('be.disabled');
        cy.get('button').eq(2).should('be.disabled');
        cy.get('button').eq(3).should('be.disabled');
        cy.get('input').type('1234');
        cy.get('button').eq(1).should('not.be.disabled');
        cy.get('button').eq(1).click();
        cy.get('button').eq(2).should('not.be.disabled');
        cy.get('button').eq(3).should('not.be.disabled');
    })
    it('Во время добавления/удаления/очистки элементов, на кнопках висит loader', (): void => {
        cy.get('input').type('1234');
        cy.get('button').eq(1).click();
        cy.get('[class^="button_loader_icon__"]').should('exist');
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('button').eq(2).click();
        cy.get('[class^="button_loader_icon__"]').should("exist");
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('input').type('1234');
        cy.get('button').eq(1).click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('button').eq(3).click()
        cy.get('[class^="button_loader_icon__"]').should("exist");
    })
    it('Элемент из стека удаляется корректно', (): void => {
        /*Сначала добавляются элементы*/
        cy.get('input').type('1');
        cy.get('button').eq(1).click();
        cy.get('input').type('2');
        cy.get('button').eq(1).click();
        cy.get('input').type('3');
        cy.get('button').eq(1).click();
        cy.get('input').type('4');
        cy.get('button').eq(1).click();
        /*Удаление элементов*/
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('div[class*=circle_circle]').should('have.length', 4);
        cy.get('input').type('2');
        cy.get('button').eq(2).click();
        cy.get('div[class*=circle_circle]').should('have.length', 3);
        cy.get('div[class*=circle_default]').eq(1).should('have.text', '2');
    });
    it('Элементы стека очищаются после нажатия на кнопку, длина стека равна 0', (): void => {
        cy.get('input').type('1');
        cy.get('button').eq(1).click();
        cy.get('input').type('2');
        cy.get('button').eq(1).click();
        cy.get('input').type('3');
        cy.get('button').eq(1).click();
        cy.get('input').type('4');
        cy.get('button').eq(1).click();
        /*Очищение стека*/
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('div[class*=circle_circle]').should('have.length', 4);
        cy.get('button').eq(3).click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('div[class*=circle_circle]').should('have.length', 0);
    })
})