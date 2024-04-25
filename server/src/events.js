const { Server } = require("socket.io");

const io = new Server(3000); // IO Sever listens on Port 3000

var matchmaking_diff_1 = {} // first dict, that trys to find a player with +1/-1 lvl, after not finding pushes match to second
var matchmaking_diff_10 = {} // second dict, that trys to find a player with +10/-10 lvl, after not finding pushes match to last
var matchmaking_diff_any = {} // last dict, matches any players together

var running_matches = {} // running matches dict (match_id / socket-room) => (matchObject)

io.on("connection", (socket) => { // basic socket.io intern emit, that accours when a new socket connects
  console.log("user connected"); // for reconection purpose the socket.id should be linked to the user for the connection duration
});

io.on("start-matchmaking", () => { // called if client wantes to be added to matchmaking list
  var client = {level: 10, name: "Test", items:{item1,item2,item3}} // get this information from client object in db
  var player = {name:client.name, lvl:client.level, items:client.items, socket:socket}
  addToMatchmaking(player)
});

io.on("abord-matchmaking", (m_id) => { // called if client wants to be removed from matchmaking list
  for (match_id in matchmaking_diff_1) {
    if (match_id == m_id) {
      delete matchmaking_diff_1[match_id]
      break
    }
  }
  for (match_id in matchmaking_diff_10) {
    if (match_id == m_id) {
      delete matchmaking_diff_10[match_id]
      break
    }
  }
  for (match_id in matchmaking_diff_any) {
    if (match_id == m_id) {
      delete matchmaking_diff_any[match_id]
      break
    }
  }
});

function addToMatchmaking(player) { // this adds a player to matchmaking by either finding one initally or adding a new match to the list
  io.to(socket.id).emit("matchmaking-started", m_id)
  for (match_id in matchmaking_diff_1) {
    if (2 <= max(matchmaking_diff_1[match_id].lvl, player.lvl) - min(matchmaking_diff_1[match_id].lvl, player.lvl)) {
      matchmaking_diff_1[match_id].player2 = player
      initiateMatch(matchmaking_diff_1[match_id],match_id)
      delete matchmaking_diff_1[match_id]
      break;
    }
  }
  for (match_id in matchmaking_diff_10) {
    if (2 <= max(matchmaking_diff_10[match_id].lvl, player.lvl) - min(matchmaking_diff_10[match_id].lvl, player.lvl)) {
      matchmaking_diff_10[match_id].player2 = player
      initiateMatch(matchmaking_diff_10[match_id],match_id)
      delete matchmaking_diff_10[match_id]
      break;
    }
  }
  for (match_id in matchmaking_diff_1) {
    if (2 <= max(matchmaking_diff_any[match_id].lvl, player.lvl) - min(matchmaking_diff_any[match_id].lvl, player.lvl)) {
      matchmaking_diff_any[match_id].player2 = player
      initiateMatch(matchmaking_diff_any[match_id],match_id)
      delete matchmaking_diff_any[match_id]
      break;
    }
  }
  //When no match was found in first list, add 
  var match = { lvl:player.lvl, player1: player, player2:null, instance:null} // create match object
  var match_id = generateRandomID() // create match_id
  matchmaking_diff_1[match_id] = match // put match into dict
  io.to(player.socket.id).emit("matchmaking-active", match_id) // give match_id to client so he can end matchmaking
}

function generateRandomID() { // this is used to generate a random string used for match IDs, etc.
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  const length = 10;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
    }
    return randomString;
}

function initiateMatch(match, match_id) { // this sends both clients to the game and sets up match instance
  var instance = {
    p1: { hp:100, sy: null, dmg:{r:10,p:10,s:10}, pro:{r:0.0,p:0.0,s:0.0} },  // modify these stats based on items of players from db
    p2: { hp:100, sy: null, dmg:{r:10,p:10,s:10}, pro:{r:0.0,p:0.0,s:0.0} }
  }
  match.instance = instance
  running_matches[match_id] = match
  io.to(match.player1.socket.id).emit("initiate-match", {name:player2.name, items: player2.items, lvl: player2.lvl}, {name:player1.name, items: player1.items, lvl: player1.lvl}, match_id)
  io.to(match.player2.socket.id).emit("initiate-match", {name:player1.name, items: player1.items, lvl: player1.lvl}, {name:player2.name, items: player2.items, lvl: player2.lvl}, match_id)
  match.player1.socket.join(match_id)
  match.player2.socket.join(match_id)
}

io.on("choice", (data) => { // called if clients symbol choice has been confirmed
  var choice = data.choice
  var match = running_matches[data.m_id]
  switch (choice) {
    case 'r': {
      if (socket.id == match.player1.socket.id) {
        match.instance.p1.sy = 'r'
      }
      if (socket.id == match.player2.socket.id) {
        match.instance.p2.sy = 'r'
      }
    }
    case 'p': {
      if (socket.id == match.player1.socket.id) {
        match.instance.p1.sy = 'p'
      }
      if (socket.id == match.player2.socket.id) {
        match.instance.p2.sy = 'p'
      }
    }
    case 's': {
      if (socket.id == match.player1.socket.id) {
        match.instance.p1.sy = 's'
      }
      if (socket.id == match.player2.socket.id) {
        match.instance.p2.sy = 's'
      }
    }
    default: {
      if (socket.id == match.player1.socket.id) {
        match.instance.p1.sy = ''
      }
      if (socket.id == match.player2.socket.id) {
        match.instance.p2.sy = ''
      }
    }
  }
});