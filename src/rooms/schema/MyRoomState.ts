import { Schema, Context, type } from "@colyseus/schema";

export class MyRoomState extends Schema {

  @type("number") hand:number = -1; 

}
