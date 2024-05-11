import { Server, Socket } from "socket.io";
import { Item, Items, Player } from "./src/types/socket-connection-types";
import {
  matchmaking_diff_1,
  matchmaking_diff_10,
  matchmaking_diff_any,
} from "./src/matchmaking/dicts/player-level-dicts";
import { running_matches } from "./src/matchmaking/dicts/running-matches-dict";
import { addToMatchmaking } from "./src/matchmaking/add-to-matchmaking";

const port = 3000;
const connectedClients = () => io.engine.clientsCount;

const io = new Server(port, {
  cors: {
    origin: "http://localhost:5173",
  },
});

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

  // socket.emit("gm", "frens");

  // socket.on("gn", (arg) => {
  //   console.log(arg);
  // });
});

// shouldnt these all be in io.on as socket.on("event-name") ?
io.on("start-matchmaking", (socket) => {
  // called by client if he wants to be added to matchmaking
  var item: Item = {
    name: "TestItem",
    itemType: "test_type",
    effect: "e",
    description: "bla",
  };
  var items: Items = { item1: item, item2: item, item3: item };
  // !!!!!!!! DATA ABOVE HAS TO BE COLLECTED FROM DB FOR EACH CLIENT !!!!!!!!!!!!
  // TODO
  var player: Player = {
    name: "name",
    level: 10,
    items: items,
    socket: socket,
  };
  addToMatchmaking(io, player);
});

io.on("abort-matchmaking", (m_id) => {
  for (let match_id in matchmaking_diff_1) {
    if (match_id == m_id) {
      delete matchmaking_diff_1[match_id];
      break;
    }
  }
  for (let match_id in matchmaking_diff_10) {
    if (match_id == m_id) {
      delete matchmaking_diff_10[match_id];
      break;
    }
  }
  for (let match_id in matchmaking_diff_any) {
    if (match_id == m_id) {
      delete matchmaking_diff_any[match_id];
      break;
    }
  }
});

io.on("choice", (socket: Socket, data) => {
  var choice = data.choice; // symbol send by client
  var match = running_matches[data.m_id]; // get match, with by client provided match_id
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
});
