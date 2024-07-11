import { Server } from "socket.io";
import { running_matches } from "../dicts/running-matches-dict";
import { endMatch } from "../end-match";

export const emitCombatResults = (
  io: Server, // Socket Server, needs to be passed so this file can use io.emit()
  match_id: string, // Key for the running matches dict
  player1_dmg: number, // Amount of damage player 1 takes
  player1_symbol: string, // Symbol that player 1 chose
  player2_dmg: number, // Amount of damage player 2 takes
  player2_symbol: string // Symbol that player 2 chose
) => {
  let instance = running_matches[match_id].instance;

  instance.player1.hp = clipHealth(instance.player1.hp - player1_dmg); // Apply the damages to the "game-instance"
  instance.player2.hp = clipHealth(instance.player2.hp - player2_dmg);

  let player1_hp = instance.player1.hp; // Get the updated health
  let player2_hp = instance.player2.hp;

  io.to(running_matches[match_id].player1.socket.id).emit("combat-round", { // Send results to players
    mySymbol: player1_symbol,
    myLife: player1_hp,
    oppSymbol: player2_symbol,
    oppLife: player2_hp,
  });
  io.to(running_matches[match_id].player2.socket.id).emit("combat-round", {
    mySymbol: player2_symbol,
    myLife: player2_hp,
    oppSymbol: player1_symbol,
    oppLife: player1_hp,
  });

  if (instance.player1.hp <= 0 && instance.player2.hp <= 0) { // Find out if somone died
    endMatch(io,match_id,0)
  } else if (instance.player1.hp <= 0) {
    endMatch(io,match_id,2)
  } else if (instance.player2.hp <= 0) {
    endMatch(io,match_id,1)
  }

  function clipHealth(newHealth: number): number { // Make sure the combatresult, wont put player health below 0 or above 100
    return Math.max(0, Math.min(newHealth, 100));
  }
}