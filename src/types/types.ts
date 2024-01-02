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

/**
 * Helper type to generate prefixed keys of a given type
 *
 * @example
 *
 * const Foo = { A: "a", B: "b"};
 * type FooType = typeof Foo;
 * // type FooType = { "A": string; "B": string; }
 *
 * type PrefixedFooKeys = PrefixedKeys<typeof Foo, 'foo.'>;
 * // type PrefixedFooKeys = { "foo.A": string; "foo.B": string; }
 *
 * @typedef {PrefixedKeys} PrefixedKeys<T, P extends string>
 */
export type PrefixedKeys<T, P extends string> = {
  [K in keyof T as K extends string ? `${P}${K}` : never]: T[K];
};

STUB = 1;

/**
 * Helper type to make a single property optional
 *
 * @example
 *
 * type Person = {
 *   id: string;
 *   name: string;
 *   age: number;
 * };
 *
 * type NewPerson = PartialBy<Person, 'id'>
 * //    ^? type NewPerson = Omit<Person, "id"> & Partial<Pick<Person, "id">>
 * type PrettyNewPerson = Prettify<NewPerson>;
 * //    ^? type PrettyNewPerson = { name: string; age: number; id? : string | undefined; }
 *
 * @example
 *
 * type NewPerson = PartialBy<Person, 'id' | 'age'>;
 * //    ^? type NewPerson = Omit<Person, "id" | "age"> & Partial<Pick<Person, "id" | "age">>
 *
 * @typedef {PartialBy} PartialBy<T, K extends keyof T>
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

STUB = 1;
