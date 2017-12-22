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

test('validate() returns true for string using string', () => {
  expect(Validators.validate({
    type: 'string'
  }, 'hello')).toEqual(true);
});

test('validate() returns false for string using number', () => {
  expect(Validators.validateString({
    type: 'string'
  }, 123)).toEqual(false);
});

test('validate() returns false for boolean using string', () => {
  expect(Validators.validate({
    type: 'boolean'
  }, "hello")).toEqual(false);
});

test('validate() returns true for boolean using false', () => {
  expect(Validators.validate({
    type: 'boolean'
  }, false)).toEqual(true);
});

test('validate() returns false for array using string', () => {
  expect(Validators.validate({
    type: 'array'
  }, "hello")).toEqual(false);
});

test('validate() returns true for array using empty array', () => {
  expect(Validators.validate({
    type: 'array'
  }, [])).toEqual(true);
});

test('validate() returns false for object using string', () => {
  expect(Validators.validate({
    type: 'object'
  }, "hello")).toEqual(false);
});

test('validate() returns true for object using empty object', () => {
  expect(Validators.validate({
    type: 'object'
  }, {})).toEqual(true);
});

test('validate() returns false for number using string', () => {
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

test('validate() returns false for integer using string', () => {
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

test('validate() return false for null using string', () => {
  expect(Validators.validate({
    type: 'null'
  }, "hello")).toEqual(false);
});

test('validate() returns true for null using null', () => {
  expect(Validators.validate({
    type: 'null'
  }, null)).toEqual(true);
});

test('validate() returns true for compound string', () => {
  expect(Validators.validate({
    type: 'string',
    minLength: 2,
    maxLength: 5,
    pattern: '^hello$'
  }, 'hello')).toEqual(true);
});

test('validate() returns true for compound integer', () => {
  expect(Validators.validate({
    type: 'integer',
    minimum: 2.5,
    maximum: 4.5
  }, 3)).toEqual(true);
});
test('validate() returns true for compound number', () => {
  expect(Validators.validate({
    type: 'number',
    minimum: 2.5,
    maximum: 6.5,
  }, 3.75)).toEqual(true);
});
test('validate() false for compound number exclusive', () => {
  expect(Validators.validate({
    type: 'number',
    minimum: 2.5,
    maximum: 6.5,
    exclusiveMinimum: true,
    exclusiveMaximum: true
  }, 2.5)).toEqual(false);
});
test('validate() returns true for integer multiples', () => {
  expect(Validators.validate({
    type: 'integer',
    multipleOf: 2
  }, 4)).toEqual(true);
});
test('validate() returns true for number multiples', () => {
  expect(Validators.validate({
    type: 'number',
    multipleOf: 2.5
  }, 7.5)).toEqual(true);
});
test('validate() returns false for empty enum array', () => {
  expect(Validators.validate({
    type: 'string',
    enum: [],
  }, 'hello')).toEqual(false);
});
test('validate() returns true for in enum array', () => {
  expect(Validators.validate({
    type: 'string',
    enum: ['hello', 'world'],
  }, 'world')).toEqual(true);
});
test('validate() returns false for impossible combination of type and values', () => {
  expect(Validators.validate({
    type: 'string',
    enum: [1, 2],
  }, 'hello')).toEqual(false);
})
