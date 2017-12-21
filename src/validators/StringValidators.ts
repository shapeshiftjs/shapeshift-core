import { DataType } from "../index";
import * as nv from './NumberValidators';

export function isString(data?: any): Boolean {
    return typeof data === DataType.STRING;
}

export function isMinLength(data: string, length: number): Boolean {
    if (!isString(data)) {
        throw new Error('data is not a string');
    }

    if (!nv.isInteger(length)) {
        throw new Error('length is not an integer');
    }

    return data.length >= length;
}

export function isMaxLength(data: string, length: number): Boolean {
    if (!isString(data)) {
        throw new Error('data is not a string');
    }

    if (!nv.isInteger(length)) {
        throw new Error('length is not an integer');
    }

    return data.length <= length;
}

export function matchPattern(data: string, pattern: string): Boolean {
    if (!isString(data)) {
        throw new Error('data is not a string');
    }

    if (!isString(pattern)) {
        throw new Error('pattern is not a string');
    }

    let regex = new RegExp(pattern);
    return regex.test(data);
}
