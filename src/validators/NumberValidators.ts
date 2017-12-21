import { DataType } from "../index";

export function isNumber(data: number): boolean {
    return typeof data === DataType.NUMBER && data !== NaN;
}

export function isInteger(data: number): boolean {
    return isNumber(data) && isMultipleOf(data, 1);
}

export function isGreaterThan(data: number, value: number, exclusive = false) {
    if (!isNumber(data)) {
        throw new Error('data is not a number');
    }

    if (!isNumber(value)) {
        throw new Error('value is not an number');
    }

    if (exclusive) {
        return data > value;
    } else {
        return data >= value;
    }
}

export function isLessThan(data: number, value: number, exclusive = false) {
    if (!isNumber(data)) {
        throw new Error('data is not a number');
    }

    if (!isNumber(value)) {
        throw new Error('value is not an number');
    }

    if (exclusive) {
        return data < value;
    } else {
        return data <= value;
    }
}

export function isMultipleOf(data: number, value: number) {
    if (!isNumber(data)) {
        throw new Error('data is not a number');
    }

    if (!isNumber(value)) {
        throw new Error('value is not an number');
    }

    return data % value === 0;
}