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
    <div class="home-container">
      <div class="flex-row">
        <div class="flex-column">
          <HomeAccount></HomeAccount>
          <ItemPreview></ItemPreview>
        </div>
        <div class="flex-column">
          <Leaderboard></Leaderboard>
          <div class="button-container">
            <router-link to="/game">
              <button id="match-button" class="router-link-in-button">
                Find Match
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../css/main.scss";

.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.flex-bottom-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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
  align-items: end;
}

.home-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between
}

.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>