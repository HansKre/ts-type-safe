/**
 * Validators to improve type-safety.
 * @module validators
 */

/**
 * Checks if value is not `null` and of `object`-type.
 *
 * @param value to check
 */
function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

/**
 * Returns `true` if value is not `undefined` and not `null`.
 *
 * @param value to check
 */
export function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null;
}

/**
 * Checks existence of @propKey on an object and retypes the `@obj` as an object having that property of `unknown`-type.
 *
 * @param obj to check
 * @param propKey which may or may not exist on the `obj`
 */
export function hasOwnProperty<Y extends PropertyKey>(
  obj: unknown,
  propKey: Y
): obj is Record<Y, unknown> {
  return isObject(obj) && propKey in obj;
}

/**
 * Checks existence of @propKeys on an object and retypes the `@obj` as an object having these properties, all of which of `unknown`-type.
 *
 * @param obj to check
 * @param propKeys list of `@propKeys` which may or may not exist on the `obj`
 */
export function hasOwnProperties<Y extends PropertyKey>(
  obj: unknown,
  propKeys: Y[]
): obj is Record<Y, unknown> {
  return isObject(obj) && propKeys.every((propKey) => propKey in obj);
}

/**
 * Checks if @obj is an array with at least one entry.
 *
 * @param obj to check
 */
export function isNonEmptyArray(obj: unknown): obj is unknown[] {
  return Array.isArray(obj) && obj.length > 0;
}

/**
 * Checks if @obj is an array with zero entries.
 *
 * @param obj to check
 */
export function isEmptyArray(obj: unknown): obj is unknown[] {
  return Array.isArray(obj) && obj.length === 0;
}

/**
 * Typeguard for enums-keys
 *
 * _note: not for number-enums_
 *
 * @example
 * enum MyEnum {
 *  Thing1 = 'thing one',
 *  Thing2 = 'thing two',
 * }
 *
 * function onlyKeys(key: keyof typeof MyEnum) {
 *   console.log(key, MyEnum[key]);
 * }
 *
 * const testStr = "Thing2";
 *
 * if (isEnumKey(MyEnum, testStr)) {
 *   // compiler knows that testStr is of type `keyof typeof MyEnum`
 *   onlyKeys(testStr);
 * }
 *
 * @param enumType the type to check against
 * @param value some value to check if it is a key of the given `@enumType`
 */
export function isEnumKey<T extends Record<PropertyKey, unknown>>(
  enumType: T,
  value: unknown
): value is keyof T {
  return Boolean(Object.keys(enumType).find((k) => k === value));
}

// initial inspiration for isEnumValue
//
// https://stackoverflow.com/questions/58278652/generic-enum-type-guard
// export function isEnumValueGenerator<T extends Record<string, unknown>>(
//   enumType: T
// ) {
//   const typeGuard = (value: unknown): value is T[keyof T] =>
//     Object.values(enumType).includes(value as T[keyof T]);
//   return typeGuard;
// }

/**
 * Typeguard for enum values
 *
 * _note: not for number-enums_
 *
 * @example
 *
 * enum MyEnum {
 *  Thing1 = 'thing one',
 *  Thing2 = 'thing two',
 * }
 *
 * function onlyVals(val: MyEnum) {
 *   console.log("onlyVals", val);
 * }
 *
 * const testStr = "thing two";
 *
 * if (isEnumValue(MyEnum, testStr)) {
 *   // compiler knows that testStr is of type `MyEnum`
 *   onlyVals(testStr);
 * }
 *
 * @param enumType the type to check against
 * @param value some value to check if it is a value of the given `@enumType`
 */
export function isEnumValue<T extends Record<string, unknown>>(
  enumType: T,
  value: unknown
): value is T[keyof T] {
  return Object.values(enumType).includes(value as T[keyof T]);
}
