import { DataType } from "../index";
import * as nv from './NumberValidators';

export function isArray(data: any): boolean {
  return Array.isArray(data);
}

export function isMinCount(data: any[], length: number): boolean {
  if (!isArray(data)) {
    throw new Error('data is not an array');
  }

  if (!nv.isInteger(length)) {
    throw new Error('length is not an integer');
  }

  return data.length >= length;
}

export function isMaxCount(data: any[], length: number): boolean {
  if (!isArray(data)) {
    throw new Error('data is not an array');
  }

  if (!nv.isInteger(length)) {
    throw new Error('length is not an integer');
  }

  return data.length <= length;
}

export function isUnique(data: any[]): boolean {
  if (!isArray(data)) {
    throw new Error('data is not an array');
  }

  if (data.length === 0) {
    return true;
  }

  let sortedArray = data.sort();
  let lastValue: any = null;
  let hasDuplicate = sortedArray.some(value => {
    if (value === lastValue) {
      return true;
    }
    lastValue = value;
    return false;
  });

  return !hasDuplicate;
}
