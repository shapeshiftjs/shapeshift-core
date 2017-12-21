import { JSONSchema4 } from 'json-schema';
import { DataType } from './types';

export interface UISchema {
  order?: string[];
  properties?: {
    [k: string]: UISchema;
  };
  widget?: string;
}

export type SSForEachCallback = (
  key: any,
  shapeshift?: Shapeshift
) => void;

export class Shapeshift {
  private _schema: JSONSchema4;
  private _uiSchema?: UISchema;

  constructor(schema: JSONSchema4, uiSchema?: UISchema) {
    if (typeof schema !== DataType.OBJECT || schema === null || Array.isArray(uiSchema)) {
      throw new Error('JSON Schema must be an object');
    }

    if (uiSchema !== undefined && uiSchema !== null && (typeof uiSchema !== DataType.OBJECT || Array.isArray(uiSchema))) {
      throw new Error('UI Schema must be an object');
    }

    this._schema = schema;
    this._uiSchema = uiSchema || {};
  }

  schema(): JSONSchema4 {
    return this._schema;
  }

  uiSchema(): UISchema | undefined {
    return this._uiSchema;
  }

  forEach(func: SSForEachCallback) {
    const schema = this._schema;
    const uiSchema = this._uiSchema;

    // forEach is a no-op for schemas that are not objects
    // or has no properties
    if (
      typeof schema !== 'object' || schema === null ||
      typeof schema.properties !== 'object' || schema.properties === null
    ) {
      return;
    }

    // There are no nesting if schema is not object so return root and
    // ignore order
    if (schema.type !== DataType.OBJECT) {
      func(undefined, new Shapeshift(schema, uiSchema));
      return;
    }

    // If there is no UISchema defined then just return keys of schema
    // properties in declared order.
    if (
      typeof uiSchema !== 'object' ||
      uiSchema === null ||
      !Array.isArray(uiSchema.order)
    ) {
      if (schema.properties) {
        const properties = schema.properties;
        Object.keys(properties).forEach(key => {
          func(key, new Shapeshift(properties[key]));
        });
      }
      return;
    }

    uiSchema.order.forEach(value => {
      if (schema.properties && schema.properties[value]) {
        func(value, new Shapeshift(schema.properties[value], uiSchema[value]));
      }
    });
  }
}
