"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var overSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    matchId: { type: mongoose_1.Schema.Types.ObjectId, ref: '_matchSchema', required: true },
    overNumber: { type: Number, required: true },
    deliveries: [
        {
            deliveryId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Delivery', required: true },
            deliveryType: { type: String, enum: ['normal', 'wide', 'no-ball'], required: true },
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
var _overSchema = (0, mongoose_1.model)('Over', overSchema);
exports.default = _overSchema;
