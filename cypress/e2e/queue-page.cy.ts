import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";
import {QUEUE_PAGE} from "../../src/constants/routes";
import {
    CIRCLE,
    CIRCLE_BORDER,
    CIRCLE_BORDER_CHANGING_STYLE,
    CIRCLE_BORDER_DEFAULT_STYLE,
    CIRCLE_HEAD,
    CIRCLE_INDEX,
    CIRCLE_TAIL
} from "../../src/constants/test-selectors";


describe('Приложение корректно отрабатывает компонент QueuePage', (): void => {
    beforeEach((): void => {
        cy.visit(QUEUE_PAGE);
        cy.url().should('include', QUEUE_PAGE);
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
    it('Элемент корректно добавляется в очередь с учетом всех стилей и анимаций', (): void => {
        cy.get('input').type('1234');
        cy.get('button').eq(1).click();
        cy.get(CIRCLE).eq(0).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_BORDER_CHANGING_STYLE);
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(CIRCLE).eq(0).should('contain.text', '1234');
        cy.get(CIRCLE).eq(0).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_BORDER_DEFAULT_STYLE);
        cy.get(CIRCLE).eq(0).find(CIRCLE_INDEX).should('contain.text', '0');
        cy.get(CIRCLE).eq(0).find(CIRCLE_HEAD).should('contain.text', 'head');
        cy.get(CIRCLE).eq(0).find(CIRCLE_TAIL).should('contain.text', 'tail');
        /*Добавляем 2-ой элемент в очередь*/
        cy.get('input').type('56');
        cy.get('button').eq(1).click();
        cy.get(CIRCLE).eq(1).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_BORDER_CHANGING_STYLE);
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(CIRCLE).eq(1).should('contain.text', '56');
        cy.get(CIRCLE).eq(1).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_BORDER_DEFAULT_STYLE);
        cy.get(CIRCLE).eq(1).find(CIRCLE_INDEX).should('contain.text', '1');
        cy.get(CIRCLE).eq(0).find(CIRCLE_HEAD).should('contain.text', 'head');
        cy.get(CIRCLE).eq(0).find(CIRCLE_TAIL).should('not.contain.text', 'tail');
        cy.get(CIRCLE).eq(1).find(CIRCLE_TAIL).should('contain.text', 'tail');
        cy.get(CIRCLE).eq(1).find(CIRCLE_HEAD).should('not.contain.text', 'head');
    })
    it('Элемент корректно удаляется из очереди с учетом всех стилей и анимаций', (): void => {
        cy.get('input').type('123');
        cy.get('button').eq(1).click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('input').type('456');
        cy.get('button').eq(1).click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('input').type('789');
        cy.get('button').eq(1).click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(CIRCLE).eq(0).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_BORDER_DEFAULT_STYLE);
        cy.get(CIRCLE).eq(1).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_BORDER_DEFAULT_STYLE);
        cy.get(CIRCLE).eq(2).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_BORDER_DEFAULT_STYLE);
        cy.get('button').eq(2).click();
        cy.get(CIRCLE).eq(0).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_BORDER_CHANGING_STYLE);
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(CIRCLE).eq(0).should('not.contain.text');
        cy.get(CIRCLE).eq(0).find(CIRCLE_HEAD).should('not.contain.text', 'head');
        cy.get(CIRCLE).eq(0).find(CIRCLE_TAIL).should('not.contain.text', 'tail');
        cy.get(CIRCLE).eq(1).find(CIRCLE_HEAD).should('contain.text', 'head');
        cy.get(CIRCLE).eq(1).find(CIRCLE_TAIL).should('not.contain.text', 'tail');
        cy.get(CIRCLE).eq(2).find(CIRCLE_HEAD).should('not.contain.text', 'head');
        cy.get(CIRCLE).eq(2).find(CIRCLE_TAIL).should('contain.text', 'tail');
    })
    it('Очередь корректно очищается после нажатия на соответствующую кнопку', (): void => {
        cy.get('input').type('123');
        cy.get('button').eq(1).click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('input').type('456');
        cy.get('button').eq(1).click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('input').type('789');
        cy.get('button').eq(1).click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('button').eq(3).click();
        cy.get(CIRCLE).each(($el: any): void => {
            cy.wrap($el).should('contain.text', '');
        });
        cy.get(CIRCLE).find(CIRCLE_HEAD).each(($el: any): void => {
            cy.wrap($el).should('contain.text', '');
        });
        cy.get(CIRCLE).find(CIRCLE_TAIL).each(($el :any): void => {
            cy.wrap($el).should('contain.text', '');
        });
    })
})