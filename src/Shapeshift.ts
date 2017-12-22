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

  name?: string;
  type?: JSONSchema4TypeName | JSONSchema4TypeName[];
  widget?: string;
  children?: Shapeshift[];
  depth = 0;

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

    // If there is no UISchema defined then return the keys of schema properties.
    if (!Array.isArray(uiSchema.order)) {
      Object.keys(schema.properties!).forEach(key => {
        const ss = this.getNestedValue(key, schema, uiSchema);
        func(key, ss);
      });
      return;
    }

    uiSchema.order.forEach(key => {
      if (schema.properties && schema.properties[key]) {
        const ss = this.getNestedValue(key, schema, uiSchema);
        func(key, ss);
      }
    });
  }

  private getNestedValue(key: string, schema: JSONSchema4, uiSchema: UISchema): Shapeshift {
    let property = schema.properties![key];
    let uiProperty = undefined;
    if (uiSchema && uiSchema.properties) {
      uiProperty = uiSchema.properties[key];
    }

    let ss = new Shapeshift(property, uiProperty);
    ss.depth = this.depth + 1;
    return ss;
  }
}
