import { Room, Client } from "colyseus";
import { Schema, ArraySchema, type } from "@colyseus/schema";

export class LeaderboardData extends Schema
{
    @type("string") name:string = "";
    @type("number") score:number = 0;
}

export class LeaderboardRoomState extends Schema{
    @type([LeaderboardData])
    datas = new ArraySchema<LeaderboardData>();
    @type(LeaderboardData)
    playerData:LeaderboardData = new LeaderboardData();
}