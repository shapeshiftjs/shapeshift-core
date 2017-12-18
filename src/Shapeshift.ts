import { JSONSchema4 } from 'json-schema';
import { Type } from './types';

export interface UISchema {
  order?: string[];
  properties?: {
    [k: string]: UISchema;
  };
  widget?: string;
}

export type SSForEachCallback = (
  key: any,
  schema?: JSONSchema4,
  uiSchema?: UISchema
) => void;

export class Shapeshift {
  schema?: JSONSchema4;
  uiSchema?: UISchema;

  constructor(schema?: JSONSchema4, uiSchema?: UISchema) {
    this.schema = schema;
    this.uiSchema = uiSchema;
  }

  forEach(func: SSForEachCallback) {
    const schema = this.schema;
    const uiSchema = this.uiSchema;

    if (typeof schema !== 'object' || schema === null) {
      return;
    }

    // There are no nesting if schema is not object so return root and
    // ignore order
    if (schema.type !== Type.OBJECT) {
      func(undefined, schema, uiSchema);
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
          func(key, properties[key]);
        });
      }
      return;
    }

    uiSchema.order.forEach(value => {
      if (schema.properties && schema.properties[value]) {
        func(value, schema.properties[value], uiSchema[value]);
      }
    });
  }
}
