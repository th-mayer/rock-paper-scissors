import { Server, Socket } from "socket.io";
import { addToMatchmaking } from "../game/add-to-matchmaking";
import { running_matches } from "../game/dicts/running-matches-dict";
import { open_matches } from "../game/dicts/open-matches-dict";
import { Item, Player, isValidUser } from "../types/socket-connection-types";
import { calculateCombat } from "../game/combat/combat-calculate";
import dbUsers from "../database-services/prisma-client";

const SocketServer = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  const connectedClients = () => io.engine.clientsCount;

  io.on("connect", (socket) => { // The socket connection is now open and can listen for the emits from client
    console.log("Connected!");
    console.log(`${socket.id} connected`);
    console.log(`${connectedClients()} clients are online`);

    socket.on("disconnect", (reason) => {
      console.log(`${socket.id} disconnected`);
      console.log(`${connectedClients} clients are online`);
    });

    socket.on("start-matchmaking", async (user) => { // called by client if he wants to be added to matchmaking
      console.log(isValidUser(user))
      if (isValidUser(user)) { // Validate that passed user variable contains all needed data, to prevent runtime problems
// TODO MAYBE: Shouldent the backend get the user, so the frontend cant "cheat" a selfmed user object?
        let player: Player = {
          name: user.username,
          items: user.items,
          socket: socket,
          wins: user.wins,
          userID: user.id,
        };
        addToMatchmaking(io, player);
      } else {
        io.to(socket.id).emit("game-crashed", "The user object passed from client was wrong or incomplete")
      }
    });

    socket.on("abort-matchmaking", (m_id) => {
      for (let match_id in open_matches) {
        if (match_id == m_id) {
          delete open_matches[match_id];
          return;
        }
      }
    });
  
    socket.on("choice", (data) => {
      let choice = data.choice; // symbol send by client
      let match = running_matches[data.m_id]; // get match, with by client provided match_id
      let player;

      if (match) { // Make sure, there even is a match in running_matches
        if (socket.id == match.player1.socket.id) {
          player = match.instance.player1;
          console.log("player 1 choice: "+choice)
        } else if (socket.id == match.player2.socket.id) {
          player = match.instance.player2;
          console.log("player 2 choice: "+choice)
        } else { // If he is not inside of the game, alert him, and remove him from game
          io.to(socket.id).emit("game-crashed", "You were not inside of the game, you have been connected to")
          return;
        }
        player.chosen = true; // Set chosen to true, since this player has already chosen
        player.symbol = choice; // Set the symbol to what was passed by the client
        if (
          match.instance.player1.chosen == true && // Check if both have already chosen
          match.instance.player2.chosen == true
        ) {
          calculateCombat(io, data.m_id);
          match.instance.player1.chosen = false; // Reset the choesen boolean
          match.instance.player2.chosen = false;
        }
      } else { // Inform client, he got a depricated match-id key and remove him from game
        io.to(socket.id).emit("game-crashed", "Your match_id is depricated or the match already ended")
          return;
      }
    });
  });
 }; export default SocketServer;
