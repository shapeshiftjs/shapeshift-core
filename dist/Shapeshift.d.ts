import { JSONSchema4 } from 'json-schema';
export interface UISchema {
    order?: string[];
    properties?: {
        [k: string]: UISchema;
    };
    widget?: string;
}
export declare type SSForEachCallback = (key: any, schema?: JSONSchema4, uiSchema?: UISchema) => void;
export declare class Shapeshift {
    schema?: JSONSchema4;
    uiSchema?: UISchema;
    constructor(schema?: JSONSchema4, uiSchema?: UISchema);
    forEach(func: SSForEachCallback): void;
}
