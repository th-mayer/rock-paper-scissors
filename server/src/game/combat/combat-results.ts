import { Server } from "socket.io";
import { running_matches } from "../dicts/running-matches-dict";

export const emitCombatResults = (
  io: Server,
  match_id: string,
  player1_dmg: number,
  player1_symbol: string,
  player2_dmg: number,
  player2_symbol: string
) => {
  let instance = running_matches[match_id].instance!;

  instance.player1.hp - player1_dmg;
  instance.player2.hp - player2_dmg;

  let player1_hp = instance.player1.hp;
  let player2_hp = instance.player2.hp;

  // Send results to players
  io.to(running_matches[match_id].player1.socket.id).emit("combat-round", {
    mySymbol: player1_symbol,
    myLife: player1_hp,
    oppSymbol: player2_symbol,
    oppLife: player2_hp,
  });
  io.to(running_matches[match_id].player2!.socket.id).emit("combat-round", {
    mySymbol: player2_symbol,
    myLife: player2_hp,
    oppSymbol: player1_symbol,
    oppLife: player1_hp,
  });

  if (instance.player1.hp <= 0 && instance.player2.hp <= 0) {
    io.to(match_id).emit("game-end", "stalemate");
  } else if (instance.player1.hp <= 0) {
    io.to(match_id).emit(
      "game-end",
      running_matches[match_id].player1.socket.id
    );
  } else if (instance.player2.hp <= 0) {
    io.to(match_id).emit(
      "game-end",
      running_matches[match_id].player2!.socket.id
    );
  }
}