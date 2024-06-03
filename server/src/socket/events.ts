import { Server, Socket } from "socket.io";
import { addToMatchmaking } from "../game/add-to-matchmaking";
import { running_matches } from "../game/dicts/running-matches-dict";
import { Item, ItemDB, Items, Player } from "../types/socket-connection-types";
import { calculateCombat } from "../game/combat/combat-calculate";

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

    // socket.emit("gm", "frens");

    // socket.on("gn", (arg) => {
    //   console.log(arg);
    // });
  });

  // shouldnt these all be in io.on as socket.on("event-name") ?
  io.on("start-matchmaking", (data) => {
    // called by client if he wants to be added to matchmaking
    const dbItem: ItemDB = { kind: 1, modifier: 2 };
    const placeholderItem: Item = {
      kind: 0,
      description: "",
      name: "",
      modifier: 1,
    };

    let players_user_token = data.token; //!!!!! Use this to collect the players array of Items
    let usersItems: ItemDB[] = [dbItem, dbItem, dbItem]; //!!!! Exchange with actuall Item array from DB
    var items: Items = [placeholderItem, placeholderItem, placeholderItem];

    for (let i = 0; i < 3; i++) {
      let item: Item = { kind: 0, description: "", name: "", modifier: 1 };
      switch (usersItems[i].kind) {
        case 0: {
          item.description =
            "Equipped person deals " +
            usersItems[i].modifier +
            "x times the damage when winning with rock";
          item.kind = usersItems[i].kind;
          item.name = "Heavy Stone";
          item.modifier = usersItems[i].modifier;
        }
        case 1: {
          item.description =
            "Equipped person deals " +
            usersItems[i].modifier +
            "x times the damage when winning with paper";
          item.kind = usersItems[i].kind;
          item.name = "Sharp Paper";
          item.modifier = usersItems[i].modifier;
        }
        case 2: {
          item.description =
            "Equipped person deals " +
            usersItems[i].modifier +
            "x times the damage when winning with scissors";
          item.kind = usersItems[i].kind;
          item.name = "Pointy Scissors";
          item.modifier = usersItems[i].modifier;
        }
        case 3: {
          item.description =
            "Equipped person receives only " +
            usersItems[i].modifier +
            "x times damage when loosing aginst rock";
          item.kind = usersItems[i].kind;
          item.name = "Brittle Stons";
          item.modifier = usersItems[i].modifier;
        }
        case 4: {
          item.description =
            "Equipped person receives only " +
            usersItems[i].modifier +
            "x times damage when loosing aginst paper";
          item.kind = usersItems[i].kind;
          item.name = "Damp Paper";
          item.modifier = usersItems[i].modifier;
        }
        case 5: {
          item.description =
            "Equiped person receives only " +
            usersItems[i].modifier +
            "x times damage when loosing aginst scissors";
          item.kind = usersItems[i].kind;
          item.name = "Blunt Scissors";
          item.modifier = usersItems[i].modifier;
        }
        default:
          {
            item.description = "No Item equipped in this slot";
            item.kind = 99;
            item.name = "None";
            item.modifier = 1;
          }
          items[i] = item;
      }
    }

    var player: Player = {
      name: "name",
      level: 10,
      items: items,
      socket: data.socket,
      token: data.token,
    };
    addToMatchmaking(io, player);
  });

  io.on("abort-matchmaking", (m_id) => {
    for (let match_id in running_matches) {
      if (match_id == m_id) {
        delete running_matches[match_id];
        break;
      }
    }
  });

  io.on("choice", (socket: Socket, data) => {
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
};
export default SocketServer;
