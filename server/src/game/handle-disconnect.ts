import { Server } from "socket.io";
import { socket_in_matches } from "./dicts/socket-in-match-dict";
import { open_matches } from "./dicts/open-matches-dict";
import { running_matches } from "./dicts/running-matches-dict";


export function handleDisconnect(socket_id: string, io: Server) {
    let match_id = socket_in_matches[socket_id];
    if (match_id){
        io.to(match_id).emit("game-crashed", "your opponent disconnected"); // This will end the game for remaining player
        console.log("[io]: Player "+socket_id+" from match with id "+match_id+" disconnected")
        console.log("[io]: Removed players from match with id "+match_id)

        let player1socket = running_matches[match_id]?.player1?.socket;
        let player2socket = running_matches[match_id]?.player1?.socket;

        if (player1socket) player1socket.leave(match_id); // Remove sockets from the rooms
        if (player2socket) player2socket.leave(match_id);

        for (let m_id in open_matches) { // Remove remaining match from his dict (could be open or running match)
            if (m_id === match_id) {
            delete open_matches[match_id];
            console.log("[io]: Removed open_match with id "+match_id)
            } 
        }
        for (let m_id in running_matches) {
            if (m_id === match_id) {
                delete running_matches[match_id];
                console.log("[io]: Removed running_match with id "+match_id)
            }
        }
    } else {
        console.log("[io]: Socket wasnt in match")
    }
}