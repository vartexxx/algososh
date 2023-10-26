import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../src/constants/delays";
import {
    CIRCLE,
    CIRCLE_BORDER,
    CIRCLE_BORDER_CHANGING_STYLE,
    CIRCLE_TAIL,
    DIV_CIRCLE_CONTENT_LIST_FIRST_TYPE, DIV_CIRCLE_CONTENT_LIST_LAST_TYPE, DIV_CIRCLE_LIST_CHANGING
} from "../../src/constants/test-selectors";


describe('Приложение корректно отрабатывает компонент ListPage', (): void => {
    beforeEach((): void => {
        cy.visit('/list');
        cy.url().should('include', '/list');
        cy.get('input').each(($el: HTMLElement) => cy.wrap($el).should('have.value', ''));
    })
    it('Все кнопки добавления недоступны, если поле input пусто и списка нет', (): void => {
        cy.get('button').eq(1).should('be.disabled');
        cy.get('button').eq(2).should('be.disabled');
        cy.get('button').eq(5).should('be.disabled');
        cy.get('button').eq(6).should('be.disabled');
    })
    it('Дефлотный список корректно отрисовывается', (): void => {
        cy.get('div[class*=circle_content]').should(($div: HTMLElementTagNameMap): void => {
            if ($div.length <= 0 || $div.length > 4) {
                throw new Error('Длина списка не может быть меньше 1 и больше 4');
            }
        })
        cy.get(DIV_CIRCLE_CONTENT_LIST_FIRST_TYPE).should('have.text', 'head');
        cy.get(DIV_CIRCLE_CONTENT_LIST_LAST_TYPE).should('have.text', 'tail');
        cy.get('div[class*=circle_content] p[class*=text_type_circle]').each(($el: HTMLElement) =>
            cy.wrap($el).should(($el: HTMLElementTagNameMap): void => {
                if ($el.length <= 0 || $el.length > 4) {
                    throw new Error('Длина списка не может быть меньше 1 и больше 4');
                }
            }),
        );
    })
    it('Элемент корректно добавляется в head', (): void => {
        cy.get('input').eq(0).type('1234');
        cy.get('button').eq(1).click();
        cy.get(DIV_CIRCLE_CONTENT_LIST_FIRST_TYPE).should('have.text', '1234');
        cy.get(DIV_CIRCLE_LIST_CHANGING).should('be.visible');
        cy.get('div[class*=circle_modified]').eq(0).should('be.visible');
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('div[class*=circle_default] p[class*=text]:first-of-type').eq(0).should('have.text', '1234');
        cy.get(DIV_CIRCLE_CONTENT_LIST_FIRST_TYPE).should('have.text', 'head');
        cy.get('div[class*=circle_content] div[class*=text]:last-of-type').should('have.text', 'tail');
    })
    it('Элемент корректно добавляется в tail', (): void => {
        cy.get('input').eq(0).type('5678');
        cy.get('button').eq(2).click();
        cy.get(DIV_CIRCLE_LIST_CHANGING).should('be.visible').should('have.text', '5678');
        cy.get('div[class*=circle_modified]').should('be.visible').should('have.text', '5678');
        cy.get(DIV_CIRCLE_CONTENT_LIST_FIRST_TYPE).should('have.text', 'head');
        cy.get(DIV_CIRCLE_CONTENT_LIST_LAST_TYPE).should('have.text', 'tail');
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('p[class*=text_type_circle]').eq(-1).should('have.text', '5678');
    })
    it('Элемент корректно удаляется из head', (): void => {
        cy.get('input').eq(0).type('1234');
        cy.get('button').eq(1).click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('button').eq(3).click();
        cy.get(DIV_CIRCLE_LIST_CHANGING).should('be.visible').should('have.text', '1234');
        cy.get('p[class*=text_type_circle]').eq(0).should('have.text', '');
        cy.get('div[class*=text]:first-of-type').eq(0).should('have.text', 'head');
        cy.get('div[class*=text]:last-of-type').eq(-1).should('have.text', 'tail');
    })
    it('Элемент корректно удаляется из tail', (): void => {
        cy.get('input').eq(0).type('1234');
        cy.get('button').eq(2).click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('button').eq(4).click();
        cy.get(DIV_CIRCLE_LIST_CHANGING).should('be.visible').should('have.text', '1234');
        cy.get('p[class*=text_type_circle]').eq(-2).should('have.text', '');
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('div[class*=text]:first-of-type').eq(0).should('have.text', 'head');
        cy.get('div[class*=text]:last-of-type').eq(-1).should('have.text', 'tail');
    })
    it('Элемент корректно добавляется по индексу', (): void => {
        cy.get('input').eq(0).type('xxx');
        cy.get('input').eq(1).type('2');
        cy.get('button').eq(5).click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(DIV_CIRCLE_LIST_CHANGING).should('be.visible');
        cy.get('p[class*=text_type_circle]').eq(0).should('have.text', 'xxx');
        cy.get('div[class*=circle_modified] p[class*=text_type_circle]').should('have.text', 'xxx');
    });
    it('Элемент корректно удаляется по индексу', (): void => {
        cy.get('input').eq(1).type('2');
        cy.wait(DELAY_IN_MS);
        cy.get('button').eq(6).click();
        cy.get(CIRCLE).eq(0).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_BORDER_CHANGING_STYLE);
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(CIRCLE).eq(1).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_BORDER_CHANGING_STYLE);
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(CIRCLE).eq(2).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_BORDER_CHANGING_STYLE);
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(CIRCLE).eq(3).should('contain.text', '');
    })
    it('Вводимое в поле input число не может быть больше 4', (): void => {
        cy.get('input').eq(0).type('12345').should('have.value', '1234');
    })
})