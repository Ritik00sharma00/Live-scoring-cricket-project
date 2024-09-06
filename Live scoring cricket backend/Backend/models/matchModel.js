"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var matchSchema = new mongoose_1.Schema({
    matchName: { type: String, required: true },
    matchType: { type: String, enum: ['ODI', 'T20', 'Test'], required: true },
    teamA: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', required: true },
    teamB: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', required: true },
    currentTeam: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', required: true },
    currentBatsmen: {
        type: [{
                playerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Player', required: true },
                role: { type: String, enum: ['striker', 'runner'], required: true }
            }],
        validate: {
            validator: function (v) {
                return v.length === 2; // Ensure exactly 2 items
            },
            message: 'currentBatsmen array must contain exactly 2 items (one striker and one runner).'
        }
    },
    currentBowler: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team.players', required: true },
    deliveries: [{ type: mongoose_1.Schema.Types.ObjectId, ref: '_deliverySchema' }],
    matchStatus: { type: String, enum: ['in progress', 'completed'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
var _matchSchema = (0, mongoose_1.model)('Match', matchSchema);
exports.default = _matchSchema;
