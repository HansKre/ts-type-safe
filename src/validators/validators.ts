function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

export function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null;
}

/**
 * Checks existence of @propKey on an object and retypes the @obj
 */
export function hasOwnProperty<Y extends PropertyKey>(
  obj: unknown,
  propKey: Y
): obj is Record<Y, unknown> {
  return isObject(obj) && propKey in obj;
}

export function hasOwnProperties<Y extends PropertyKey>(
  obj: unknown,
  propKeys: Y[]
): obj is Record<Y, unknown> {
  return isObject(obj) && propKeys.every((propKey) => propKey in obj);
}

export function isNonEmptyArray(obj: unknown): obj is unknown[] {
  return Array.isArray(obj) && obj.length > 0;
}

export function isEmptyArray(obj: unknown): obj is unknown[] {
  return Array.isArray(obj) && obj.length === 0;
}

/**
 * __Typeguard for enums-keys__
 *
 * @example
 * enum MyEnum {
 *  Thing1 = 'thing one',
 *  Thing2 = 'thing two',
 * }
 *
 * function testKeys(key: keyof typeof MyEnum) {
 *   console.log(key, MyEnum[key]);
 * }
 *
 * const testStr = "Thing2";
 *
 * if (isEnumKey(MyEnum, testStr)) {
 *   // compiler knows that testStr is of type `keyof typeof MyEnum`
 *   testKeys(testStr);
 * }
 */
export function isEnumKey<T extends Record<PropertyKey, unknown>>(
  enumType: T,
  value: unknown
): value is keyof T {
  return Boolean(Object.keys(enumType).find((k) => k === value));
}

/**
 * https://stackoverflow.com/questions/58278652/generic-enum-type-guard
 *
 */
export function isEnumValueGenerator<T extends Record<string, unknown>>(
  enumType: T
) {
  const typeGuard = (value: unknown): value is T[keyof T] =>
    Object.values(enumType).includes(value as T[keyof T]);
  return typeGuard;
}

/**
 * __Typeguard for enum values__
 *
 * @TODO: take care of number-Enums
 *
 * @example
 *
 * enum MyEnum {
 *  Thing1 = 'thing one',
 *  Thing2 = 'thing two',
 * }
 *
 * function testVals(val: MyEnum) {
 *   console.log("testVals", val);
 * }
 *
 * const testStr = "thing two";
 *
 * if (isEnumValue(MyEnum, testStr)) {
 *   // compiler knows that testStr is of type `MyEnum`
 *   testVals(testStr);
 * }
 *
 * @param enumType
 * @param value
 */
export function isEnumValue<T extends Record<string, unknown>>(
  enumType: T,
  value: unknown
): value is T[keyof T] {
  return Object.values(enumType).includes(value as T[keyof T]);
}

/**
 *
 * @example
 *
 * // The following enum is considered a "numbers-enum"
 * enum E {
 *   A,
 *   B,
 *   C,
 * }
 *
 * // enum-keys are also values
 * console.log(Object.values(E));
 * // ["A", "B", "C", 0, 1, 2]
 */
export function isEnumValueWithNumbers<T extends Record<string, unknown>>(
  enumType: T,
  value: unknown
): value is T[keyof T] {
  const valuesAndMaybeKeys = Object.values(enumType);
  // filter out keys from values
  // TODO: below code does not work if keys and values have same value
  // TODO: better approach: filter out all digits: if the filteredOutArr has half length of original array -> we have a numbers-enum -> take the numbers-arr as values, else use above method.
  const onlyValues = valuesAndMaybeKeys.filter(
    (v) => !Object.keys(enumType).includes(v as any)
  );
  return onlyValues.includes(value as T[keyof T]);
}

function isEnumValueNum<T extends Record<string, unknown>>(
  enumType: T,
  value: unknown
): value is T[keyof T] {
  // keys cannot be numbers
  // even in case of numbers-enums like `enum N = { A, B, C}`,
  // which yields `console.log(Object.keys(N))` as `// ["0", "1", "2", "A", "B", "C"]`,
  // we are able to extract actual keys
  // in a mixed scenario with non-number-values, we'll have values in `maybeKeys`, but
  // these values will not be able to map in `enumType[k]`
  const maybeKeys = Object.keys(enumType).filter((k) => {
    return !/^\d/.test(k);
  });
  const values = maybeKeys.map((k) => {
    return enumType[k];
  });
  // console.log("values", values);
  return values.includes(value);
}

// console.log(isEnumValueNum(Num3, "foo"));
// console.log(isEnumValueNum(Num3, 1));
// console.log(isEnumValueNum(MyEnum, "thing one"));
// console.log(isEnumValueNum(NumX, 1));
// console.log(isEnumValueNum(E, 1));
