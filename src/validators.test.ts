import { shapeshift, Validators } from './index';

test('validate() throws when schema is not defined', () => {
    expect(() => {
        Validators.validate(null, null);
    }).toThrow();
});

test('validate() thorws when data is not defined', () => {
    expect(() => {
        Validators.validate({}, undefined);
    }).toThrow();
});

test('validate() returns true when type is not defined', () => {
    expect(Validators.validate({}, null)).toEqual(true);
});

test('validate() returns true for string', () => {
    expect(Validators.validate({
        type: 'string'
    }, 'hello')).toEqual(true);
});

test('validate() returns false for string', () => {
    expect(Validators.validateString({
        type: 'string'
    }, 123)).toEqual(false);
});

test('validate() returns false for boolean', () => {
    expect(Validators.validate({
        type: 'boolean'
    }, "hello")).toEqual(false);
});

test('validate() returns true for boolean', () => {
    expect(Validators.validate({
        type: 'boolean'
    }, false)).toEqual(true);
});

test('validate() returns false for array', () => {
    expect(Validators.validate({
        type: 'array'
    }, "hello")).toEqual(false);
});

test('validate() returns true for array', () => {
    expect(Validators.validate({
        type: 'array'
    }, [])).toEqual(true);
});

test('validate() returns false for object', () => {
    expect(Validators.validate({
        type: 'object'
    }, "hello")).toEqual(false);
});

test('validate() returns true for object', () => {
    expect(Validators.validate({
        type: 'object'
    }, {})).toEqual(true);
});

test('validate() returns false for number', () => {
    expect(Validators.validate({
        type: 'number'
    }, "hello")).toEqual(false);
});

test('validate() returns true for number using float', () => {
    expect(Validators.validate({
        type: 'number'
    }, 12.3)).toEqual(true);
});

test('validate() returns true for number using integer', () => {
    expect(Validators.validate({
        type: 'number'
    }, 12)).toEqual(true);
});

test('validate() returns false for integer', () => {
    expect(Validators.validate({
        type: 'integer'
    }, "hello")).toEqual(false);
});

test('validate() returns false for integer using float', () => {
    expect(Validators.validate({
        type: 'integer'
    }, 12.3)).toEqual(false);
});

test('validate() returns true for integer using integer', () => {
    expect(Validators.validate({
        type: 'integer'
    }, 12)).toEqual(true);
})

test('validate() return false for null', () => {
    expect(Validators.validate({
        type: 'null'
    }, "hello")).toEqual(false);
});

test('validate() returns true for null', () => {
    expect(Validators.validate({
        type: 'null'
    }, null)).toEqual(true);
});