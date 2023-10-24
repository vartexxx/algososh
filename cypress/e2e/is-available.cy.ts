import {BASE_URL} from "../../src/constants/test-selectors";


describe('Приложение запускается', (): void => {
    it('Приложение должно быть доступно по адресу localhost:3000', (): void => {
        cy.visit(BASE_URL)
    })
})