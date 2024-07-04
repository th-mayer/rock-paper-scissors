<script setup lang="ts">
import PlayerCard from '../../components/PlayerCard.vue';
import SymbolSelector from '../../components/SymbolSelector.vue';
import CombatResult from '../../components/CombatResults.vue';
import { Ref, ref, watchEffect } from 'vue';
import { Socket, io } from 'socket.io-client';
import { PlayerData } from '../../types/socket-connection-types';

const socket = io(import.meta.env.VITE_API_URL);

const socket_log: string = "[socket]: " // logging prefix
let match_id: string // socket room and key for servers match dict
let chosen_symbol: string = '' // currently chosen symbol as char ('r','p','s' or '')

// TODO: rework this somehow, looks weird
let opponent_status: Ref;
let me_status : Ref;

// move this function to its own file?
function confirmSymbolChoice(symbol: string) { // call to send chosen symbol to server
  if (symbol && match_id) {
    socket.emit("choice", { choice: symbol, m_id: match_id });
    chosen_symbol = symbol;
    console.log(socket_log + "choice: " + symbol + " confirmed");
  } else if (symbol) {
    console.error(socket_log + "no match_id")
  } else if (match_id) {
    console.warn(socket_log + "no symbol has been passed")
  }
}

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
    match_id = m_id;

    // recheck https://vuejs.org/api/sfc-script-setup.html reactivity, if this is done the right way
    // assign values for ui updates
    opponent_status = ref(opponent);
    me_status = ref(me);
    console.log(socket_log + "Found match");
  })

  socket.on("choose-timeout", () => { // called if choosing timer runns out
    // request the chosen symbol for this round
    confirmSymbolChoice(chosen_symbol);
    console.log(socket_log+"Choose Timout, server requested the last chosen symbol '"+chosen_symbol+"");
  })

  socket.on("combat-round", (data) => { // called if both symbols are collected by server and combat was calculated by server
    // data contains the coosen symbol of player and opponent, and damage dealt
  })

})

const props = defineProps({
  enemyName: String,
  playerName: String
});

</script>

<template>
  <div class="top-and-bottom">
    <div class="player-row">
      <PlayerCard name="trinkl" wins=234234 class="enemy" :topbar="true"/>
    </div>
    <SymbolSelector @confirm-symbol="confirmSymbolChoice"/>
    <CombatResult />
    <div class="player-row right">
      <PlayerCard name="professorClever69" wins="123" class="player" />
    </div>
  </div>
</template>

<style lang="scss">
@import "../../css/main.scss";

* {
  margin: 0;
  color: $bright-font-color;
}

.player-row{
  display: flex;
  height: 15vh;
  width: 100vw;
  margin: 5vh;
}

.right {
  justify-content: end;
}

.top-and-bottom {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
</style>