import { JSONSchema4 } from "json-schema";
import { shapeshift, DataType } from "../index";

import * as sv from './StringValidators';
import * as ov from './ObjectValidators';
import * as nv from './NumberValidators';
import * as bv from './BooleanValidators';
import * as av from './ArrayValidators';
import { read } from "fs";

export function validate(schema: JSONSchema4, data: any): boolean {
  if (!ov.isObject(schema)) {
    // When the schema is undefined, all values are valid.
    throw new Error('schema is not defined');
  }

  if (data === undefined) {
    throw new Error('data is not defined');
  }

  let validators = [];
  // if type is undefined, then all types are valid so set it to string
  switch (schema!.type) {
    case DataType.STRING:
      validators.push(validateString(schema, data));
      break;
    case DataType.NUMBER:
      validators.push(validateNumber(schema, data));
      break;
    case DataType.INTEGER:
      validators.push(validateInteger(schema, data));
      break;
    case DataType.BOOL:
      validators.push(validateBoolean(schema, data));
      break;
    case DataType.OBJECT:
      validators.push(validateObject(schema, data));
      break;
    case DataType.ARRAY:
      validators.push(validateArray(schema, data));
      break;
    case DataType.NULL:
      validators.push(data === null);
      break;
    default:
      // If no type defined then all types are valid except undefined
      validators.push(true);
      break;
  }

  if (schema.enum) {
    validators.push(validateValueIn(schema.enum, data));
  }

  return validators.every(result => {
    return result;
  });
}

export function validateString(schema: JSONSchema4, data: any): boolean {
  if (!sv.isString(data)) {
    return false;
  }

  let validators = [];
  if (schema.minLength) {
    validators.push(sv.isMinLength(data, schema.minLength!));
  }
  if (schema.maxLength) {
    validators.push(sv.isMaxLength(data, schema.maxLength!));
  }
  if (schema.pattern) {
    validators.push(sv.matchPattern(data, schema.pattern!));
  }

  return validators.every(result => {
    return result;
  });
}

export function validateInteger(schema: JSONSchema4, data: any): boolean {
  if (nv.isInteger(data)) {
    return validateNumber(schema, data);
  }
  return false;
}

export function validateNumber(schema: JSONSchema4, data: any): boolean {
  if (!nv.isNumber(data)) {
    return false;
  }

  let validators = [];
  if (schema.minimum) {
    let exclusive = schema.exclusiveMinimum || false;
    validators.push(nv.isGreaterThan(data, schema.minimum!, exclusive));
  }
  if (schema.maximum) {
    let exclusive = schema.exclusiveMaximum || false;
    validators.push(nv.isLessThan(data, schema.maximum!, exclusive));
  }
  if (schema.multipleOf) {
    validators.push(nv.isMultipleOf(data, schema.multipleOf!));
  }
  return validators.every(result => {
    return result;
  });
}

export function validateArray(schema: JSONSchema4, data: any): boolean {
  return av.isArray(data);
}

export function validateObject(schema: JSONSchema4, data: any): boolean {
  return ov.isObject(data);
}

export function validateBoolean(schema: JSONSchema4, data: any): boolean {
  return bv.isBoolean(data);
}

export function validateValueIn(values: any[], data: any): boolean {
  if (!Array.isArray(values) || values.length === 0) {
    return false;
  }
  return values.indexOf(data) > -1;
}
