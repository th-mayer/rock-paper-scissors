<script setup lang="ts">
import PlayerCard from '../../components/PlayerCard.vue';
import SymbolSelector from '../../components/SymbolSelector.vue';
import CombatResult from '../../components/CombatResult.vue';
import LoadingScreenComp from '../../components/LoadingScreen.vue';
import EndScreenComp from '../../components/EndScreen.vue';
import socket from '../../socket.ts';
import { Item } from '../../types/socket-connection-types';
import { computed, onBeforeMount, onMounted, Ref, ref } from 'vue';
import { PlayerData } from '../../types/socket-connection-types';
import { useUserStore } from '../../stores/users.store';
import { storeToRefs } from 'pinia';

// -------------------------------------------------------------------------
// ----------------------- Declaration of variables ------------------------
// -------------------------------------------------------------------------

enum GamePhase { // Game phases as enum to be easy to modify
  BE_ADDED,
  WAIT_QUEUE,
  GAME_FOUND,
  SELECTION,
  RESULT,
  END
}

const userStore = useUserStore();
let { user } = storeToRefs(userStore);

onBeforeMount(async () => { //Get the User before mounting
  await userStore.getCurrentUser();
  console.log(user.value);
});

onMounted(() => { //Add User to Matchmaking as soon as the app mounts this site
  setTimeout(() => { socket.emit("start-matchmaking", user.value) }, 1000);
})

const socket_log: string = "[socket]: " // logging prefix
let match_id: string // socket room and key for servers match dict
let game_phase: Ref<GamePhase> = ref(GamePhase.BE_ADDED); // current game phase
let chosen_symbol: string = "" // currently chosen symbol as char ('r','p','s' or '')
let chosen: boolean = false;  // true, when already chosen

let my_health: Ref<number> = ref(100); // Refs for the health and chosen symbols, updated only by server
let opp_health: Ref<number> = ref(100);
let my_symbol: Ref<string> = ref("");
let opp_symbol: Ref<string> = ref("");

let endScreenTitle = "End Screen";
let endScreenMessage = "Message!";


const opponent_status: Ref<PlayerData | undefined> = ref(undefined) // Refs to Client Objects, passed by server when match is initiated
const player_status: Ref<PlayerData | undefined> = ref(undefined)

const opponent_name = computed(() => { // Computed values that give placeholders to componentes when required data has not arrived yet
  if (opponent_status.value) return opponent_status.value.name;
  else return "Opponent";
})

const opponent_wins = computed(() => {
  if (opponent_status.value) return opponent_status.value.wins;
  else return 0;
})

const opponent_items = computed(() => {
  let placeholderItems: Item[] = [{kind:99,modifier:1},{kind:99,modifier:1},{kind:99,modifier:1}];
  if (opponent_status.value) return opponent_status.value.items;
  else return placeholderItems;
})

const player_name = computed(() => {
  if (player_status.value) return player_status.value.name;
  else return "player";
})

const player_wins = computed(() => {
  if (player_status.value) return player_status.value.wins;
  else return 0;
})

const player_items = computed(() => {
  let placeholderItems: Item[] = [{kind:99,modifier:1},{kind:99,modifier:1},{kind:99,modifier:1}];
  if (player_status.value) return player_status.value.items;
  else return placeholderItems;
})

// -------------------------------------------------------------------------
// --- Helper fuctions, for dry code or to be called by component events ---
// -------------------------------------------------------------------------

function confirmSymbolChoice(symbol: string) { // call to send chosen symbol to server
  if (symbol == "" || symbol == "r" || symbol == "p" || symbol == "s" && match_id) {
    socket.emit("choice", { choice: symbol, m_id: match_id });
    chosen_symbol = symbol;
    console.log(socket_log + "choice: '" + symbol + "' confirmed");
  } else if (symbol) {
    console.error(socket_log + "no match_id")
  } else if (match_id) {
    console.warn(socket_log + "no symbol has been passed")
  }
}

function cancelMatchmaking() {
  socket.emit("abort-matchmaking", match_id);
}

function startQueuePhase() {
  if (game_phase.value != GamePhase.END) {
    game_phase.value = GamePhase.WAIT_QUEUE;
    return true;
  }
  return false;
}

function startSelectionPhase() {
  if (game_phase.value != GamePhase.END) game_phase.value = GamePhase.SELECTION;
}

