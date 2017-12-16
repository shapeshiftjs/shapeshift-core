import { JSONSchema4 } from 'json-schema';
export interface UISchema {
    order: string[];
    widget: string;
}
export declare class Shapeshift {
    schema: JSONSchema4;
    uiSchema?: UISchema;
    constructor(schema: JSONSchema4, uiSchema?: UISchema);
    forEach(func: (name: string, schema: JSONSchema4, uiSchema: any) => void): void;
}
