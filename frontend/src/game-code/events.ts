import { io } from 'socket.io-client'
import { Item, PlayerData } from '../types/socket-connection-types'


const socket = io()
const loc: string = "[socket]: " // prefix for console.log()s to see, that this log comes from websocket

let match_id: string // socket room and key for servers match dict
let chosen_symbol: string // currently chosen symbol as char ('r','p','s' or '')

// Opponents variables for UI
let opp_name: string 
let opp_level: number
let opp_health: number
let opp_item_1: Item
let opp_item_2: Item
let opp_item_3: Item

// Clients variables for UI
let my_name: string
let my_level: number
let my_health: number
let my_item_1: Item
let my_item_2: Item
let my_item_3: Item

function startMatchMaking() { // call to add client to matchmaking
    socket.emit("start-matchmaking")
    console.log(loc+"Matchmaking initiated")
}

function abortMatchMaking() { // call to remove client from matchmaking
    if (match_id) {
        socket.emit("abort-matchmaking", match_id)
        console.log(loc+"Abort matchmaking")
    } else console.warn(loc+"No match_id saved");
}

function confirmChoice() { // call to send chosen symbol to server
    if ( chosen_symbol && match_id) {
    socket.emit("choice", {choice: chosen_symbol, m_id: match_id})
    console.log(loc+"choice: "+chosen_symbol+" confirmed")
    } else if (chosen_symbol) {
        console.error(loc+"no match_id")
    } else if (match_id) {
        console.warn(loc+"no symbol has been passed")
    }
}

socket.on("matchmaking-active", (m_id) => { // called if client was added to matchmaking
    match_id = m_id
    console.log(loc+"Matchmaking active")
})

socket.on("initiate-match", (opponent: PlayerData, me: PlayerData, m_id: string) => { // called if a match was found
    match_id = m_id

    // opponent variables
    opp_name = opponent.name
    opp_level = opponent.level
    opp_health = opponent.health
    opp_item_1 = opponent.items.item1
    opp_item_2 = opponent.items.item2
    opp_item_3 = opponent.items.item3

    // player variables
    my_name = me.name
    my_level = me.level
    my_health = me.health
    my_item_1 = me.items.item1
    my_item_2 = me.items.item2
    my_item_3 = me.items.item3

    console.log(loc+"Found match")
})

socket.on("choose-timeout", () => { // called if choosing timer runns out
    // request the chosen symbol for this round
    confirmChoice();
})

socket.on("combat-round", (data) => { // called if both symbols are collected by server and combat was calculated by server
    // data contains the coosen symbol of player and opponent, and damage dealt
})
