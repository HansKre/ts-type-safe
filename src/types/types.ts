/**
 * Helper types to improve type-safety.
 * @module types
 */

// https://github.com/jsdoc2md/jsdoc-to-markdown/wiki/How-to-document-TypeScript#jsdoc-comments-disappear
let STUB = 1;

/**
 * Helper type to show all properties of a complex base-type
 *
 * @typedef {Prettify} Prettify<T>
 * Constructed type is 100% compatible and assignable to base-type
 *
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

STUB = 1;

/**
 * Helper type to generate values of a given type
 *
 * NOTE: not for enum-types!
 *
 * To create values of an enum-type, use:
 *
 * ```
 * type EnumVals = `${EnumType}`;
 * ```
 *
 * @example
 *
 * const Foo = { A: "a", B: "b"} as const;
 * type FooVals = ValuesOf<typeof Foo>;
 * // type FooVals = "a" | "b"
 *
 * // equivalent to: type FooVals = (typeof Foo)[keyof typeof Foo];
 *
 * @typedef {ValuesOf} ValuesOf<T>
 */
export type ValuesOf<T> = T[keyof T];

STUB = 1;

/**
 * Helper type to generate keys of a given type
 *
 * @example
 *
 * const Foo = { A: "a", B: "b"};
 * type FooKeys = KeysOf<typeof Foo>;
 * // type FooKeys = "A" | "B"
 *
 * // equivalent to: type FooKeys = keyof typeof Foo;
 *
 * @typedef {KeysOf} KeysOf<T>
 */
export type KeysOf<T> = keyof T;

STUB = 1;
