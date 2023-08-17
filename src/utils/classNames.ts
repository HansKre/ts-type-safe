/**
 * Helper function to simplify type-safe interaction with classNames.
 * @module classNames
 */

/**
 * __Joins classes and avoids complicated checks and usage of nasty string-literals.__
 *
 * _note: exported also as `cns`-shorthand_
 *
 * @example
 *
 * <div className={cns('primary', !isValid && 'disabled')} />
 *
 * @param names Array of `string`, `undefined` or `false`
 */
function classNames(...names: Array<string | undefined | false>) {
  return names.filter((n) => typeof n === 'string' && n.trim()).join(' ');
}

export { classNames as cns };
