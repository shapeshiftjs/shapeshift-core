'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Type;
(function (Type) {
    Type.STRING = 'string';
    Type.OBJECT = 'object';
    Type.BOOL = 'boolean';
})(Type || (Type = {}));

var Shapeshift = (function () {
    function Shapeshift(schema, uiSchema) {
        this.schema = schema;
        this.uiSchema = uiSchema;
    }
    Shapeshift.prototype.forEach = function (func) {
        var schema = this.schema;
        var uiSchema = this.uiSchema;
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
                var properties_1 = schema.properties;
                Object.keys(properties_1).forEach(function (key) {
                    func(key, properties_1[key]);
                });
            }
            return;
        }
        uiSchema.order.forEach(function (value) {
            if (schema.properties) {
                func(value, schema.properties[value], uiSchema[value]);
            }
        });
    };
    return Shapeshift;
}());

exports.Shapeshift = Shapeshift;
