import { DataType } from "../index";

export function isObject(data?: any): Boolean {
    // typeof null and [] are both 'object' so check for those explicitly
    return typeof data === DataType.OBJECT && data !== null && !Array.isArray(data);
}