import { DataType } from "../index";

export function isBoolean(data: any): boolean {
    return typeof data === DataType.BOOL;
}