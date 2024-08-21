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
 * Helper type to recursively make all child properties partial.
 *
 * @example
 *
 * type Foo = {
 *     bar: string;
 *     baz: {
 *         foo: [
 *             bam: string;
 *         ]
 *     }
 * }
 *
 * type Foo2 = DeepPartial<Foo>;
 *
 * // type Foo2 = {
 * //     bar?: string | undefined;
 * //     baz?: {
 * //         foo?: [bam?: string | undefined] | undefined;
 * //     } | undefined;
 * // }
 *
 * @typedef {DeepPartial} DeepPartial<T>
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
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
  [K in keyof TBase]-?: TBase[K] extends (infer U)[]
    ? U extends object
      ?
          | `${TPrefix}${K & string}`
          | `${TPrefix}${K & string}[${number}]`
          | DeepKeysOfHelper<U, `${TPrefix}${K & string}[${number}].`>
      : `${TPrefix}${K & string}[${number}]`
    : TBase[K] extends object
    ?
        | `${TPrefix}${K & string}`
        | DeepKeysOfHelper<TBase[K], `${TPrefix}${K & string}.`>
    : `${TPrefix}${K & string}`;
}[keyof TBase];

/**
 * Helper type recursively generates a union type of all keys of a given type. The nested keys are prefixed by the parent property's key. Array elements are indexed.
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
 *   messages: {
 *     title: string;
 *     body: string;
 *   }[];
 * };
 * type SettingKey = DeepKeysOf<Settings>;
 * // type SettingKey = "org" | "owner" | "owner.contact" | "owner.contact.name" | "owner.contact.mail" | "owner.profileUrl" | "repo" | "messages" | "messages[0]" | "messages[0].title" | "messages[0].body";
 *
 * TypeScript Playground Link: https://www.typescriptlang.org/pt/play/?#code/KYDwDg9gTgLgBDAnmYcAixhgErAI4CuAllMACYA8AKgHxwC8cVcoMwAdmQM5wBiB7AMYwiEdgCg4cAPxNJcAFxMWINpx4BBKFACGiCkXYAzYFDgBVGvNlbd+jFlyES5CpatSlzVh25wIAEYAVsDC1nAA3nAA2gDScIZwANbAiBBGTAC6ALTSSg44+MSklAByYqUEADZVOgFVwNRxmTR0AL7yXgDc4uJIKOiYYLGpXADyRgASwFUoUNQAQjpcwAA0TAAKpEZEICpqflwwUIYA5gxwAESXdIwR8nEJ7Mmp6UxLKzl578vAzfu+HgACkMJjM5gAlNFMvIpLJzAD1P5gqEYLCpDJ0RiMQAfOAAAwAJBEqFtgDsQG1ifEAGRwI4ndinNr4rHYuB4okkskUqkRWn045nNrRYnsAgAWwCpjamVZ7PZeIKI0Q4ymMzmbnWXNJ212fIFDOFooi4qlMsyADp8R52UodTz9dS4HSjUyRWLJdKoLL5RivB8-rFMoi-IEQmEFdI2djOcTdeSnfyXYLGcy-QqpEqhiq1dNZqZFr9mtr447Kc7XUL3dbbdj7WW9RXk1W0yyeiKUmkMlRA5keuJQJBYAhkKhlaMJtRboMsLmJvnNQUnMVXLQaAP+qgAMrAGAiJk8O7yaCnJRu049KSkSDfC9X-wAd3Ypm+9wVYCg6SIDXMUCqd7VpebKCGIMA6MISjvpm7A6BKwDnkBD4KhKOg-ohabIRibQcnAAhkImL5kA+bQPvBXBcDopzAFwb6wiIMANBhZzIQEEBkIgzFMiR0IdpuY5wLu+5nCqFwTqqU5CQepxcBuvSgewRz0nu0kqgAjEoUkiakFyXBAz6mJaCngcIlqoT+lw9ApSkrMJTIqgATJpKnaYgunkZR1FcNEakOQAzFaDENJZQA
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
