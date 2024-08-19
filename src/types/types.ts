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
 * Helper type to recursively remove all '?' and 'undefined' from all properties
 *
 * @example
 *
 * type Settings = {
 *   org: string;
 *   repo?: string;
 *   owner?: {
 *       profileUrl?: string;
 *       contact: {
 *         name: string;
 *         mail: string;
 *       } | undefined;
 *   };
 * };
 * type ReqSettings = DeepRequired<Settings>;
 * // type ReqSettings = {
 * //     org: string;
 * //     repo: string;
 * //     owner: {
 * //         profileUrl: string;
 * //         contact: {
 * //             name: string;
 * //             mail: string;
 * //         };
 * //     };
 * // }
 *
 * @typedef {DeepRequired} DeepRequired<T>
 */
export type DeepRequired<T> = T extends Function
  ? T
  : T extends Array<infer U>
  ? Array<DeepRequired<U>>
  : T extends object
  ? { [K in keyof T]-?: DeepRequired<NonNullable<T[K]>> }
  : T;

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

// Below type does not work with nested optional or undefined properties, hence it is an intermediate helper to be composed with DeepRequired
type DeepKeysOfHelper<TBase, TPrefix extends string = ''> = {
  [K in keyof TBase]-?: TBase[K] extends object
    ? K extends string
      ? `${TPrefix}${K}` | DeepKeysOfHelper<TBase[K], `${TPrefix}${K}.`>
      : never
    : K extends string
    ? `${TPrefix}${K}`
    : never;
}[keyof TBase];

/**
 * Helper type recursively generates a union type of all keys of a given type. The nested keys are prefixed by the parent property's key.
 *
 * @example
 *
 * type Settings = {
 *   org: string;
 *   repo?: string;
 *   owner?: {
 *       profileUrl?: string;
 *       contact: {
 *         name: string;
 *         mail: string;
 *       } | undefined;
 *   };
 * };
 * type SettingKey = DeepKeysOf<Settings>;
 * // type SettingKey = "org" | "owner" | "owner.contact" | "owner.contact.name" | "owner.contact.mail" | "owner.profileUrl" | "repo";
 *
 * TypeScript Playground Link: https://www.typescriptlang.org/pt/play/?#code/C4TwDgpgBA0hIGcDyAzA6gS2ACwHIQWAgBMAFAJwhQwA8AeAFQCEBDBCAGigYqtqgg0iAO2IIohchmEBzKAF4oAciUA+BVADeAKChQA2jCjSoAa3gB7FN1bsAugFoA-AC4bbCIbsChEUeIsAIwArCABjYF09KCdYHxExCWApWSjomKgAAwASTR5KahoAX1yYIsyoAB9YeGR0LDwCIjIC2kZbTxg7Lhy83kKSzTKAOkzVNOi3YQgANwhyCbcjQQTxSWkZCdje-L5i0vLFqGm58gBubSL9cxArd3sL7VBIKABlCGBgDfFFHT0LcgyNzrWQXPSUMAWVxJFIyMFQCwAd2m5Ghf3SUDA5CsGAANhAAKrkXHQkFwiZ6MIWYTAFgRNzojHHFgAWwgwOSG3hTJZLDxHNh3OiRSqUAArqI+NNiPCihc5donuBoAARCAQMAAJQgAEcxRhKMRGOpFAx4n5EgAxCURDDUqKxBhRNxmlYW8QAQXI5BYIDo0hQ8ygBPGeliXp9frVGu1eoNJDoIdDUBd5v8CJC4UiYa0BiMJhudwYjmh0a1uv1hrouGpuDFuNxLEC+MYXlU6iKzu4j2e0Fj70+3w0ZdjlYTA6+sgQqh7yreH0nMjgIA0y7qmBw+EIJH6bRHFfjRon33bjypwkIEgXG2XbmPsmXGgAREiUcNz7SIsNeXin2cgA
 *
 * @typedef {DeepKeysOf} DeepKeysOf<TBase, TPrefix extends string = ''>
 */
export type DeepKeysOf<T> = DeepKeysOfHelper<DeepRequired<T>>;

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
