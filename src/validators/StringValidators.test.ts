import * as v from './StringValidators';

test('isString() true for string', () => {
    expect(v.isString('hello')).toEqual(true);
});

test('isString() false for number', () => {
    expect(v.isString(123)).toEqual(false);
});

test('isString() false for null', () => {
    expect(v.isString(null)).toEqual(false);
});

test('isString() false for undefined', () => {
    expect(v.isString(undefined)).toEqual(false);
});

test('isString() false for object', () => {
    expect(v.isString({})).toEqual(false);
});

test('isString() false for array', () => {
    expect(v.isString([])).toEqual(false);
});

test('isMinLength() to throw for undefined string', () => {
    expect(() => {
        v.isMinLength(undefined, undefined)
    }).toThrow();
});

test('isMinLength() to throw for undefined length', () => {
    expect(() => {
        v.isMinLength("", undefined)
    }).toThrow();
});

test('isMinLength() to throw for non strings', () => {
    expect(() => {
        v.isMinLength(53, undefined)
    }).toThrow();
});

test('isMinLength() is false for less than length', () => {
    expect(v.isMinLength("12", 3)).toEqual(false);
});

test('isMinLength() is true for equal', () => {
    expect(v.isMinLength("12", 2)).toEqual(true);
});

test('isMinLength() is true for more than length', () => {
    expect(v.isMinLength("1234", 2)).toEqual(true);
});

test('isMaxLength() to throw for undefined string', () => {
    expect(() => {
        v.isMaxLength(undefined, undefined)
    }).toThrow();
});

test('isMaxLength() to throw for undefined length', () => {
    expect(() => {
        v.isMaxLength("", undefined)
    }).toThrow();
});

test('isMaxLength() to throw for non strings', () => {
    expect(() => {
        v.isMaxLength(53, undefined)
    }).toThrow();
});

test('isMaxLength() is false for more than length', () => {
    expect(v.isMaxLength("12567", 3)).toEqual(false);
});

test('isMaxLength() is true for equal', () => {
    expect(v.isMaxLength("12", 2)).toEqual(true);
});

test('isMaxLength() is true for less than length', () => {
    expect(v.isMaxLength("", 2)).toEqual(true);
});

test('matchPattern() to throw for undefined string', () => {
    expect(() => {
        v.matchPattern(undefined, undefined)
    }).toThrow();
});

test('matchPattern() to throw for undefined pattern', () => {
    expect(() => {
        v.matchPattern("", undefined)
    }).toThrow();
});

test('matchPattern() to throw for non strings', () => {
    expect(() => {
        v.matchPattern(53, undefined)
    }).toThrow();
});

test('matchPattern() is true for empty regex', () => {
    expect(v.matchPattern("12345", "")).toEqual(true);
})

test('matchPattern() is false for non match', () => {
    expect(v.matchPattern('12345', '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$')).toEqual(false);
})

test('matchPattern() is true for match', () => {
    expect(v.matchPattern('123-4234', '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$')).toEqual(true);
})