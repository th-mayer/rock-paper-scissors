import { Server, Socket } from "socket.io";
import { addToMatchmaking } from "../game/add-to-matchmaking";
import { running_matches } from "../game/dicts/running-matches-dict";
import { Item, Player } from "../types/socket-connection-types";
import { calculateCombat } from "../game/combat/combat-calculate";
import dbUsers from "../database-services/prisma-client";

const SocketServer = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  const connectedClients = () => io.engine.clientsCount;

  /**
   * Events
   */
  io.on("connect", (socket) => {
    console.log("Connected!");
    console.log(`${socket.id} connected`);
    console.log(`${connectedClients()} clients are online`);

    socket.on("disconnect", (reason) => {
      console.log(`${socket.id} disconnected`);
      console.log(`${connectedClients} clients are online`);
    });

    socket.on("start-matchmaking", async (data) => {
      // called by client if he wants to be added to matchmaking
  
      // TODO: check what the JSON obj sent by client socket actually looks like
      // assumption: user { id, email, username, hash, items: {item1, item2, item3}, itemCoin }
      let user = await dbUsers.getUserById(1);
      var items: Item[] = user.items;
  
      var player: Player = {
        name: user.username,
        items: items,
        socket: socket,
        wins: user.wins,
      };
      addToMatchmaking(io, player);
    });

    socket.on("abort-matchmaking", (m_id) => {
      for (let match_id in running_matches) {
        if (match_id == m_id) {
          delete running_matches[match_id];
          return;
        }
      }
    });
  
    socket.on("choice", (socket: Socket, data) => {
      var choice = data.choice; // symbol send by client
      var match = running_matches[data.m_id]; // get match, with by client provided match_id
  
      if (socket.id == match.player1.socket.id) {
        match.instance!.player1.chosen = true;
      } else if (socket.id == match.player2?.socket.id) {
        match.instance!.player2.chosen = true;
      }
  
      switch (
        choice // put choice into game instance
      ) {
        case "r": {
          if (socket.id == match.player1.socket.id) {
            match.instance!.player1.symbol = "r";
          }
          if (socket.id == match.player2!.socket.id) {
            match.instance!.player2.symbol = "r";
          }
        }
        case "p": {
          if (socket.id == match.player1.socket.id) {
            match.instance!.player1.symbol = "p";
          }
          if (socket.id == match.player2!.socket.id) {
            match.instance!.player2.symbol = "p";
          }
        }
        case "s": {
          if (socket.id == match.player1.socket.id) {
            match.instance!.player1.symbol = "s";
          }
          if (socket.id == match.player2!.socket.id) {
            match.instance!.player2.symbol = "s";
          }
        }
        case "": {
          if (socket.id == match.player1.socket.id) {
            match.instance!.player1.symbol = "";
          }
          if (socket.id == match.player2!.socket.id) {
            match.instance!.player2.symbol = "";
          }
        }
      }
  
      if (
        match.instance!.player1.chosen == true &&
        match.instance!.player2.chosen == true
      ) {
        calculateCombat(io, data.m_id);
        match.instance!.player1.chosen = false;
        match.instance!.player2.chosen = false;
      }
    });
  });
 }; export default SocketServer;
