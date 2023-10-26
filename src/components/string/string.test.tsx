import {reverseString} from "./utils";


describe('Тестирование алгоритма разворота строки', (): void => {
    test('Разворот строки с четным количеством символов', (): void => {
        const arr: string[] = ['q', 'w', 'e', 'r', 't', 'y'];
        expect(reverseString(arr)).toStrictEqual(['y', 't', 'r', 'e', 'w', 'q']);
    })
    test('Разворот строки с нечетным количеством символов', (): void => {
        const arr: string[] = ['q', 'w', 'e', 'r', 't'];
        expect(reverseString(arr)).toStrictEqual(['t', 'r', 'e', 'w', 'q']);
    });
    test('Разворот строки с одним символом', (): void => {
        const arr: string[]  = ['q'];
        expect(reverseString(arr)).toStrictEqual(['q']);
    });
    test('Разворот пустой строки', (): void => {
        const arr: string[]  = [''];
        expect(reverseString(arr)).toStrictEqual(['']);
    });
})