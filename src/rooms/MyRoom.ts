import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  onCreate (options: any) {
    this.maxClients = 2;
    this.setState(new MyRoomState());

    this.onMessage(0, (client, message) => {
      //
      // handle 0 message
      //
      //console.log(client.id+" : "+message.hand);
      if(this.clients.length==1)
      {
        let nState:MyRoomState = new MyRoomState();
        nState.hand = Math.floor(Math.random() * 2);
        client.send(0, nState);
      }
      else if(this.clients.length==2)
      {
        for (let i = 0; i < this.clients.length; i++) {
          const c = this.clients[i];
          if(c.id!=client.id)
          {
            c.send(0, message);
            break;
          }
        }
      }
    });

  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
