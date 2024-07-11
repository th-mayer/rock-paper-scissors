import { Server } from "socket.io";
import { socket_in_matches } from "./dicts/socket-in-match-dict";
import { open_matches } from "./dicts/open-matches-dict";
import { running_matches } from "./dicts/running-matches-dict";
import { dbUsers } from "../database-services/prisma-client";

export function handleDisconnect(socket_id: string, io: Server) {
  let match_id = socket_in_matches[socket_id];
  if (match_id) {
    console.log("[io]: Player " +socket_id +" from match with id " +match_id +" disconnected");
    if (running_matches[match_id]) {
      // If Client disconnected from a running match

      io.to(match_id).emit("game-crashed", "your opponent disconnected"); // This will end the game for remaining player
      
      console.log("[io]: Removed players from match with id " + match_id);

      let player1socket = running_matches[match_id].player1.socket;
      let player2socket = running_matches[match_id].player2.socket;

      if (player1socket) {
        player1socket.leave(match_id); // Remove sockets from the rooms
        if (socket_in_matches[player1socket.id]) {
          if (socket_id != player1socket.id)
            dbUsers.updateWinItemCoin(
              running_matches[match_id].player1.userID,
              true
            ); // Match counts as a win for remaining Player
          delete socket_in_matches[player1socket.id]; // Remove from sockets in matches dict
        }
      }
      if (player2socket) {
        player2socket.leave(match_id);
        if (socket_in_matches[player1socket.id]) {
          if (socket_id != player2socket.id)
            dbUsers.updateWinItemCoin(
              running_matches[match_id].player2.userID,
              true
            );
          delete socket_in_matches[player1socket.id];
        }
      }

      for (let m_id in running_matches) {
        if (m_id === match_id) {
          delete running_matches[match_id];
          console.log("[io]: Removed running_match with id " + match_id);
        }
      }
    } else if (open_matches[match_id]) {
      // If Client disconnected from a running match
      for (let m_id in open_matches) {
        // Remove remaining match from his dict (could be open or running match)
        if (m_id === match_id) {
          delete open_matches[match_id];
          console.log("[io]: Removed open_match with id " + match_id);
        }
      }
    }
    delete socket_in_matches[socket_id]; // Remove disconnected Socket form socket in matches dict
  }
}
