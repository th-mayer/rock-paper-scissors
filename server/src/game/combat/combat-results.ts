import { Server } from "socket.io";
import { running_matches } from "../dicts/running-matches-dict";
import dbUsers from "../../database-services/prisma-client";

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
    io.to(match_id).emit("game-end", "stalemate");
    dbUsers.updateWinItemCoin(running_matches[match_id].player2.userID, true);
    dbUsers.updateWinItemCoin(running_matches[match_id].player1.userID, true);
    removeMatch(match_id);
  } else if (instance.player1.hp <= 0) {
    dbUsers.updateWinItemCoin(running_matches[match_id].player2.userID, true);
    dbUsers.updateWinItemCoin(running_matches[match_id].player1.userID, false);
    removeMatch(match_id);
    io.to(match_id).emit(
      "game-end",
      running_matches[match_id].player2.socket.id
    );
  } else if (instance.player2.hp <= 0) {
    dbUsers.updateWinItemCoin(running_matches[match_id].player1.userID, true);
    dbUsers.updateWinItemCoin(running_matches[match_id].player2.userID, false);
    removeMatch(match_id);
    io.to(match_id).emit(
      "game-end",
      running_matches[match_id].player1.socket.id
    );
  }

  function removeMatch(m_id: string) {
    setTimeout(()=>{
      delete running_matches[m_id];
      console.log("match: "+match_id+" deleted!");
    }, 5000);
  }

  function clipHealth(newHealth: number): number { // Make sure the combatresult, wont put player health below 0 or above 100
    return Math.max(0, Math.min(newHealth, 100));
  }
}