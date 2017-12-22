import * as v from './ArrayValidators';

test('isArray() is true for array', () => {
  expect(v.isArray([])).toEqual(true);
});
test('isArray() is false for string', () => {
  expect(v.isArray("hello")).toEqual(false);
});
test('isArray() is false for null', () => {
  expect(v.isArray(null)).toEqual(false);
});
test('isMinCount() to throw for undefined array', () => {
  expect(() => {
    v.isMinCount(undefined, undefined);
  }).toThrow();
});
test('isMinCount() to throw for undefined length', () => {
  expect(() => {
    v.isMinCount([], undefined);
  }).toThrow();
});
test('isMinCount() is true for length 0', () => {
  expect(v.isMinCount([], 0)).toEqual(true);
});
test('isMinCount() is false for length 1', () => {
  expect(v.isMinCount([], 1)).toEqual(false);
});
test('isMaxCount() to throw for undefined array', () => {
  expect(() => {
    v.isMaxCount(undefined, undefined);
  }).toThrow();
});
test('isMaxCount() to throw for undefined length', () => {
  expect(() => {
    v.isMaxCount([], undefined);
  }).toThrow();
});
test('isMaxCount() is true for length 0', () => {
  expect(v.isMaxCount([], 0)).toEqual(true);
});
test('isMaxCount() is false for length 2', () => {
  expect(v.isMaxCount([1, 2, 3], 2)).toEqual(false);
});
test('isUnique() to throw for undefined array', () => {
  expect(() => {
    v.isUnique(undefined);
  }).toThrow();
});
test('isUnique() is true for empty array', () => {
  expect(v.isUnique([])).toEqual(true);
})
test('isUnique() is true for unique array', () => {
  expect(v.isUnique([1, 2, 3, 4, 5])).toEqual(true);
});
test('isUnique() is false for array with duplicates', () => {
  expect(v.isUnique([1, 2, 3, 2, 4])).toEqual(false);
});

