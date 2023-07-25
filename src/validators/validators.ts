function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
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
