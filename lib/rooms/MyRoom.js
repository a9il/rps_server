"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
const colyseus_1 = require("colyseus");
const MyRoomState_1 = require("./schema/MyRoomState");
class MyRoom extends colyseus_1.Room {
    onCreate(options) {
        this.maxClients = 2;
        this.setState(new MyRoomState_1.MyRoomState());
        this.onMessage(0, (client, message) => {
            //
            // handle 0 message
            //
            //console.log(client.id+" : "+message.hand);
            if (this.clients.length == 1) {
                let nState = new MyRoomState_1.MyRoomState();
                nState.hand = Math.floor(Math.random() * 2);
                client.send(0, nState);
            }
            else if (this.clients.length == 2) {
                for (let i = 0; i < this.clients.length; i++) {
                    const c = this.clients[i];
                    if (c.id != client.id) {
                        c.send(0, message);
                        break;
                    }
                }
            }
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.MyRoom = MyRoom;
