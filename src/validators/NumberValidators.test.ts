import * as v from './NumberValidators';

test('isNumber() is false for string', () => {
    expect(v.isNumber('5.5')).toEqual(false);
});
test('isNumber() is true for number', () => {
    expect(v.isNumber(5.5)).toEqual(true);
});
test('isInteger() is false for float', () => {
    expect(v.isInteger(5.5)).toEqual(false);
});
test('isInteger() is true for integer', () => {
    expect(v.isInteger(5.0)).toEqual(true);
});
test('isGreaterThan() to throw for undefined number', () => {
    expect(() => {
        v.isGreaterThan(undefined, undefined);
    }).toThrow();
});
test('isGreaterThan() to throw for undefined value', () => {
    expect(() => {
        v.isGreaterThan(5, undefined);
    }).toThrow();
});
test('isGreaterThan() is true for value greater than', () => {
    expect(v.isGreaterThan(6, 5)).toEqual(true);
});
test('isGreaterThan() is false for value exclusive greater than', () => {
    expect(v.isGreaterThan(5, 5, true)).toEqual(false);
});
test('isGreaterThan() is false for value less than', () => {
    expect(v.isGreaterThan(4, 5)).toEqual(false);
});
test('isLessThan() to throw for undefined number', () => {
    expect(() => {
        v.isLessThan(undefined, undefined);
    }).toThrow();
});
test('isLessThan() to throw for undefined value', () => {
    expect(() => {
        v.isLessThan(5, undefined);
    }).toThrow();
});
test('isLessThan() is true for value less than', () => {
    expect(v.isLessThan(4, 5)).toEqual(true);
});
test('isLessThan() is false for value exclusive less than', () => {
    expect(v.isLessThan(5, 5, true)).toEqual(false);
});
test('isLessThan() is false for value greater than', () => {
    expect(v.isLessThan(6, 5)).toEqual(false);
});
test('isMultipleOf() to throw for undefined number', () => {
    expect(() => {
        v.isMultipleOf(undefined, undefined);
    }).toThrow();
});
test('isMultipleOf() to throw for undefined value', () => {
    expect(() => {
        v.isMultipleOf(5, undefined);
    }).toThrow();
});
test('isMultipleOf() is false for multiple of 0', () => {
    expect(v.isMultipleOf(5, 0)).toEqual(false);
})
test('isMultipleOf() is true for value of 0', () => {
    expect(v.isMultipleOf(0, 5)).toEqual(true);
})
test('isMultipleOf() is true for value multiple of 2.5', () => {
    expect(v.isMultipleOf(5, 2.5)).toEqual(true);
})
test('isMultipleOf() is false for value multiple of 2', () => {
    expect(v.isMultipleOf(4, 2.5)).toEqual(false);
})