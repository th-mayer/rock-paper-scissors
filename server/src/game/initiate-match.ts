import { Server } from "socket.io";
import {
  Match,
  GameInstance,
  Player,
  PlayerStats,
} from "../types/socket-connection-types";
import { running_matches } from "./dicts/running-matches-dict";

export const initiateMatch = (io: Server, match: Match, match_id: string) => {
  const defaultValue = 1;

  let instance: GameInstance = {
    // instance contains all gamerelevant stats,  the server needs to calcualte combat results
    player1: {
      hp: 100,
      symbol: null,
      chosen: false,
      dmg_modifier: {
        rock: defaultValue,
        paper: defaultValue,
        scissors: defaultValue,
      },
      protection_modifier: {
        rock: defaultValue,
        paper: defaultValue,
        scissors: defaultValue,
      },
    },
    player2: {
      hp: 100,
      symbol: null,
      chosen: false,
      dmg_modifier: {
        rock: defaultValue,
        paper: defaultValue,
        scissors: defaultValue,
      },
      protection_modifier: {
        rock: defaultValue,
        paper: defaultValue,
        scissors: defaultValue,
      },
    },
  };

  applyModifier(match.player1, instance.player1);
  applyModifier(match.player2!, instance.player2);

  function applyModifier(player: Player, stats: PlayerStats) {
    for (let i = 0; i < 3; i++) {
      switch (player.items[i].kind) {
        case 0: {
          stats.dmg_modifier.rock *= player.items[i].modifier;
        }
        case 1: {
          stats.dmg_modifier.paper *= player.items[i].modifier;
        }
        case 2: {
          stats.dmg_modifier.scissors *= player.items[i].modifier;
        }
        case 3: {
          stats.protection_modifier.rock *= player.items[i].modifier;
        }
        case 4: {
          stats.protection_modifier.paper *= player.items[i].modifier;
        }
        case 5: {
          stats.protection_modifier.scissors *= player.items[i].modifier;
        }
        default: {
        }
      }
    }
  }

  match.instance = instance; // add games stats to match object
  running_matches[match_id] = match; // add match to active matches dict
  // now inform clients and send them ( opponent, self, match_id )
  io.to(match.player1.socket.id).emit(
    "initiate-match",
    {
      name: match.player2!.name,
      health: 100,
      wins: match.player2!.wins,
      items: match.player2!.items,
    },
    {
      name: match.player1.name,
      health: 100,
      wins: match.player1.wins,
      items: match.player1.items,
    },
    match_id
  );
  io.to(match.player2!.socket.id).emit(
    "initiate-match",
    {
      name: match.player1.name,
      health: 100,
      wins: match.player1.wins,
      items: match.player1.items,
    },
    {
      name: match.player2!.name,
      health: 100,
      wins: match.player2!.wins,
      items: match.player2!.items,
    },
    match_id
  );
  // then put clients into socket room for easier broadcasting of game data
  match.player1.socket.join(match_id);
  match.player2?.socket.join(match_id);
};
