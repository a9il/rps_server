import { Room, Client } from "colyseus";
import { LeaderboardData, LeaderboardRoomState } from "./schema/Leaderboard";

export class LeaderboardRoom extends Room<LeaderboardRoomState> {
    
    onCreate(options: any): void | Promise<any> {
        this.setState(new LeaderboardRoomState());
        this.autoDispose = false;
        //update leaderboard
        this.onMessage(1, (client, message)=>{
            let d:LeaderboardRoomState = message;
            if(d.playerData.name!=undefined){
                const l:LeaderboardData = new LeaderboardData();
                l.name = d.playerData.name;
                l.score = d.playerData.score;
                this.state.datas.push(l);
            }
            client.send(1, this.state.datas.toJSON());
        });
    }

    onJoin (client: Client, options: any) {
        console.log(client.sessionId, "joined to leaderboard");
      }
    
      onLeave (client: Client, consented: boolean) {
        console.log(client.sessionId, "left leaderboard");
      }
    
      onDispose() {
        console.log("room", this.roomId, "disposing... leaderboard");
      }
}