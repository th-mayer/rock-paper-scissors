<script setup lang="ts">
import { watchEffect } from 'vue';
import { io } from 'socket.io-client';
import { Item, PlayerData } from '../types/socket-connection-types';

const serverURL = "http://localhost:3000";
const socket = io(serverURL);

const socket_log: string = "[socket]: " // logging prefix
let match_id: string // socket room and key for servers match dict
let chosen_symbol: string // currently chosen symbol as char ('r','p','s' or '')

const props = defineProps<{
  opponent: [
    oppName: string,
    oppLevel: number,
    oppHealth: number,
    oppItem_1: Item,
    oppItem_2: Item,
    oppItem_3: Item,
  ],
  me: [
    my_name: string,
    my_level: number,
    my_health: number,
    my_item_1: Item,
    my_item_2: Item,
    my_item_3: Item,
  ]
}>()

// watch Socket events
watchEffect(() => {
  socket.on("connect", () => {
    console.log(socket);

    // socket.emit("gn", { name: "steph" });
    // socket.on("gm", (arg) => {
    //   console.log(arg);
    // })
  });

  socket.on("matchmaking-active", (m_id) => { // called if client was added to matchmaking
    match_id = m_id
    console.log(socket_log + "Matchmaking active")
  })

  socket.on("initiate-match", (opponent: PlayerData, me: PlayerData, m_id: string) => { // called if a match was found
    match_id = m_id

    // opponent variables
    props.oppName = opponent.name
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

    console.log(socket_log + "Found match")
  })

  socket.on("choose-timeout", () => { // called if choosing timer runns out
    // request the chosen symbol for this round
    confirmChoice();
  })

  socket.on("combat-round", (data) => { // called if both symbols are collected by server and combat was calculated by server
    // data contains the coosen symbol of player and opponent, and damage dealt
  })

})
</script>

<template>
  <p>{{ }}</p>

</template>

<style></style>
