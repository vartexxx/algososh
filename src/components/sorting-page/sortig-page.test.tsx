import {bubbleSort, selectionSort} from "./utils";


describe('Тестирование алгоритмов сортировки выбором и пузырьком', (): void => {
    test('Тестирование алгоритма сортировки выбором с пустым массивом', (): void => {
        const testArray: number[] = [];
        expect(selectionSort(testArray)).toStrictEqual([]);
    });
    test('Тестирование алгоритма сортировки выбором с одним элементом в массиве', (): void => {
        const testArray: number[] = [1];
        expect(selectionSort(testArray)).toStrictEqual([1]);
    });
    test('Тестирование алгоритма сортировки выбором с массивом из нескольких элементов', (): void => {
        const testArray: number[] = [1, 6, 67, 23, 15, 10, 4, 3, 8, 16];
        expect(selectionSort(testArray)).toStrictEqual([1, 3, 4, 6, 8, 10, 15, 16, 23, 67]);
    });
    test('Тестирование алгоритма сортировки пузырьком с пустым массивом', (): void => {
        const testArray: number[] = [];
        expect(bubbleSort(testArray)).toStrictEqual([]);
    });
    test('Тестирование алгоритма сортировки пузырьком с одним элементом в массиве', (): void => {
        const testArray: number[] = [1];
        expect(bubbleSort(testArray)).toStrictEqual([1]);
    });
    test('Тестирование алгоритма сортировки пузырьком с массивом из нескольких элементов', (): void => {
        const testArray: number[] = [1, 6, 67, 23, 15, 10, 4, 3, 8, 16];
        expect(bubbleSort(testArray)).toStrictEqual([1, 3, 4, 6, 8, 10, 15, 16, 23, 67]);
    });
})