import { Server, Socket } from 'socket.io'
import { Match, Player, PlayerStats, Modifier, GameInstance, Items, Item } from './types/socket-connection-types'

const io = new Server()

// Matchmaking dicts, when waiting you will be put further down to ensure a match
var matchmaking_diff_1: { [match_id: string]: Match; } // matches players with +/- 1 level
var matchmaking_diff_10: { [match_id: string]: Match; } // matches players with +/- 10 levels
var matchmaking_diff_any: { [match_id: string]: Match; } // matches players with any level

var running_matches: { [match_id: string]: Match; } // running match

io.on("connection", () => {
    console.log("user connected")
});

io.on("start-matchmaking", (socket) => { // called by client if he wants to be added to matchmaking
    var item: Item = {name: "TestItem", discription: "bla", type: "a"}
    var items: Items = {item1: item, item2: item, item3: item}
    // !!!!!!!! DATA ABOVE HAS TO BE COLLECTED FROM DB FOR EACH CLIENT !!!!!!!!!!!!
    var player: Player = {name: "name", level: 10, items: items, socket: socket }
    addToMatchmaking(player)
});

io.on("abort-matchmaking", (m_id) => {
    for (let match_id in matchmaking_diff_1) {
        if (match_id == m_id) {
          delete matchmaking_diff_1[match_id]
          break
        }
      }
      for (let match_id in matchmaking_diff_10) {
        if (match_id == m_id) {
          delete matchmaking_diff_10[match_id]
          break
        }
      }
      for (let match_id in matchmaking_diff_any) {
        if (match_id == m_id) {
          delete matchmaking_diff_any[match_id]
          break
        }
      }
});

function addToMatchmaking(player: Player) {
    // Before a new match is created, server will check if this player is a suiteable opponent
    // for a already created matchmaking entry
    for (let match_id in matchmaking_diff_1) {
        if (2 <= Math.max(matchmaking_diff_1[match_id].level, player.level) - Math.min(matchmaking_diff_1[match_id].level, player.level)) {
            matchmaking_diff_1[match_id].player2 = player
            initiateMatch(matchmaking_diff_1[match_id],match_id)
            return
        }
    }
    for (let match_id in matchmaking_diff_10) {
        if (2 <= Math.max(matchmaking_diff_10[match_id].level, player.level) - Math.min(matchmaking_diff_10[match_id].level, player.level)) {
            matchmaking_diff_10[match_id].player2 = player
            initiateMatch(matchmaking_diff_10[match_id],match_id)
            return
        }
    }
    for (let match_id in matchmaking_diff_any) {
        if (2 <= Math.max(matchmaking_diff_any[match_id].level, player.level) - Math.min(matchmaking_diff_any[match_id].level, player.level)) {
            matchmaking_diff_any[match_id].player2 = player
            initiateMatch(matchmaking_diff_any[match_id],match_id)
            return
        }
    }
    // If no match is suiteable, a new entry into matchmaking will be created
    let match: Match = {level: player.level, player1: player, player2: null, instance: null} // create match
    let match_id: string = generateRandomID() // generate id for matchmaking and later socket room
    matchmaking_diff_1[match_id] = match // add match to matchmaking dict
}

function generateRandomID(): string { // this is used to generate a random string used for match IDs, etc.
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    const length = 10;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
      }
      return randomString;
  }

function initiateMatch(match: Match, match_id: string) {
    var instance: GameInstance = { // instance contains all gamerelevant stats,  the server needs to calcualte combat results
        player1: { hp: 100, symbol: null, dmg_modifier: {rock: 10, paper: 10, scissors: 10}, protection_modifier: { rock: 0, paper: 0, scissors: 0} },
        player2: { hp: 100, symbol: null, dmg_modifier: {rock: 10, paper: 10, scissors: 10}, protection_modifier: { rock: 0, paper: 0, scissors: 0} }
    }
    // !!!!!!!! MODIFY DMG AND PROTECTON MODIFERS ACCORDING TO PLAYERS ITEMS EFFECTS (FROM DB) !!!!!!!
    match.instance = instance // add games stats to match object
    running_matches[match_id] = match // add match to active matches dict
    // now inform clients and send them ( opponent, self, match_id )
    io.to(match.player1.socket.id).emit("initiate-match", {name: match.player2!.name, items: match.player2!.items, level: match.player2!.level}, {name: match.player1.name, items: match.player1.items, level: match.player1.level}, match_id)
    io.to(match.player2!.socket.id).emit("initiate-match", {name: match.player1.name, items: match.player1.items, level: match.player1.level}, {name: match.player2!.name, items: match.player2!.items, level: match.player2!.level}, match_id)
    // then put clients into socket room for easier broadcasting of game data
    match.player1.socket.join(match_id)
    match.player2?.socket.join(match_id)
}

io.on("choice", (socket: Socket, data) => {
    var choice = data.choice // symbol send by client
    var match = running_matches[data.m_id] // get match, with by client provided match_id
    switch (choice) { // put choice into game instance
        case 'r': {
            if (socket.id == match.player1.socket.id) {
                match.instance!.player1.symbol = 'r'
            }
            if (socket.id == match.player2!.socket.id) {
                match.instance!.player2.symbol = 'r'
            }
        }
        case 'p': {
            if (socket.id == match.player1.socket.id) {
                match.instance!.player1.symbol = 'p'
            }
            if (socket.id == match.player2!.socket.id) {
                match.instance!.player2.symbol = 'p'
            }
        }
        case 's': {
            if (socket.id == match.player1.socket.id) {
                match.instance!.player1.symbol = 's'
            }
            if (socket.id == match.player2!.socket.id) {
                match.instance!.player2.symbol = 's'
            }
        }
        case '': {
            if (socket.id == match.player1.socket.id) {
                match.instance!.player1.symbol = ''
            }
            if (socket.id == match.player2!.socket.id) {
                match.instance!.player2.symbol = ''
            }
        }
    }
});