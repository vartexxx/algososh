export const reverseString = (arr: string[]) => {
    let newArr: string[] = arr;
    let start: number = 0;
    let end: number = newArr.length - 1;
    while (start < end) {
        const stroke: string = newArr[start];
        newArr[start] = newArr[end];
        newArr[end] = stroke;
        start++;
        end--;
    }
    return newArr;
};