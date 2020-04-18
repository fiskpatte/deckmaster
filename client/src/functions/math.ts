export const arrayMin = (arr: Array<number>, defaultValue?: number) => {
    let len = arr.length, min = defaultValue || Infinity;
    while (len--) {
        if (arr[len] < min) {
            min = arr[len];
        }
    }
    return min;
};

export const arrayMax = (arr: Array<number>, defaultValue?: number) => {
    let len = arr.length, max = defaultValue || -Infinity;
    while (len--) {
        if (arr[len] > max) {
            max = arr[len];
        }
    }
    return max;
};

export const isBetween = (target: number, lowerValue: number, higherValue: number) => {
    if (target >= lowerValue && target <= higherValue) return true;
    return false;
}