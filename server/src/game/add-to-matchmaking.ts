import { Server } from "socket.io";
import { generateUUID } from "../generators/generate-uuid";
import { Match, MatchmakingMatch, Player } from "../types/socket-connection-types";
import { initiateMatch } from "./initiate-match";
import { socket_in_matches } from "./dicts/socket-in-match-dict";
import { open_matches} from "./dicts/open-matches-dict";

export const addToMatchmaking = (io: Server, player: Player) => {
  // Before a new match is created, server will check if this player is a opponent
  // for a already created matchmaking entry
  for (let match_id in open_matches){
    open_matches[match_id].player2 = player;
    socket_in_matches[player.socket.id] = match_id;
    console.log("[io]: Players "+open_matches[match_id].player1.socket.id+" and "+player.socket.id+" are creating match "+match_id)
    initiateMatch(io, open_matches[match_id], match_id);
    return;
  }

  newMatchmakingEntry(player, io);
};

function newMatchmakingEntry(player: Player, io: any){
  // If no match is suitable, a new entry into matchmaking will be created
  let match: MatchmakingMatch = {
    player1: player,
    player2: null,
    instance: null,
  }; // create match
  let match_id: string = generateUUID(); // generate id for matchmaking and later socket room
  open_matches[match_id] = match; // add match to matchmaking dict
  socket_in_matches[player.socket.id] = match_id;
  io.to(player.socket.id).emit("matchmaking-active", match_id)
  console.log("[io]: No open match found, created new open match "+match_id)
}
