/**
 * __Helper type to show all properties of a complex base-type__
 *
 * Constructed type is 100% compatible and assignable to base-type
 *
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * __Helper type generates values of a given type__
 *
 * NOTE: not for enum-types!
 * Use type EnumVals = \`${EnumType}\`; to create values of an enum-type
 *
 * @example
 *
 * const Foo = { A: "a", B: "b"} as const;
 * type FooVals = ValuesOf<typeof Foo>;
 * // type FooVals = "a" | "b"
 *
 * // equivalent to: type FooVals = (typeof Foo)[keyof typeof Foo];
 */
export type ValuesOf<T> = T[keyof T];

/**
 * __Helper type generates keys of a given type__
 *
 * @example
 *
 * const Foo = { A: "a", B: "b"};
 * type FooKeys = KeysOf<typeof Foo>;
 * // type FooKeys = "A" | "B"
 *
 * // equivalent to: type FooKeys = keyof typeof Foo;
 */
export type KeysOf<T> = keyof T;
