<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAlertStore } from "../stores/alert.store";

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>

<template>
  <div v-if="alert" class="alert-container">
    <div>
      <div class="alert alert-dismissable" :class="alert.type">
        <button @click="alertStore.clear()" class="close">
          x
        </button>
        {{ alert.message }} :(
      </div>
    </div>
  </div>
</template>

<style lang="scss">

@import '../css/_config.scss';

.alert, .alert-dismissable{
  position: absolute;
  max-width: fit-content;
  padding: 10px;
  margin: 2vh 0 0 5vw;
  background-color: $alert-color;
  color: $bright-font-color;
  border-radius: 10px;
  font-family: $main-font;
  font-size: 3vh;
  white-space: nowrap;
}


.close{
  font-family: tweety;
  font-size: 2.8vh;
  margin-left: auto;
  background-color: $backshadow;
  border: none;
  color: $alert-color;
  border-radius: 5px;
  height: 3vh;
  aspect-ratio: 1/1;
}
</style>