import { Server } from "socket.io";
import { generateUUID } from "../generators/generate-uuid";
import { Match, Player } from "../types/socket-connection-types";
import { initiateMatch } from "./initiate-match";
import { running_matches } from "./dicts/running-matches-dict";

export const addToMatchmaking = (io: Server, player: Player) => {
  // Before a new match is created, server will check if this player is a opponent
  // for a already created matchmaking entry
  for (let match_id in running_matches){
    running_matches[match_id].player2 = player;
    initiateMatch(io, running_matches[match_id], match_id);
    return;
  }

  newMatchmakingEntry(player, io);
};

function newMatchmakingEntry(player: Player, io: any){
  // If no match is suitable, a new entry into matchmaking will be created
  let match: Match = {
    player1: player,
    player2: null,
    instance: null,
  }; // create match
  let match_id: string = generateUUID(); // generate id for matchmaking and later socket room
  running_matches[match_id] = match; // add match to matchmaking dict
  io.emit("matchmaking-active", match_id)
}
