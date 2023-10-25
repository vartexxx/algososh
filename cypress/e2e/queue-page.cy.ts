import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";


describe('Приложение корректно отрабатывает компонент QueuePage', (): void => {
    beforeEach((): void => {
        cy.visit('/queue');
        cy.url().should('include', '/queue');
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
        cy.get('[class^="circle_content__"]').eq(0).find('[class^="circle_circle__"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('[class^="circle_content__"]').eq(0).should('contain.text', '1234');
        cy.get('[class^="circle_content__"]').eq(0).find('[class^="circle_circle__"]').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.get('[class^="circle_content__"]').eq(0).find('[class*="circle_index__"]').should('contain.text', '0');
        cy.get('[class^="circle_content__"]').eq(0).find('[class*="circle_head__"]').should('contain.text', 'head');
        cy.get('[class^="circle_content__"]').eq(0).find('[class*="circle_tail60__"]').should('contain.text', 'tail');
        /*Добавляем 2-ой элемент в очередь*/
        cy.get('input').type('56');
        cy.get('button').eq(1).click();
        cy.get('[class^="circle_content__"]').eq(1).find('[class^="circle_circle__"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('[class^="circle_content__"]').eq(1).should('contain.text', '56');
        cy.get('[class^="circle_content__"]').eq(1).find('[class^="circle_circle__"]').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.get('[class^="circle_content__"]').eq(1).find('[class*="circle_index__"]').should('contain.text', '1');
        cy.get('[class^="circle_content__"]').eq(0).find('[class*="circle_head__"]').should('contain.text', 'head');
        cy.get('[class^="circle_content__"]').eq(0).find('[class*="circle_tail60__"]').should('not.contain.text', 'tail');
        cy.get('[class^="circle_content__"]').eq(1).find('[class*="circle_tail60__"]').should('contain.text', 'tail');
        cy.get('[class^="circle_content__"]').eq(1).find('[class*="circle_head__"]').should('not.contain.text', 'head');
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
        cy.get('[class^="circle_content__"]').eq(0).find('[class^="circle_circle__"]').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.get('[class^="circle_content__"]').eq(1).find('[class^="circle_circle__"]').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.get('[class^="circle_content__"]').eq(2).find('[class^="circle_circle__"]').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.get('button').eq(2).click();
        cy.get('[class^="circle_content__"]').eq(0).find('[class^="circle_circle__"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('[class^="circle_content__"]').eq(0).should('not.contain.text');
        cy.get('[class^="circle_content__"]').eq(0).find('[class*="circle_head__"]').should('not.contain.text', 'head');
        cy.get('[class^="circle_content__"]').eq(0).find('[class*="circle_tail60__"]').should('not.contain.text', 'tail');
        cy.get('[class^="circle_content__"]').eq(1).find('[class*="circle_head__"]').should('contain.text', 'head');
        cy.get('[class^="circle_content__"]').eq(1).find('[class*="circle_tail60__"]').should('not.contain.text', 'tail');
        cy.get('[class^="circle_content__"]').eq(2).find('[class*="circle_head__"]').should('not.contain.text', 'head');
        cy.get('[class^="circle_content__"]').eq(2).find('[class*="circle_tail60__"]').should('contain.text', 'tail');
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
        cy.get('[class^="circle_content__"]').each(($el: any): void => {
            cy.wrap($el).should('contain.text', '');
        });
        cy.get('[class^="circle_content__"]').find('[class*="circle_head__"]').each(($el: any): void => {
            cy.wrap($el).should('contain.text', '');
        });
        cy.get('[class^="circle_content__"]').find('[class*="circle_tail60__"]').each(($el :any): void => {
            cy.wrap($el).should('contain.text', '');
        });
    })
})