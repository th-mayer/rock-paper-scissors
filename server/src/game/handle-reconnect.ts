import { Server } from "socket.io";
import { running_matches } from "./dicts/running-matches-dict";

export function reconnect(io: Server, socket_id: string, match_id: string) {
  console.log("[io]: player " + socket_id + " reconnects to " + match_id);
  let match = running_matches[match_id];

  if (match?.player1?.socket?.id === socket_id) {
    io.to(socket_id).emit("initiate-match", {
      opponent: {
        name: match.player2.name,
        health: 100,
        wins: match.player2.wins,
        items: match.player2.items,
      },
      player: {
        name: match.player1.name,
        health: 100,
        wins: match.player1.wins,
        items: match.player1.items,
      },
      m_id: match_id,
    });
  } else if (match?.player2?.socket?.id === socket_id) {
    io.to(socket_id).emit("initiate-match", {
      opponent: {
        name: match.player1.name,
        health: 100,
        wins: match.player1.wins,
        items: match.player1.items,
      },
      player: {
        name: match.player2.name,
        health: 100,
        wins: match.player2.wins,
        items: match.player2.items,
      },
      m_id: match_id,
    });
  }
}
