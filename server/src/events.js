const { Server } = require("socket.io");

const io = new Server(3000); // IO Sever listens on Port 3000

var matchmaking_diff_1 = [] // first list, that trys to find a player with +1/-1 lvl, after not finding pushes match to second
var matchmaking_diff_10 = [] // second list, that trys to find a player with +10/-10 lvl, after not finding pushes match to last
var matchmaking_diff_any = [] // last list, matches any players together

function generateRandomID() { // this is used to generate a random string used for match IDs, etc.
  return "sdjfewüfjsdpsfjl" // just a test, should normaly generate a random string
}

function addToMatchmaking(player) { // this adds a player to matchmaking by either finding one initally or adding a new match to the list
  io.to(socket.id).emit("matchmaking-started", m_id)
  for (match in matchmaking_diff_1) {
    if (2 <= max(match.lvl, player.lvl) - min(match,lvl, player.lvl)) {
      match.player2 = player
      initiateMatch(matchmaking_diff_1.splice(matchmaking_diff_1.indexOf(match),1)[0])
      break;
    }
  }
  for (match in matchmaking_diff_10) {
    if (2 <= max(match.lvl, player.lvl) - min(match,lvl, player.lvl)) {
      match.player2 = player
      initiateMatch(matchmaking_diff_1.splice(matchmaking_diff_1.indexOf(match),1)[0])
      break;
    }
  }
  for (match in matchmaking_diff_any) {
    if (2 <= max(match.lvl, player.lvl) - min(match,lvl, player.lvl)) {
      match.player2 = player
      initiateMatch(matchmaking_diff_1.splice(matchmaking_diff_1.indexOf(match),1)[0])
      break;
    }
  }
  //When no match was found in first list, add 
  var match = {m_id: generateRandomID(), lvl:player.lvl, player1: player, player2:null}
  matchmaking_diff_1.push(match)
}

function initiateMatch(match) { // this sends both clients to the game and sets up match instance

}

io.on("connection", (socket) => { // basic socket.io intern emit, that accours when a new socket connects
  console.log("user connected"); // for reconection purpose the socket.id should be linked to the user for the connection duration
});

io.on("start-matchmaking", (socket) => { // called if client wantes to be added to matchmaking list
  var client = {level: 10, name: "Test", items:{item1,item2,item3}} // get this information from client object in db
  var player = {name:client.name, lvl:client.level, items:client.items}
  
});

io.on("abord-matchmaking", (socket) => { // called if client wants to be removed from matchmaking list
  var client = {}
  for (match in matchmaking_1) {

  }
});

io.on("choice", (socket) => { // called if clients symbol choice has been confirmed

});