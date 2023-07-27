export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ValueOf<T> = T[keyof T];

/**
 * __New type with keys of a given type__
 *
 * @example
 *
 * const Foo = { A: "a", B: "b"};
 * type FooKeys = Keys<typeof Foo>;
 * // type FooKeys = "A" | "B"
 *
 * equivalent to: type FooKeys = keyof typeof Foo;
 */
export type KeysOf<T> = keyof T;
