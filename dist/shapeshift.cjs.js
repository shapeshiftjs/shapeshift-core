'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Shapeshift = (function () {
    function Shapeshift(schema, uiSchema) {
        this.schema = schema;
        this.uiSchema = uiSchema;
    }
    Shapeshift.prototype.forEach = function (func) {
        var _this = this;
        if (this.uiSchema &&
            this.uiSchema.order &&
            Array.isArray(this.uiSchema.order)) {
            this.uiSchema.order.forEach(function (value) {
                func(value, _this.schema.properties[value], _this.uiSchema[value]);
            });
        }
    };
    return Shapeshift;
}());

exports.Shapeshift = Shapeshift;
