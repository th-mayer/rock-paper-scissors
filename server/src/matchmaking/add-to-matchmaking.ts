import { Server } from "socket.io";
import { generateUUID } from "../generators/generate-uuid";
import { Match, Player } from "../types/socket-connection-types";
import { initiateMatch } from "./initiate-match";
import {
  matchmaking_diff_1,
  matchmaking_diff_10,
  matchmaking_diff_any,
} from "./dicts/player-level-dicts";

export const addToMatchmaking = (io: Server, player: Player) => {
  // Before a new match is created, server will check if this player is a suiteable opponent
  // for a already created matchmaking entry
  for (let match_id in matchmaking_diff_1) {
    if (
      2 <=
      Math.max(matchmaking_diff_1[match_id].level, player.level) -
        Math.min(matchmaking_diff_1[match_id].level, player.level)
    ) {
      matchmaking_diff_1[match_id].player2 = player;
      initiateMatch(io, matchmaking_diff_1[match_id], match_id);
      return;
    }
  }
  for (let match_id in matchmaking_diff_10) {
    if (
      2 <=
      Math.max(matchmaking_diff_10[match_id].level, player.level) -
        Math.min(matchmaking_diff_10[match_id].level, player.level)
    ) {
      matchmaking_diff_10[match_id].player2 = player;
      initiateMatch(io, matchmaking_diff_10[match_id], match_id);
      return;
    }
  }
  for (let match_id in matchmaking_diff_any) {
    if (
      2 <=
      Math.max(matchmaking_diff_any[match_id].level, player.level) -
        Math.min(matchmaking_diff_any[match_id].level, player.level)
    ) {
      matchmaking_diff_any[match_id].player2 = player;
      initiateMatch(io, matchmaking_diff_any[match_id], match_id);
      return;
    }
  }

  newMatchmakingEntry(player);
};

function newMatchmakingEntry(player: Player){
  // If no match is suitable, a new entry into matchmaking will be created
  let match: Match = {
    level: player.level,
    player1: player,
    player2: null,
    instance: null,
  }; // create match
  let match_id: string = generateUUID(); // generate id for matchmaking and later socket room
  matchmaking_diff_1[match_id] = match; // add match to matchmaking dict
}
