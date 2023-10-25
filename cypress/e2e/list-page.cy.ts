import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../src/constants/delays";


describe('Приложение корректно отрабатывает компонент ListPage', (): void => {
    beforeEach((): void => {
        cy.visit('/list');
        cy.url().should('include', '/list');
        cy.get('input').each(($el: HTMLElement): void => cy.wrap($el).should('have.value', ''));
    })
    it('Все кнопки добавления недоступны, если поле input пусто и списка нет', (): void => {
        cy.get('button').eq(1).should('be.disabled');
        cy.get('button').eq(2).should('be.disabled');
        cy.get('button').eq(5).should('be.disabled');
        cy.get('button').eq(6).should('be.disabled');
    })
    it('Дефлотный список корректно отрисовывается', (): void => {
        cy.get('div[class*=circle_content]').should(($div: HTMLDivElement): void => {
            if ($div.length <= 0 || $div.length > 4) {
                throw new Error('Длина списка не может быть меньше 1 и больше 4');
            }
        })
        cy.get('div[class*=circle_content] div[class*=text]:first-of-type').should('have.text', 'head');
        cy.get('div[class*=circle_content] div[class*=text]:last-of-type').should('have.text', 'tail');
        cy.get('div[class*=circle_content] p[class*=text_type_circle]').each(($el: HTMLElement): void =>
            cy.wrap($el).should(($el: HTMLElement) => {
                if ($el.length <= 0 || $el.length > 4) {
                    throw new Error('Длина списка не может быть меньше 1 и больше 4');
                }
            }),
        );
    })
    it('Элемент корректно добавляется в head', (): void => {
        cy.get('input').eq(0).type('1234');
        cy.get('button').eq(1).click();
        cy.get('div[class*=circle_content] div[class*=text]:first-of-type').should('have.text', '1234');
        cy.get('div[class*=circle_changing]').should('be.visible');
        cy.get('div[class*=circle_modified]').eq(0).should('be.visible');
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('div[class*=circle_default] p[class*=text]:first-of-type').eq(0).should('have.text', '1234');
        cy.get('div[class*=circle_content] div[class*=text]:first-of-type').should('have.text', 'head');
        cy.get('div[class*=circle_content] div[class*=text]:last-of-type').should('have.text', 'tail');
    })
    it('Элемент корректно добавляется в tail', (): void => {
        cy.get('input').eq(0).type('5678');
        cy.get('button').eq(2).click();
        cy.get('div[class*=circle_changing]').should('be.visible').should('have.text', '5678');
        cy.get('div[class*=circle_modified]').should('be.visible').should('have.text', '5678');
        cy.get('div[class*=circle_content] div[class*=text]:first-of-type').should('have.text', 'head');
        cy.get('div[class*=circle_content] div[class*=text]:last-of-type').should('have.text', 'tail');
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('p[class*=text_type_circle]').eq(-1).should('have.text', '5678');
    })
    it('Элемент корректно удаляется из head', (): void => {
        cy.get('input').eq(0).type('1234');
        cy.get('button').eq(1).click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('button').eq(3).click();
        cy.get('div[class*=circle_changing]').should('be.visible').should('have.text', '1234');
        cy.get('p[class*=text_type_circle]').eq(0).should('have.text', '');
        cy.get('div[class*=text]:first-of-type').eq(0).should('have.text', 'head');
        cy.get('div[class*=text]:last-of-type').eq(-1).should('have.text', 'tail');
    })
    it('Элемент корректно удаляется из tail', (): void => {
        cy.get('input').eq(0).type('1234');
        cy.get('button').eq(2).click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('button').eq(4).click();
        cy.get('div[class*=circle_changing]').should('be.visible').should('have.text', '1234');
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
        cy.get('div[class*=circle_changing]').should('be.visible');
        cy.get('p[class*=text_type_circle]').eq(0).should('have.text', 'xxx');
        cy.get('div[class*=circle_modified] p[class*=text_type_circle]').should('have.text', 'xxx');
    });
    it('Элемент корректно удаляется по индексу', (): void => {
        cy.get('input').eq(1).type('3');
        cy.wait(DELAY_IN_MS);
        cy.get('button').eq(6).click();
        cy.get('[class^="circle_content__"]').eq(0).find('[class^="circle_circle__"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('[class^="circle_content__"]').eq(1).find('[class^="circle_circle__"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('[class^="circle_content__"]').eq(2).find('[class^="circle_circle__"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('[class^="circle_content__"]').eq(3).should('contain.text', '');
        cy.get('[class^="circle_content__"]')
            .eq(3)
            .find('[class*="circle_tail60__"]')
            .find('[class*=circle_small__]')
            .should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.wait(DELAY_IN_MS);
        cy.get('[class^="circle_content__"]').should('have.length', '3');
    })
    it('Вводимое в поле input число не может быть больше 4', (): void => {
        cy.get('input').eq(0).type('12345').should('have.value', '1234');
    })
})