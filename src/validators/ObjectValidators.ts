import { DataType } from "../index";

export function isObject(data?: any): boolean {
    // typeof null and [] are both 'object' so check for those explicitly
    return typeof data === DataType.OBJECT && data !== null && !Array.isArray(data);
}