import { DataType } from "../index";

export function isBoolean(data: any): Boolean {
    return typeof data === DataType.BOOL;
}