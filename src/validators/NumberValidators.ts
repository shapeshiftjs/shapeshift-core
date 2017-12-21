import { DataType } from "../index";

export function isNumber(data: any): Boolean {
    return typeof data === DataType.NUMBER && data !== NaN;
}

export function isInteger(data: any): Boolean {
    return isNumber(data) && data % 1 === 0;
}