function getLastChoice() {
  if (!chosen && game_phase.value == GamePhase.SELECTION) { // Only collect if not already chosen and in Selection-Phase
    confirmSymbolChoice(chosen_symbol);
    console.log(socket_log + "Choose Timout, server requested the last chosen symbol '" + chosen_symbol + "");
  }
}

function startResultPhase() {
  if (game_phase.value != GamePhase.END) {
    game_phase.value = GamePhase.RESULT;
    chosen_symbol = "";
    chosen = false;
    setTimeout(startSelectionPhase, 6500);
  }
}

function startEndPhase(title: string, message: string) {
  if (game_phase.value != GamePhase.END) { // The game can only end once, ensures that a game end would not overwrite a crash message
    endScreenTitle = title;
    endScreenMessage = message;
    game_phase.value = GamePhase.END;
  }
}

function startDelayedEndPhase(title: string, message: string) { // End game but with delay, used for normal game ends
  setTimeout(()=> {
    startEndPhase(title,message);
  }, 5000);
}

// -------------------------------------------------------------------------
// --------------------------- Socket reactions ----------------------------
// -------------------------------------------------------------------------

socket.on("matchmaking-active", (m_id) => { // called if client was added to matchmaking
  match_id = m_id
  console.log(socket_log + "Matchmaking active")
  startQueuePhase();
})

socket.on("initiate-match", (data) => { // called if a match was found
  match_id = data.m_id;
  console.log("me:" + data.player, "opponent: " + data.opponent)
  opponent_status.value = data.opponent;
  player_status.value = data.player;
  console.log(socket_log + "Found match");
  startSelectionPhase(); // Move to selection game phase
})

socket.on("choose-timeout", () => { // called if choosing timer runns out
  // request the chosen symbol for this round
  getLastChoice();
})

socket.on("combat-round", (data) => { // called if both symbols are collected by server and combat was calculated by server
  // data contains the coosen symbol of player and opponent, and damage dealt
  console.log(socket_log + "Combat results arrived from server.")
  my_health.value = data.myLife;
  my_symbol.value = data.mySymbol;
  opp_health.value = data.oppLife;
  opp_symbol.value = data.oppSymbol;

  startResultPhase(); // Move to result game phase
})

socket.on("game-end", (data)=>{
  console.log(socket_log+"Game has ended.")
  if (data === "stalemate") { // Tie
    startDelayedEndPhase("stalemate!", "It was a close match, but both of you won!");
  } else if (data === socket.id) { // Player has won
    startDelayedEndPhase("Victory!", 
    "You have assert your dominance and won! The defeated cat was send home, and wont recover from this shattering defeat.");
  } else { // Opponent has won
    startDelayedEndPhase("Drama!", 
    "You were cheated out of your victory, what a fraud! In all of your nine lifes you never encountered such a presumptuous imposter.");
  }
})

socket.on("game-crashed", (data)=>{
  startEndPhase("game-crashed", data);
})

</script>

<template>
  <div class="fullscreen" v-if="game_phase == GamePhase.BE_ADDED || game_phase == GamePhase.WAIT_QUEUE">
    <LoadingScreenComp @cancel-matchmaking="cancelMatchmaking" :inQueue="game_phase == GamePhase.WAIT_QUEUE" />
  </div>
  <div class="top-and-bottom fullscreen" v-if="game_phase == GamePhase.SELECTION || game_phase == GamePhase.RESULT">
    <div class="player-row">
      <PlayerCard :name="opponent_name" :wins="opponent_wins" :items="opponent_items" :health="opp_health" class="enemy"
        :topbar="true" />
    </div>
    <SymbolSelector @confirm-symbol="confirmSymbolChoice" @confirm-last="getLastChoice"
      v-if="game_phase == GamePhase.SELECTION" />
    <CombatResult class="fullscreen" v-if="game_phase == GamePhase.RESULT" :player_name="player_name"
      :opponent_name="opponent_name" :player_symbol="my_symbol" :opponent_symbol="opp_symbol" />
    <div class="player-row right">
      <PlayerCard :name="player_name" :wins="player_wins" :items="player_items" :health="my_health" class="player"
        :topbar="false" />
    </div>
  </div>
  <div v-if="game_phase == GamePhase.END">
    <EndScreenComp :title="endScreenTitle" :message="endScreenMessage"/>
  </div>
</template>

<style lang="scss">
@import "../../css/main.scss";


.player-row {
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