"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardRoom = void 0;
const colyseus_1 = require("colyseus");
const Leaderboard_1 = require("./schema/Leaderboard");
class LeaderboardRoom extends colyseus_1.Room {
    onCreate(options) {
        this.setState(new Leaderboard_1.LeaderboardRoomState());
        this.autoDispose = false;
        //update leaderboard
        this.onMessage(1, (client, message) => {
            let d = message;
            if (d.playerData.name != undefined) {
                const l = new Leaderboard_1.LeaderboardData();
                l.name = d.playerData.name;
                l.score = d.playerData.score;
                this.state.datas.push(l);
            }
            client.send(1, this.state.datas.toJSON());
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined to leaderboard");
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left leaderboard");
    }
    onDispose() {
        console.log("room", this.roomId, "disposing... leaderboard");
    }
}
exports.LeaderboardRoom = LeaderboardRoom;
