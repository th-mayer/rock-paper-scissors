import { Server } from "socket.io";
import { running_matches } from "./dicts/running-matches-dict";
import dbUsers from "../database-services/prisma-client";
import { socket_in_matches } from "./dicts/socket-in-match-dict";

export function endMatch(io: Server, match_id: string, winner: number) {
    let player1 = running_matches[match_id].player1;
    let player2 = running_matches[match_id].player2;
    switch(winner) {
        case 1: {
            dbUsers.updateWinItemCoin(player1.userID, true);
            dbUsers.updateWinItemCoin(player2.userID, false);
            io.to(match_id).emit(
            "game-end",
            player1.socket.id
            );
            break;
        }
        case 2: {
            dbUsers.updateWinItemCoin(player2.userID, true);
            dbUsers.updateWinItemCoin(player1.userID, false);
            io.to(match_id).emit(
            "game-end",
            player2.socket.id
            );
            break;
        }
        default: {
            io.to(match_id).emit("game-end", "stalemate");
            dbUsers.updateWinItemCoin(player2.userID, true);
            dbUsers.updateWinItemCoin(player1.userID, true);
            break;
        }
    }
    delete socket_in_matches[player1.socket.id]; // Remove players socketIds from socket_in_match dict
    delete socket_in_matches[player2.socket.id];
    player1.socket.leave(match_id); // Remove sockets from the rooms
    player2.socket.leave(match_id);
    removeMatch(match_id); // Delete match from running_match dict
}

function removeMatch(m_id: string) {
    setTimeout(()=>{
        delete running_matches[m_id];
        console.log("[io]: After its game end the match "+m_id+" deleted!");
    }, 5000);
}