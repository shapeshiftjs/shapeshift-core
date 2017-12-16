class Shapeshift {
    constructor(schema, uiSchema) {
        this.schema = schema;
        this.uiSchema = uiSchema;
    }
    forEach(func) {
        if (this.uiSchema &&
            this.uiSchema.order &&
            Array.isArray(this.uiSchema.order)) {
            this.uiSchema.order.forEach(value => {
                func(value, this.schema.properties[value], this.uiSchema[value]);
            });
        }
    }
}

export { Shapeshift };
