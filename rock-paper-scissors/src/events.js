var match_id

// Clients Messages

function startMatchMaking() { //call to add client to matchmaking list
    socket.emit("start-matchmaking");
};

function abordMatchMaking() { //call to remove client from matchmaking list
    socket.emit("stop-matchmaking", match_id);
};

function confirmChoice(symbol) { //call when symbol choice has been confirmed
    socket.emit("choice", symbol);
};

// Clients Reactions

socket.on("matchmaking-started", (m_id) => { // called if client was added to matchmaking list
    match_id = m_id
    console.log("Matchmaking successfully initiated");
});

socket.on("initiate-match", (data) => { // called by server if a match was found
    // data should contain opponent object with name and items he got to display on client screen
});

socket.on("choose-timeout", () => { // called if choosing timer runns out
    // requests the chosen symbol for this round
});

socket.on("combat round", (data) => { // called if both symbols are collected by server and combat was calculated by server
    // data contains the coosen symbol of player and opponent, and damage dealt
});