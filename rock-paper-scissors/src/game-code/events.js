var socketPrefix = "[socket]: "

var match_id // socket room and keyId for servers match dict
var chosen_symbol = '' // the currently chosen symbol as a char ('r' = rock, 'p' = paper, 's' = scissors, '' = none)

var socket = io()
var opp_name
var opp_lvl
var opp_health
var opp_item_1
var opp_item_2
var opp_item_3

var my_name
var lvl
var health
var item1
var item2
var item3

// Clients Messages

function startMatchMaking() { //call to add client to matchmaking list
    socket.emit("start-matchmaking");
    console.log(socketPrefix+"Matchmaking initiated")
};

function abordMatchMaking() { //call to remove client from matchmaking list
    socket.emit("stop-matchmaking", match_id);
};

function confirmChoice() { //call when symbol choice has been confirmed
    socket.emit("choice", chosen_symbol);
};

// Clients Reactions

socket.on("matchmaking-started", (m_id) => { // called if client was added to matchmaking list
    match_id = m_id
    console.log(socketPrefix+"Matchmaking active")
});

socket.on("initiate-match", (opponent, me, m_id) => { // called by server if a match was found
    // save match_id to pass it to server later to ease the assignment
    match_id = m_id

    // opponent variables
    opp_name = opponent.name
    opp_lvl = opponent.lvl
    opp_health = 100
    opp_item_1 = opponent.items.item1 // mind that itemX is a object containing the .kind ("sp","rp","ra",...) and .discription ("Increases x by y ...")
    opp_item_2 = opponent.items.item2
    opp_item_3 = opponent.items.item3

    // player variables
    my_name = me.name
    lvl = me.lvl
    health = 100
    item1 = me.items.item1
    item2 = me.items.item2
    item3 = me.items.item3

    console.log(socketPrefix+"Found match")
});

socket.on("choose-timeout", () => { // called if choosing timer runns out
    // requests the chosen symbol for this round
    socket.emit("choice", chosen_symbol);
});

socket.on("combat round", (data) => { // called if both symbols are collected by server and combat was calculated by server
    // data contains the coosen symbol of player and opponent, and damage dealt
});