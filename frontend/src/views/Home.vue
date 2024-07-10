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
  <div v-if="user" class="fullscreen">
    <div class="home-grid-container">
      <div class="home-container homeItem">
        <HomeAccount></HomeAccount>
      </div>
      <div class="leaderboard-container leaderboardItem">
        <Leaderboard></Leaderboard>
      </div>
      <div class="preview-container previewItem">
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
  width: 100vw;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  align-items: center;
  column-gap: 15vh;
}

.Homecard {
  margin-top: 5vh;
}

#match-button {
  background-color: $highlight-color;
  height: 12vh;
  width: fit-content;
  margin-bottom: 3vh;
  font-size: 6vh;
  border-radius: 5vh;
  align-self: center;
  position: relative;
}

#match-button:hover {
  color: $highlight-color;
  background-color: $backshadow;
  box-shadow: 7px 7px $highlight-color;
}

.button-container,
.preview-container,
.leaderboard-container,
.home-container {
  height: auto;
  display: flex;
  justify-content: center;
}

@media (max-width: 1100px) {
  .home-grid-container {
    grid-template-columns: auto;
    row-gap: 5vh;
    padding-bottom: 12vh;
  }

  .home-grid-container h2{
    font-size: 8vw;
  }

  .button-container {
    width: 100vw;
    position: fixed;
    display: flex;
    justify-content: center;
    bottom: 0;
  }

  #match-button {
    font-size: 4vw;
    height: 8vh;
    padding: 4vw;
    position: relative;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    margin: 0;
    margin-bottom: 5vh;
  }

  .button-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: -10px;
    right: -10px;
    bottom: 0;
    background: linear-gradient(to top, rgba(2, 1, 55, 0.8), rgba(241, 24, 51, 0));
    z-index: -1;
  }
}


/* Tablet styles */
@media (max-width: 768px) {
  .home-grid-container {
    grid-template-columns: auto;
    row-gap: 5vh;
    padding-bottom: 12vh;
  }

  .home-grid-container h2{
    font-size: 8vw;
  }

  .button-container {
    width: 100vw;
    position: fixed;
    display: flex;
    justify-content: center;
    bottom: 0;
  }

  #match-button {
    font-size: 5vw;
    height: 10vh;
    padding: 4vw;
    position: relative;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    margin: 0;
    margin-bottom: 5vh;
  }

  .button-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: -10px;
    right: -10px;
    bottom: 0;
    background: linear-gradient(to top, rgba(2, 1, 55, 0.8), rgba(241, 24, 51, 0));
    z-index: -1;
  }
}

/* Phone styles */
@media (max-width: 480px) {
  .home-grid-container {
    grid-template-columns: auto;
    row-gap: 5vh;
    padding-bottom: 12vh;
  }

  #match-button {
    font-size: 4vh;
    height: 10vh;
    padding: 2rem;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    margin: 0;
  }

  .button-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: -10px;
    right: -10px;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
    z-index: -1;
    border-radius: 5vh;
  }
}
</style>