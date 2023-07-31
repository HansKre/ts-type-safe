/**
 * Helper function to simplify type-safe work with classNames.
 * @module classNames
 */

/**
 * Helper-Function to join multiple classes and to avoid usage of nasty string-literals
 */
function classNames(...names: Array<string | undefined | false>) {
  return names.filter((n) => typeof n === 'string' && n.trim()).join(' ');
}

export { classNames as cns };
