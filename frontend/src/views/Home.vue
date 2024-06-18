<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth.store";
import HomeAccount from "../components/HomeAccount.vue";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
  <div v-if="user">
    <div class="flex-row">
      <HomeAccount></HomeAccount>
      <Leaderboard>
        <p>UserXY has XY wins - placeholder</p>
      </Leaderboard>
    </div>
    <button id="match-button" class="router-link-in-button">
      <router-link to="/game">Find Match</router-link>
    </button>
  </div>
</template>

<style lang="scss">
@import "../css/main.scss";
.flex-row {
  display: flex;
  flex-direction: row;
}
.Homecard {
  margin: 5vh;
}

#match-button {
  background-color: $highlight-color;
  height: 15vh;
  width: fit-content;
  
}

#match-button:hover{
    background-color: $backshadow;
    box-shadow: 7px 7px $highlight-color;
    
}

#match-button:hover > a{
    color: $highlight-color;
}

#match-button > a {
    font-size: 8vh;
}
</style>