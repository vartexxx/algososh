import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";


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
        cy.get('[class^="circle_content__"]').should('have.length', 4);
        /*Проверка анимации по ходу выполнения*/
        cy.get('[class^="circle_content__"]')
            .eq(0)
            .should('contain.text', 't')
            .find('[class^="circle_circle__"]')
            .should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        //
        cy.get('[class^="circle_content__"]')
            .eq(1)
            .should('contain.text', 'x')
            .find('[class^="circle_circle__"]')
            .should('have.css', 'border', '4px solid rgb(127, 224, 81)');
        //
        cy.get('[class^="circle_content__"]')
            .eq(2)
            .should('contain.text', 'e')
            .find('[class^="circle_circle__"]')
            .should('have.css', 'border', '4px solid rgb(127, 224, 81)');
        //
        cy.get('[class^="circle_content__"]')
            .eq(3)
            .should('contain.text', 't')
            .find('[class^="circle_circle__"]')
            .should('have.css', 'border', '4px solid rgb(127, 224, 81)');
        //
        cy.wait(SHORT_DELAY_IN_MS);
        /*Итоговая проверка анимаций*/
        cy.get('[class^="circle_content__"]')
            .eq(0)
            .should('contain.text', 't')
            .find('[class^="circle_circle__"]')
            .should('have.css', 'border', '4px solid rgb(127, 224, 81)');
        //
        cy.get('[class^="circle_content__"]')
            .eq(1)
            .should('contain.text', 'x')
            .find('[class^="circle_circle__"]')
            .should('have.css', 'border', '4px solid rgb(127, 224, 81)');
        //
        cy.get('[class^="circle_content__"]')
            .eq(2)
            .should('contain.text', 'e')
            .find('[class^="circle_circle__"]')
            .should('have.css', 'border', '4px solid rgb(127, 224, 81)');
        //
        cy.get('[class^="circle_content__"]')
            .eq(3)
            .should('contain.text', 't')
            .find('[class^="circle_circle__"]')
            .should('have.css', 'border', '4px solid rgb(127, 224, 81)');
    })
})