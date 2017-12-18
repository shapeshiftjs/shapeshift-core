var Type;
(function (Type) {
    Type.STRING = 'string';
    Type.OBJECT = 'object';
    Type.BOOL = 'boolean';
})(Type || (Type = {}));

class Shapeshift {
    constructor(schema, uiSchema) {
        this.schema = schema;
        this.uiSchema = uiSchema;
    }
    forEach(func) {
        const schema = this.schema;
        const uiSchema = this.uiSchema;
        if (typeof schema !== 'object' || schema === null) {
            return;
        }
        if (schema.type !== Type.OBJECT) {
            func(undefined, schema, uiSchema);
            return;
        }
        if (typeof uiSchema !== 'object' ||
            uiSchema === null ||
            !Array.isArray(uiSchema.order)) {
            if (schema.properties) {
                const properties = schema.properties;
                Object.keys(properties).forEach(key => {
                    func(key, properties[key]);
                });
            }
            return;
        }
        uiSchema.order.forEach(value => {
            if (schema.properties) {
                func(value, schema.properties[value], uiSchema[value]);
            }
        });
    }
}

export { Shapeshift };
