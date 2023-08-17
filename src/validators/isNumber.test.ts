import { isMathematicalNumber } from './isNumber';

const tests = [
  { label: '1', value: 1, expect: true },
  // { label: "'1'", value: '1', expect: true },
  // { label: "'01'", value: '01', expect: false },
  // { label: "'0001'", value: '0001', expect: false },
  // { label: "'00.01'", value: '00.01', expect: false },
  // { label: '1.1', value: 1.1, expect: true },
  // { label: "'1.1'", value: '1.1', expect: true },
  // { label: '0', value: 0, expect: true },
  // { label: "'0'", value: '0', expect: true },
  // { label: "'-0'", value: '-0', expect: true },
  // { label: "'-0.0'", value: '-0.0', expect: true },
  // { label: "'-0.0000'", value: '-0.00000', expect: true },
  // { label: "'-0.00001'", value: '-0.000001', expect: true },
  // { label: "'0.00001'", value: '0.000001', expect: true },
  // { label: '0.2abc', value: '0.2abc', expect: false },
  // { label: '0.2,3', value: '0.2,3', expect: false },
  // { label: '-0.2', value: -0.2, expect: true },
  // { label: "'-0.2'", value: '-0.2', expect: true },
  // { label: 'Infinity', value: Infinity, expect: false },
  // { label: 'undefined', value: undefined, expect: false },
  // { label: 'null', value: null, expect: false },
];

describe('isNumber', () => {
  for (const test of tests) {
    it(`should${test.expect ? '' : 'not'} pass for: ${test.label}`, () => {
      expect(isMathematicalNumber(test.value)).toBe(test.expect);
    });
  }
});
