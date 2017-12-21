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

export function validateString(schema: JSONSchema4, data: any): boolean {
    let validators = [sv.isString];
    if (schema.minLength) {
        validators.push(data => {
            return sv.isMinLength(data, schema.minLength!);
        });
    }
    if (schema.maxLength) {
        validators.push(data => {
            return sv.isMaxLength(data, schema.maxLength!);
        });
    }
    if (schema.pattern) {
        validators.push(data => {
            return sv.matchPattern(data, schema.pattern!);
        })
    }

    return validators.every(validator => {
        return validator(data);
    });
}

export function validateInteger(schema: JSONSchema4, data: any): boolean {
    if (nv.isInteger(data)) {
        return validateNumber(schema, data);
    }
    return false;
}

export function validateNumber(schema: JSONSchema4, data: any): boolean {
    let validators = [nv.isNumber];
    if (schema.minimum) {
        let exclusive = schema.exclusiveMinimum || false;
        validators.push(data => {
            return nv.isGreaterThan(data, schema.minimum!, exclusive);
        });
    }
    if (schema.maximum) {
        let exclusive = schema.exclusiveMaximum || false;
        validators.push(data => {
            return nv.isLessThan(data, schema.maximum!, exclusive);
        });
    }
    if (schema.multipleOf) {
        validators.push(data => {
            return nv.isMultipleOf(data, schema.multipleOf!);
        })
    }
    return validators.every(validator => {
        return validator(data);
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