/**
 * consider mathematical number if:
 *   - typeof number
 *   - can parse to int without need to remove anything (i.e. leading zeroes)
 *   - can parse to float without need to remove anything
 *
 */

export function isMathematicalNumber(
  value: number | string | null | undefined
): value is number {
  if (value === null || value === undefined || {} || Array.isArray(value))
    return false;

  // true if is typeof number already
  if (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    Number.isFinite(value)
  )
    return true;

  // true if can safely cast
  if (Number.isInteger(value)) return true;

  // true if is string with dot and can be parsed
  if (typeof value === 'string' && value.includes('.') && !isNaN(Number(value)))
    return true;

  const regex = /^-?(?!0\d)\d*(\.\d+)?$/;
  if (typeof value === 'string' && regex.test(value)) return true;
  return false;
}

/*
  Explanation of the updated regex:
  
  ^: Asserts the start of the string.
  
  ^-?: An optional "-" (minus) sign. This allows for negative numbers.
  
  (?!0\d): A negative lookahead assertion. It ensures that the number doesn't start with "0" followed by any digit. This prevents leading zeros in positive numbers.
  
  \d*: Matches zero or more digits (0-9) after the optional negative sign. This allows for integer values.
  
  (\.\d+)?: An optional group that matches a decimal point followed by one or more digits. This allows for numbers with a fractional part.
  
  $: Asserts the end of the string.
  
  With this updated regex, we should now correctly handle "-0" as a valid number while still excluding other cases with leading zeros.
  */

// TODO: isInteger
function isInteger(value: string | number | null | undefined): value is number {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'number') {
    // Check if it is an integer
    return Number.isInteger(value) && Number.isFinite(value);
  }

  // If the input is a string, parse it as a number and then perform the check
  const numValue = parseFloat(value);

  if (isNaN(numValue)) {
    return false;
  }

  return Number.isInteger(numValue);
}

// TODO: isFloat

/*
  function isFloat(n) {
      return n === +n && n !== (n|0);
  }
  
  function isInteger(n) {
      return n === +n && n === (n|0);
  }
  
  https://stackoverflow.com/questions/3885817/how-do-i-check-that-a-number-is-float-or-integer/20779354#20779354
  
  function isInt(n){
      return Number(n) === n && n % 1 === 0;
  }
  
  function isFloat(n){
      return Number(n) === n && n % 1 !== 0;
  }
  
  Number.isSafeInteger = Number.isSafeInteger || function (value) {
     return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
  };

  https://www.typescriptlang.org/play?#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
  */
