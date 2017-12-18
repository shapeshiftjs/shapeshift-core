import { Shapeshift } from './Shapeshift';

test('Shapeshift initializes with default values', () => {
  let shapeshift = new Shapeshift({}, {});
  expect(shapeshift.schema).toEqual({});
  expect(shapeshift.uiSchema).toEqual({});
});

test('forEach() executes without valid schema', () => {
  let shapeshift = new Shapeshift();
  let mockFn = jest.fn();
  shapeshift.forEach(mockFn);
  expect(mockFn).toHaveBeenCalledTimes(0);

  let shapeshift2 = new Shapeshift({
    type: 'object'
  });
  shapeshift2.forEach(mockFn);
  expect(mockFn).toHaveBeenCalledTimes(0);
});

test('forEach() executes without object schema', () => {
  let shapeshift = new Shapeshift(
    {
      title: 'Just Mev',
      type: 'string'
    },
    {
      widget: 'textarea'
    }
  );
  let mockFn = jest.fn();
  shapeshift.forEach(mockFn);
  expect(mockFn).toHaveBeenCalledTimes(1);
});

test('forEach() executes correctly without UISchema', () => {
  let shapeshift = new Shapeshift({
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
  shapeshift.forEach(mockFn);
  expect(mockFn).toHaveBeenCalledTimes(2);
});

test('forEach() executes correctly with UISchema order', () => {
  let shapeshift = new Shapeshift(
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
  shapeshift.forEach(mockFn);
  expect(mockFn).toHaveBeenCalledTimes(2);
});
