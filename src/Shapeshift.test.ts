import { shapeshift } from './index';
import { JSONSchema4 } from 'json-schema';

test('Shapeshift initializes with default values', () => {
  let ss = shapeshift({}, {});
  expect(ss.schema).toEqual({});
  expect(ss.uiSchema).toEqual({});
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

test('Shapeshift returns custom widget from UI Schema', () => {
  let ss = shapeshift(
    {
      title: 'Just Mev',
      type: 'string'
    },
    {
      widget: 'textarea'
    }
  );
  expect(ss.widget).toEqual('textarea');
});
test('Shapeshift returns custom widget from nested UI Schema', () => {
  let schema: JSONSchema4 = {
    title: 'Just Mev',
    type: 'object',
    properties: {
      someBool: {
        type: 'boolean',
      },
      testProp: {
        type: "string",
      }
    }
  };
  let uiSchema = {
    widget: 'textarea',
    properties: {
      testProp: {
        widget: 'textarea',
      }
    }
  };
  let ss = shapeshift(schema, uiSchema);
  let mockFn = jest.fn();
  ss.forEach(mockFn);
  expect(mockFn).toHaveBeenCalledTimes(2);
  expect(mockFn.mock.calls[1][1]).toBeDefined();
  expect(mockFn.mock.calls[1][1].widget).toEqual('textarea');
});
test('Shapeshift returns custom widget from nested UI Schema with order', () => {
  let schema: JSONSchema4 = {
    title: 'Just Mev',
    type: 'object',
    properties: {
      someBool: {
        type: 'boolean',
      },
      testProp: {
        type: "string",
      },
      someObject: {
        type: 'object',
        properties: {
          nestedNumber: {
            type: 'number',
          },
          nestedBool: {
            type: 'boolean',
          }
        }
      },
    },
  };
  let uiSchema = {
    widget: 'textarea',
    properties: {
      testProp: {
        widget: 'textarea',
      },
      someObject: {
        order: ['nestedBool', 'nestedNumber'],
      }
    },
    order: ['testProp', 'someBool', 'someObject'],
  };
  let ss = shapeshift(schema, uiSchema);
  let mockFn = jest.fn();
  ss.forEach(mockFn);
  expect(mockFn).toHaveBeenCalledTimes(3);
  expect(mockFn.mock.calls[0][1]).toBeDefined();
  expect(mockFn.mock.calls[0][1].widget).toEqual('textarea');

  let nestedObject = mockFn.mock.calls[2][1];
  nestedObject.forEach(mockFn);
  expect(mockFn).toHaveBeenCalledTimes(5);
  expect(mockFn.mock.calls[3][0]).toEqual('nestedBool');
  expect(mockFn.mock.calls[4][0]).toEqual('nestedNumber');
});
