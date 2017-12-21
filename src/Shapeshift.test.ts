import { shapeshift } from './index';

test('Shapeshift initializes with default values', () => {
  let ss = shapeshift({}, {});
  expect(ss.schema()).toEqual({});
  expect(ss.uiSchema()).toEqual({});
});

test('Shapeshift throws when schema is not an object', () => {
  expect(() => {
    let ss = shapeshift(null);
  }).toThrow();
});

test('Shapeshift throws when uiSchema is not an object', () => {
  expect(() => {
    let ss = shapeshift({}, "1234");
  }).toThrow();
})

test('forEach() no-op with empty schema object', () => {
  let ss = shapeshift({});
  let mockFn = jest.fn();
  ss.forEach(mockFn);
  expect(mockFn).toHaveBeenCalledTimes(0);
});

test('forEach() no-op with non-object type schema', () => {
  let ss = shapeshift(
    {
      title: 'Just Mev',
      type: 'string'
    },
    {
      widget: 'textarea'
    }
  );
  let mockFn = jest.fn();
  ss.forEach(mockFn);
  expect(mockFn).toHaveBeenCalledTimes(0);
});

test('forEach() no-op with object type schema with no properties', () => {
  let ss = shapeshift({
    type: 'object'
  });
  let mockFn = jest.fn();
  ss.forEach(mockFn);
  expect(mockFn).toHaveBeenCalledTimes(0);
});

test('forEach() iterates all properties without UISchema', () => {
  let ss = shapeshift({
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      description: {
        type: 'string'
      }
    }
  });

  let mockFn = jest.fn();
  ss.forEach(mockFn);
  expect(mockFn).toHaveBeenCalledTimes(2);
});

test('forEach() iterates by UISchema order ignoring undefined values', () => {
  let ss = shapeshift(
    {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        }
      }
    },
    {
      order: ['name', 'description', 'blah']
    }
  );

  let mockFn = jest.fn();
  ss.forEach(mockFn);
  expect(mockFn).toHaveBeenCalledTimes(2);
});
