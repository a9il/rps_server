"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardRoomState = exports.LeaderboardData = void 0;
const schema_1 = require("@colyseus/schema");
class LeaderboardData extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.name = "";
        this.score = 0;
    }
}
__decorate([
    schema_1.type("string")
], LeaderboardData.prototype, "name", void 0);
__decorate([
    schema_1.type("number")
], LeaderboardData.prototype, "score", void 0);
exports.LeaderboardData = LeaderboardData;
class LeaderboardRoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.datas = new schema_1.ArraySchema();
        this.playerData = new LeaderboardData();
    }
}
__decorate([
    schema_1.type([LeaderboardData])
], LeaderboardRoomState.prototype, "datas", void 0);
__decorate([
    schema_1.type(LeaderboardData)
], LeaderboardRoomState.prototype, "playerData", void 0);
exports.LeaderboardRoomState = LeaderboardRoomState;
