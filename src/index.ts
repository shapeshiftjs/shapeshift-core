import { UISchema, Shapeshift } from './Shapeshift';
import { JSONSchema4 } from 'json-schema';

export default function shapeshift(schema: JSONSchema4, uiSchema?: UISchema): Shapeshift {
    return new Shapeshift(schema, uiSchema);
}
