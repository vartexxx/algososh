import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";
import {
    CIRCLE,
    CIRCLE_BORDER,
    CIRCLE_BORDER_CHANGING_STYLE,
    CIRCLE_BORDER_MODIFIED_STYLE
} from "../../src/constants/test-selectors";


describe('Приложение корректно отрабатывает компонент StringComponent', (): void => {
    beforeEach((): void => {
        cy.visit('/recursion');
        cy.url().should('include', '/recursion');
    })
    it('Кнопка добавления недоступна, если поле input пусто', (): void => {
        cy.get('button').should('be.disabled');
        cy.get('input').type('text');
        cy.get('button').should('not.be.disabled');
    })
    it('Строка разворачивается корректно, с учетом всех стилей и анимаций', (): void => {
        cy.get('input').type('text');
        cy.get('button').eq(1).click();
        cy.get(CIRCLE).should('have.length', 4);
        /*Проверка анимации по ходу выполнения*/
        cy.get(CIRCLE)
            .eq(0)
            .should('contain.text', 't')
            .find(CIRCLE_BORDER)
            .should('have.css', 'border', CIRCLE_BORDER_CHANGING_STYLE);
        //
        cy.get(CIRCLE)
            .eq(1)
            .should('contain.text', 'x')
            .find(CIRCLE_BORDER)
            .should('have.css', 'border', CIRCLE_BORDER_MODIFIED_STYLE);
        //
        cy.get(CIRCLE)
            .eq(2)
            .should('contain.text', 'e')
            .find(CIRCLE_BORDER)
            .should('have.css', 'border', CIRCLE_BORDER_MODIFIED_STYLE);
        //
        cy.get(CIRCLE)
            .eq(3)
            .should('contain.text', 't')
            .find(CIRCLE_BORDER)
            .should('have.css', 'border', CIRCLE_BORDER_MODIFIED_STYLE);
        //
        cy.wait(SHORT_DELAY_IN_MS);
        /*Итоговая проверка анимаций*/
        cy.get(CIRCLE)
            .eq(0)
            .should('contain.text', 't')
            .find(CIRCLE_BORDER)
            .should('have.css', 'border', CIRCLE_BORDER_MODIFIED_STYLE);
        //
        cy.get(CIRCLE)
            .eq(1)
            .should('contain.text', 'x')
            .find(CIRCLE_BORDER)
            .should('have.css', 'border', CIRCLE_BORDER_MODIFIED_STYLE);
        //
        cy.get(CIRCLE)
            .eq(2)
            .should('contain.text', 'e')
            .find(CIRCLE_BORDER)
            .should('have.css', 'border', CIRCLE_BORDER_MODIFIED_STYLE);
        //
        cy.get(CIRCLE)
            .eq(3)
            .should('contain.text', 't')
            .find(CIRCLE_BORDER)
            .should('have.css', 'border', CIRCLE_BORDER_MODIFIED_STYLE);
    })
})