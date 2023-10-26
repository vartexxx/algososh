import {ElementStates, SortTypes} from "../../types/element-states";


export const randomArr = (): SortTypes[] => {
    const minLen: 3 = 3;
    const maxLen: 17 = 17;
    const len: number = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    const arr: SortTypes[] = [];
    for (let i: number = 0; i < len; i++) {
        const randInt: number = Math.floor(Math.random() * 101);
        arr.push({ index: randInt, state: ElementStates.Default });
    }
    return arr;
};
export const swap = (
    value: SortTypes[],
    firstItem: number,
    secondItem: number
    ): [SortTypes, SortTypes] => {
        return ([value[firstItem], value[secondItem]] = [value[secondItem], value[firstItem],]);
};

export const selectionSort = (array: number[]) => {
    const newArray: number[] = [...array];
    const arrayLength: number = newArray.length - 1;
    for (let i: number = 0; i <= arrayLength; i++) {
        let minIndex: number = i;
        for (let j: number = i + 1; j <= arrayLength + 1; j++) {
            if (newArray[j] < newArray[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            const stroke: number = newArray[i];
            newArray[i] = newArray[minIndex];
            newArray[minIndex] = stroke;
        }
    }
    return newArray;
};

export const bubbleSort = (array: number[]) => {
    const newArray: number[] = [...array];
    const arrayLength: number = newArray.length - 1;
    for (let i: number = 0; i <= arrayLength; i++) {
        for (let j: number = 0; j < arrayLength - i; j++) {
            if (newArray[j] > newArray[j + 1]) {
                const stroke: number = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = stroke;
            }
        }
    }
    return newArray;
};