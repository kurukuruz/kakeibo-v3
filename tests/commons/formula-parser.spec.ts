import { parseFormula } from '../../src/commons/formula-parser';

test('2+3', () => {
  expect(parseFormula('2+3')).toBe(5);
});

test('4-2', () => {
  expect(parseFormula('4-2')).toBe(2);
});

test('3*4', () => {
  expect(parseFormula('3*4')).toBe(12);
});

test('9/3', () => {
  expect(parseFormula('9/3')).toBe(3);
});

test('12+34', () => {
  expect(parseFormula('12+34')).toBe(46);
});

test('1+11+111', () => {
  expect(parseFormula('1+11+111')).toBe(123);
});

test('1+2*3-4/2', () => {
  expect(parseFormula('1+2*3-4/2')).toBe(5);
});
