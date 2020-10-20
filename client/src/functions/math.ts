const EPSILON = 0.0001;

/**
 * Returns the smallest value in an array
 * @param arr Array to find smallest value.
 * @param defaultValue Initial minimum value.
 */
export const arrayMin = (arr: Array<number>, defaultValue?: number) => {
  let len = arr.length,
    min = defaultValue || Infinity;
  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
    }
  }
  return min;
};

/**
 * Returns the highest value in an array
 * @param arr Array to find highest value.
 * @param defaultValue Initial maximum value.
 */
export const arrayMax = (arr: Array<number>, defaultValue?: number) => {
  let len = arr.length,
    max = defaultValue || -Infinity;
  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
    }
  }
  return max;
};

/**
 * Checks if a number is between two values (both included).
 * @param target
 * @param lowerValue
 * @param higherValue
 */
export const isBetween = (
  target: number,
  lowerValue: number,
  higherValue: number
) => {
  if (target >= lowerValue && target <= higherValue) return true;
  return false;
};

/**
 * Rounds to nearest decimal point
 * @param value Value to be rounded
 * @param decimalPoint Decimal point to round. Negative or 0 rounds to nearest integer.
 */
export const Round = (value: number, decimalPoint: number) => {
  if (decimalPoint <= 0) return Math.round(value);
  const multiplier = Math.pow(10, decimalPoint);
  return Math.round(value * multiplier + EPSILON) / multiplier;
};

/**
 * Compares two numbers equality
 */
export const isEqual = (value1: number, value2: number) => {
  if (!isFinite(value1) || !isFinite(value2)) return false;
  return (
    Math.abs(value1 - value2) <=
    Math.max(Math.abs(value1), Math.abs(value2)) * EPSILON
  );
};

/**
 * Returns the closest value in an array. If two values in arr have the same difference, the last one is chosen.
 * @param arr Array to find closest value.
 * @param value Value to find.
 */
export const getClosestValueInArray = (value: number, arr: number[]) => {
  if (!isFinite(value)) throw new Error("Not finite value in getClosestValueInArray");
  let min = Infinity,
    diff = undefined,
    closestValue = undefined,
    len = arr.length;
  while (len--) {
    diff = Math.abs(arr[len] - value);
    if (diff < min) {
      min = diff;
      closestValue = arr[len];
    }
  }
  return closestValue;
};
