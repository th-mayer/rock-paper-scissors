import { Server } from "socket.io";
import { running_matches } from "../dicts/running-matches-dict";
import { emitCombatResults } from "./combat-results";

export const calculateCombat = (io: Server, match_id: string) => {
  let game = running_matches[match_id].instance!;
  let player_1_symbol = game.player1.symbol;
  let player_2_symbol = game.player2.symbol;

  let damage: number;

  switch (player_1_symbol) {
    case "r": {
      switch (player_2_symbol) {
        case "r": {
          emitCombatResults(io, match_id, 0, "r", 0, "r");
        }
        case "p": {
          damage =
            10 *
            game.player2.dmg_modifier.paper *
            game.player1.protection_modifier.paper;
          emitCombatResults(io, match_id, damage, "r", 0, "p");
        }
        case "s": {
          damage =
            10 *
            game.player1.dmg_modifier.rock *
            game.player2.protection_modifier.rock;
          emitCombatResults(io, match_id, 0, "r", damage, "s");
        }
        default: {
          damage =
            20 *
            game.player1.dmg_modifier.rock *
            game.player2.protection_modifier.rock;
          emitCombatResults(io, match_id, 0, "r", damage, "");
        }
      }
    }
    case "p": {
      switch (player_2_symbol) {
        case "r": {
          damage =
            10 *
            game.player1.dmg_modifier.paper *
            game.player2.protection_modifier.paper;
          emitCombatResults(io, match_id, 0, "p", damage, "r");
        }
        case "p": {
          emitCombatResults(io, match_id, 0, "p", 0, "p");
        }
        case "s": {
          damage =
            10 *
            game.player2.dmg_modifier.scissors *
            game.player1.protection_modifier.scissors;
          emitCombatResults(io, match_id, damage, "p", 0, "s");
        }
        default: {
          damage =
            20 *
            game.player1.dmg_modifier.paper *
            game.player2.protection_modifier.paper;
          emitCombatResults(io, match_id, 0, "p", damage, "");
        }
      }
    }
    case "s": {
      switch (player_2_symbol) {
        case "r": {
          damage =
            10 *
            game.player2.dmg_modifier.rock *
            game.player1.protection_modifier.rock;
          emitCombatResults(io, match_id, damage, "s", 0, "r");
        }
        case "p": {
          damage =
            10 *
            game.player1.dmg_modifier.scissors *
            game.player2.protection_modifier.scissors;
          emitCombatResults(io, match_id, 0, "s", damage, "p");
        }
        case "s": {
          emitCombatResults(io, match_id, 0, "s", 0, "s");
        }
        default: {
          damage =
            20 *
            game.player1.dmg_modifier.scissors *
            game.player2.protection_modifier.scissors;
          emitCombatResults(io, match_id, 0, "s", damage, "");
        }
      }
    }
    default: {
      switch (player_2_symbol) {
        case "r": {
          damage =
            20 *
            game.player2.dmg_modifier.rock *
            game.player1.protection_modifier.rock;
          emitCombatResults(io, match_id, damage, "", 0, "r");
        }
        case "p": {
          damage =
            20 *
            game.player2.dmg_modifier.paper *
            game.player1.protection_modifier.paper;
          emitCombatResults(io, match_id, damage, "", 0, "p");
        }
        case "s": {
          damage =
            20 *
            game.player2.dmg_modifier.scissors *
            game.player1.protection_modifier.scissors;
          emitCombatResults(io, match_id, damage, "", 0, "s");
        }
        default: {
          emitCombatResults(io, match_id, -30, "", -30, "");
        }
      }
    }
  }
}