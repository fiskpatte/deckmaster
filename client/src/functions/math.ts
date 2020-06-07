const EPSILON = 0.0001;

/**
 * Returns de smallest value in an array
 * @param arr Array to find smallest value.
 * @param defaultValue Initial minimum value.
 */
export const arrayMin = (arr: Array<number>, defaultValue?: number) => {
    let len = arr.length, min = defaultValue || Infinity;
    while (len--) {
        if (arr[len] < min) {
            min = arr[len];
        }
    }
    return min;
};

/**
 * Returns de highest value in an array
 * @param arr Array to find highest value.
 * @param defaultValue Initial maximum value.
 */
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

/**
 * Rounds to nearest decimal point
 * @param value Value to be rounded
 * @param decimalPoint Decimal point to round. Negative or 0 rounds to nearest integer.
 */
export const Round = (value: number, decimalPoint: number) => {
    if (decimalPoint <= 0) return Math.round(value);
    const multiplier = Math.pow(10, decimalPoint);
    return Math.round(value * multiplier + EPSILON) / multiplier;
}