import { Server } from "socket.io";
import { Match, GameInstance } from "../types/socket-connection-types";
import { running_matches } from "./dicts/running-matches-dict";
import prismaClient from "../database-services/prisma-client";
import { DbItem } from "../database-services/DbItem";


export const initiateMatch = (io: Server, match: Match, match_id: string) => {
  const defaultValue = 1;

  let instance: GameInstance = {
    // instance contains all gamerelevant stats,  the server needs to calcualte combat results
    player1: {
      hp: 100,
      symbol: null,
      chosen: false,
      dmg_modifier: { rock: defaultValue, paper: defaultValue, scissors: defaultValue },
      protection_modifier: { rock: defaultValue, paper: defaultValue, scissors: defaultValue },
    },
    player2: {
      hp: 100,
      symbol: null,
      chosen: false,
      dmg_modifier: { rock: defaultValue, paper: defaultValue, scissors: defaultValue },
      protection_modifier: { rock: defaultValue, paper: defaultValue, scissors: defaultValue },
    },
  };

  // !!!!!!!! MODIFY DMG AND PROTECTON MODIFERS ACCORDING TO PLAYERS ITEMS EFFECTS (FROM DB) !!!!!!!
  match.instance = instance; // add games stats to match object
  running_matches[match_id] = match; // add match to active matches dict
  // now inform clients and send them ( opponent, self, match_id )
  io.to(match.player1.socket.id).emit(
    "initiate-match",
    {
      name: match.player2!.name,
      items: match.player2!.items,
      level: match.player2!.level,
    },
    {
      name: match.player1.name,
      items: match.player1.items,
      level: match.player1.level,
    },
    match_id
  );
  io.to(match.player2!.socket.id).emit(
    "initiate-match",
    {
      name: match.player1.name,
      items: match.player1.items,
      level: match.player1.level,
    },
    {
      name: match.player2!.name,
      items: match.player2!.items,
      level: match.player2!.level,
    },
    match_id
  );
  // then put clients into socket room for easier broadcasting of game data
  match.player1.socket.join(match_id);
  match.player2?.socket.join(match_id);
};
