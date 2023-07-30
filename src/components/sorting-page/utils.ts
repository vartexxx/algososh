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
