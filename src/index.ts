import { UISchema, Shapeshift } from './Shapeshift';
import { JSONSchema4 } from 'json-schema';

import { DataType } from './types';
import * as Validators from './validators';

function shapeshift(schema: JSONSchema4, uiSchema?: UISchema): Shapeshift {
  return new Shapeshift(schema, uiSchema);
}

export {
  shapeshift,
  DataType,
  Validators,
  Shapeshift,
}
