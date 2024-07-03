<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth.store";
import HomeAccount from "../components/HomeAccount.vue";
import Leaderboard from "../components/Leaderboard.vue";
import ItemPreview from "../components/ItemPreview.vue";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
  <div v-if="user">
    <div class="home-grid-container">
      <div class="homeItem">
        <HomeAccount></HomeAccount>
      </div>
      <div class="leaderboardItem">
        <Leaderboard></Leaderboard>
      </div>
      <div class="previewItem">
        <ItemPreview></ItemPreview>
      </div>
      <div class="button-container buttonItem">
        <router-link to="/game">
          <button id="match-button" class="router-link-in-button">
            Find Match
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../css/main.scss";

.home-grid-container {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  align-items: center;
}

.Homecard {
  margin-top: 5vh;
  margin-left: 5vh;
}

#match-button {
  background-color: $highlight-color;
  height: 12vh;
  width: fit-content;
  margin-bottom: 3vh;
  font-size: 6vh;
  border-radius: 5vh;
  align-self: center;
}

#match-button:hover {
  color: $highlight-color;
  background-color: $backshadow;
  box-shadow: 7px 7px $highlight-color;
}

.button-container {
  height: auto;
  display: flex;
  justify-content: center;
}
</style>