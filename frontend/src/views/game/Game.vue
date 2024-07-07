<script setup lang="ts">
import PlayerCard from '../../components/PlayerCard.vue';
import SymbolSelector from '../../components/SymbolSelector.vue';
import CombatResult from '../../components/CombatResults.vue';
import LoadingScreenComp from '../../components/LoadingScreen.vue';
import EndScreenComp from '../../components/EndScreen.vue';
import { computed, Ref, ref } from 'vue';
import { io } from 'socket.io-client';
import { PlayerData } from '../../types/socket-connection-types';

const socket = io(import.meta.env.VITE_API_URL);

enum GamePhase {
  BE_ADDED,
  WAIT_QUEUE,
  SELECTION,
  COMBAT,
  END
}

const socket_log: string = "[socket]: " // logging prefix
let match_id: string // socket room and key for servers match dict
let game_phase: GamePhase = 3; // current game phase
let chosen_symbol: string = '' // currently chosen symbol as char ('r','p','s' or '')

let my_health = 100;
let opp_health = 100;
let my_symbol = "";
let opp_symbol = "";

// TODO: rework this somehow, looks weird
let opponent_status: Ref;
let player_status : Ref;

const opponent_name = computed(()=>{
  if (opponent_status) return opponent_status.value.name;
  else return "Opponent";
}) 

const opponent_wins = computed(()=>{
  if (opponent_status) return opponent_status.value.wins;
  else return 0;
})

const opponent_items = computed(()=>{
  if (opponent_status) return opponent_status.value.items;
  else return undefined;
})

const player_name = computed(()=>{
  if (player_status) return player_status.value.name;
  else return "You";
}) 

const player_wins = computed(()=>{
  if (player_status) return player_status.value.wins;
  else return 0;
})

const player_items = computed(()=>{
  if (player_status) return player_status.value.items;
  else return undefined;
})

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

  socket.on("matchmaking-active", (m_id) => { // called if client was added to matchmaking
    match_id = m_id
    console.log(socket_log + "Matchmaking active")
    game_phase = GamePhase.WAIT_QUEUE;
  })

  socket.on("initiate-match", (opponent: PlayerData, me: PlayerData, m_id: string) => { // called if a match was found
    match_id = m_id;

    // recheck https://vuejs.org/api/sfc-script-setup.html reactivity, if this is done the right way
    // assign values for ui updates
    opponent_status = ref(opponent);
    player_status = ref(me);
    console.log(socket_log + "Found match");
    game_phase = GamePhase.SELECTION;
  })

  socket.on("choose-timeout", () => { // called if choosing timer runns out
    // request the chosen symbol for this round
    confirmSymbolChoice(chosen_symbol);
    console.log(socket_log+"Choose Timout, server requested the last chosen symbol '"+chosen_symbol+"");
  })

  socket.on("combat-round", (data) => { // called if both symbols are collected by server and combat was calculated by server
    // data contains the coosen symbol of player and opponent, and damage dealt
    my_health = data.myLife;
    my_symbol = data.mySymbol;
    opp_health = data.oppLife;
    opp_symbol = data.oppSymbol;

    game_phase = GamePhase.COMBAT;
  })

</script>

<template>
  <div v-if="game_phase == GamePhase.BE_ADDED || game_phase == GamePhase.WAIT_QUEUE">
    <LoadingScreenComp />
  </div>
  <div class="top-and-bottom" v-if="game_phase == GamePhase.SELECTION || game_phase == GamePhase.COMBAT">
    <div class="player-row">
      <PlayerCard :name="opponent_name" :wins="opponent_wins" :items="opponent_items" :health=opp_health class="enemy" :topbar="true"/>
    </div>
    <SymbolSelector @confirm-symbol="confirmSymbolChoice" v-if="game_phase == GamePhase.SELECTION"/>
    <CombatResult v-if="game_phase == GamePhase.COMBAT" />
    <div class="player-row right">
      <PlayerCard :name="player_name" :wins="player_wins" :items="player_items" :health=my_health class="player" :topbar="false"/>
    </div>
  </div>
  <div v-if="game_phase == GamePhase.END">
    <EndScreenComp />
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