import { JSONSchema4 } from "json-schema";
import { shapeshift, DataType } from "../index";

import * as sv from './StringValidators';
import * as ov from './ObjectValidators';
import * as nv from './NumberValidators';
import * as bv from './BooleanValidators';
import * as av from './ArrayValidators';

export function validate(schema: JSONSchema4, data: any): Boolean {
    if (!ov.isObject(schema)) {
        // When the schema is undefined, all values are valid.
        throw new Error('schema is not defined');
    }

    if (data === undefined) {
        throw new Error('data is not defined');
    }

    // if type is undefined, then all types are valid so set it to string
    switch (schema!.type) {
        case DataType.STRING:
            return validateString(schema, data);
        case DataType.NUMBER:
            return validateNumber(schema, data);
        case DataType.INTEGER:
            return validateInteger(schema, data);
        case DataType.BOOL:
            return validateBoolean(schema, data);
        case DataType.OBJECT:
            return validateObject(schema, data);
        case DataType.ARRAY:
            return validateArray(schema, data);
        case DataType.NULL:
            return data === null;
        default:
            // If no type defined then all types are valid except undefined
            return true;
    }
}

export function validateString(schema: JSONSchema4, data: any): Boolean {
    return sv.isString(data);
}

export function validateInteger(schema: JSONSchema4, data: any): Boolean {
    return nv.isInteger(data);
}

export function validateNumber(schema: JSONSchema4, data: any): Boolean {
    return nv.isNumber(data);
}

export function validateArray(schema: JSONSchema4, data: any): Boolean {
    return av.isArray(data);
}

export function validateObject(schema: JSONSchema4, data: any): Boolean {
    return ov.isObject(data);
}

export function validateBoolean(schema: JSONSchema4, data: any): Boolean {
    return bv.isBoolean(data);
}