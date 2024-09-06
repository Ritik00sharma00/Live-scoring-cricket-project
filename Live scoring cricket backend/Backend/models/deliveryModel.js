"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var deliverySchema = new mongoose_1.Schema({
    deliveryType: {
        type: String,
        enum: ['normal', 'wide', 'no-ball', 'bye', 'leg-bye'],
        required: true
    },
    legal: { type: Boolean, required: true },
    extras: {
        wides: { type: Number, default: 0 },
        noBalls: { type: Number, default: 0 },
        byes: { type: Number, default: 0 },
        legByes: { type: Number, default: 0 },
        overthrows: { type: Number, default: 0 }
    },
    runs: [{ type: Number, required: true, default: 0 }],
    dismissal: {
        type: String,
        enum: ['not out', 'bowled', 'caught', 'run out', 'lbw', 'stumped', 'hit wicket', null],
        default: 'not out'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
var _deliverySchema = (0, mongoose_1.model)('Delivery', deliverySchema);
exports.default = _deliverySchema;
