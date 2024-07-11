import { Server } from "socket.io";
import {
  Match,
  GameInstance,
  Player,
  PlayerStats,
  MatchmakingMatch,
} from "../types/socket-connection-types";
import { running_matches } from "./dicts/running-matches-dict";
import { open_matches } from "./dicts/open-matches-dict";

export const initiateMatch = (
  io: Server,
  match: MatchmakingMatch,
  match_id: string
) => {
  const defaultValue = 1;

  let gameInstance: GameInstance = {
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

  applyModifier(match.player1, gameInstance.player1);
  applyModifier(match.player2!, gameInstance.player2);

  function applyModifier(player: Player, stats: PlayerStats) {
    for (let i = 0; i < 3; i++) {
      switch (player.items[i].kind) {
        case 0: {
          stats.dmg_modifier.rock *= player.items[i].modifier;
          break;
        }
        case 1: {
          stats.dmg_modifier.paper *= player.items[i].modifier;
          break;
        }
        case 2: {
          stats.dmg_modifier.scissors *= player.items[i].modifier;
          break;
        }
        case 3: {
          stats.protection_modifier.rock *= player.items[i].modifier;
          break;
        }
        case 4: {
          stats.protection_modifier.paper *= player.items[i].modifier;
          break;
        }
        case 5: {
          stats.protection_modifier.scissors *= player.items[i].modifier;
          break;
        }
        default: {
          break;
        }
      }
    }
  }
  let ready_match: Match = {
    player1: match.player1,
    player2: match.player2!,
    instance: gameInstance,
  };
  delete open_matches[match_id];
  running_matches[match_id] = ready_match; // add match to active matches dict
  // now inform clients and send them ( opponent, self, match_id )
  io.to(ready_match.player1.socket.id).emit("initiate-match", {
    opponent: {
      name: ready_match.player2.name,
      health: 100,
      wins: ready_match.player2.wins,
      items: ready_match.player2.items,
    },
    player: {
      name: ready_match.player1.name,
      health: 100,
      wins: ready_match.player1.wins,
      items: ready_match.player1.items,
    },
    m_id: match_id,
  });
  io.to(ready_match.player2.socket.id).emit("initiate-match", {
    opponent: {
      name: ready_match.player1.name,
      health: 100,
      wins: ready_match.player1.wins,
      items: ready_match.player1.items,
    },
    player: {
      name: ready_match.player2.name,
      health: 100,
      wins: ready_match.player2.wins,
      items: ready_match.player2.items,
    },
    m_id: match_id,
  });
  // then put clients into socket room for easier broadcasting of game data
  match.player1.socket.join(match_id);
  match.player2?.socket.join(match_id);
};
