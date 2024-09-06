"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeMatch = exports.changeBowler = exports.swapStrikerAndRunner = exports.updateMatch = exports.getMatch = exports.createMatch = void 0;
var matchModel_1 = require("../models/matchModel");
var createMatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, matchName, matchType, teams, currentTeam, striker, runner, currentBowler, currentBatsmen, newMatch, savedMatch, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, matchName = _a.matchName, matchType = _a.matchType, teams = _a.teams, currentTeam = _a.currentTeam, striker = _a.striker, runner = _a.runner, currentBowler = _a.currentBowler;
                currentBatsmen = [
                    { playerId: striker, role: 'striker' },
                    { playerId: runner, role: 'runner' }
                ];
                newMatch = new matchModel_1.default({
                    matchName: matchName,
                    matchType: matchType,
                    teams: teams,
                    currentTeam: currentTeam,
                    currentBatsmen: currentBatsmen,
                    currentBowler: currentBowler,
                    matchStatus: 'in progress'
                });
                return [4 /*yield*/, newMatch.save()];
            case 1:
                savedMatch = _b.sent();
                return [2 /*return*/, res.status(201).json(savedMatch)];
            case 2:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ message: 'Error creating match', error: error_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createMatch = createMatch;
var getMatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var matchId, match, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                matchId = req.params.matchId;
                return [4 /*yield*/, matchModel_1.default.findById(matchId)];
            case 1:
                match = _a.sent();
                if (!match) {
                    return [2 /*return*/, res.status(404).json({ message: 'Match not found' })];
                }
                return [2 /*return*/, res.status(200).json(match)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error fetching match', error: error_2 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMatch = getMatch;
var updateMatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var matchId, updates, updatedMatch, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                matchId = req.params.matchId;
                updates = req.body;
                return [4 /*yield*/, matchModel_1.default.findByIdAndUpdate(matchId, updates, { new: true })];
            case 1:
                updatedMatch = _a.sent();
                if (!updatedMatch) {
                    return [2 /*return*/, res.status(404).json({ message: 'Match not found' })];
                }
                return [2 /*return*/, res.status(200).json(updatedMatch)];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error updating match', error: error_3 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateMatch = updateMatch;
// export const addDelivery = async (req: Request, res: Response) => {
//   try {
//     const { matchId } = req.params;
//     const { deliveryType, runs, overthrows, extras, dismissal } = req.body;
//     const newDelivery = new _deliverySchema({
//       matchId,
//       deliveryType,
//       runs,
//       overthrows,
//       extras,
//       dismissal,
//     });
//     const savedDelivery = await newDelivery.save();
//     const match = await _matchSchema.findById(matchId);
//     if (!match) {
//       return res.status(404).json({ message: 'Match not found' });
//     }
//     match.deliveries.push(savedDelivery._id);
//     match.extras.wides += extras.wides;
//     match.extras.noBalls += extras.noBalls;
//     match.extras.byes += extras.byes;
//     match.extras.legByes += extras.legByes;
//     match.extras.overthrows += extras.overthrows;
//     await match.save();
//     return res.status(201).json(savedDelivery);
//   } catch (error) {
//     return res.status(500).json({ message: 'Error adding delivery', error });
//   }
// };
var swapStrikerAndRunner = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var matchId, match, updatedMatch, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                matchId = req.params.matchId;
                return [4 /*yield*/, matchModel_1.default.findById(matchId)];
            case 1:
                match = _a.sent();
                if (!match) {
                    return [2 /*return*/, res.status(404).json({ message: 'Match not found' })];
                }
                if (match.currentBatsmen.length !== 2) {
                    return [2 /*return*/, res.status(400).json({ message: 'There must be exactly 2 batsmen to swap' })];
                }
                match.currentBatsmen[0].role = match.currentBatsmen[0].role === 'striker' ? 'runner' : 'striker';
                match.currentBatsmen[1].role = match.currentBatsmen[1].role === 'striker' ? 'runner' : 'striker';
                return [4 /*yield*/, match.save()];
            case 2:
                updatedMatch = _a.sent();
                return [2 /*return*/, res.status(200).json(updatedMatch)];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                return [2 /*return*/, res.status(500).json({ message: 'Error swapping striker and runner', error: error_4 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.swapStrikerAndRunner = swapStrikerAndRunner;
var changeBowler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var matchId, newBowlerId, match, updatedMatch, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                matchId = req.params.matchId;
                newBowlerId = req.body.newBowlerId;
                return [4 /*yield*/, matchModel_1.default.findById(matchId)];
            case 1:
                match = _a.sent();
                if (!match) {
                    return [2 /*return*/, res.status(404).json({ message: 'Match not found' })];
                }
                if (!newBowlerId) {
                    return [2 /*return*/, res.status(400).json({ message: 'New bowler ID is required' })];
                }
                match.currentBowler = newBowlerId;
                return [4 /*yield*/, match.save()];
            case 2:
                updatedMatch = _a.sent();
                return [2 /*return*/, res.status(200).json(updatedMatch)];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [2 /*return*/, res.status(500).json({ message: 'Error changing bowler', error: error_5 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.changeBowler = changeBowler;
var completeMatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var matchId, match, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                matchId = req.params.matchId;
                return [4 /*yield*/, matchModel_1.default.findById(matchId)];
            case 1:
                match = _a.sent();
                if (!match) {
                    return [2 /*return*/, res.status(404).json({ message: 'Match not found' })];
                }
                match.matchStatus = 'completed';
                return [4 /*yield*/, match.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'Match completed successfully', match: match })];
            case 3:
                error_6 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error completing match', error: error_6 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.completeMatch = completeMatch;
