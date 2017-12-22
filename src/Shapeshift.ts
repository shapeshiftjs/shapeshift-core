import { JSONSchema4, JSONSchema4TypeName } from 'json-schema';
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
  shapeshift: Shapeshift
) => void;

export class Shapeshift {
  schema: JSONSchema4;
  uiSchema: UISchema;

  type?: JSONSchema4TypeName | JSONSchema4TypeName[];
  widget?: string;

  constructor(schema: JSONSchema4, uiSchema?: UISchema) {
    if (typeof schema !== DataType.OBJECT || schema === null || Array.isArray(uiSchema)) {
      throw new Error('JSON Schema must be an object');
    }

    if (uiSchema !== undefined && uiSchema !== null && (typeof uiSchema !== DataType.OBJECT || Array.isArray(uiSchema))) {
      throw new Error('UI Schema must be an object');
    }

    this.schema = schema;
    this.uiSchema = uiSchema || {};

    this.type = schema.type;
    if (this.uiSchema && this.uiSchema.widget) {
      this.widget = this.uiSchema.widget;
    } else {
      switch (this.type) {
        case 'string':
        case 'number':
        case 'integer':
          this.widget = 'textfield';
          break;
        case 'boolean':
          this.widget = 'checkbox';
          break;
        case 'object':
          this.widget = 'fieldset';
          break;
        default:
          this.widget = 'hidden';
          break;
      }
    }
  }

  forEach(func: SSForEachCallback) {
    const schema = this.schema;
    const uiSchema = this.uiSchema;

    // forEach is a no-op for schemas that are not objects
    // or has no properties.
    if (
      typeof schema !== DataType.OBJECT || schema === null || schema.type !== DataType.OBJECT ||
      typeof schema.properties !== DataType.OBJECT || schema.properties === null
    ) {
      return;
    }

    // If there is no UISchema defined then just return keys of schema
    // properties in declared order.
    if (!Array.isArray(uiSchema.order)) {
      const properties = schema.properties!;
      Object.keys(properties).forEach(key => {
        func(key, new Shapeshift(properties[key]));
      });
      return;
    }

    uiSchema.order.forEach(value => {
      if (schema.properties && schema.properties[value]) {
        if (uiSchema.properties) {
          func(value, new Shapeshift(schema.properties[value], uiSchema.properties[value]));
        } else {
          func(value, new Shapeshift(schema.properties[value]));
        }
      }
    });
  }
}
