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
        <button id="alert-btn" @click="alertStore.clear()" class="close">
          x
        </button>
       <p class="alert-danger" v-if="alert.type == 'alert-danger'">Danger! {{  alert.message }} :(</p> 
       <p class="alert-success" v-else>Wowie! {{ alert.message }} :)</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

@import '../css/_config.scss';

.alert-container{
  position: absolute;
  margin-top: 2vh;
  margin-left: 2vw;
  text-align: center;
  z-index: 10000;
}

.alert, .alert-dismissable{
  display: flex; 
  flex-direction: row;
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
  font-family: $main-font;
  font-size: 2.8vh;
  margin-left: auto;
  background-color: $backshadow;
  border: none;
  color: $alert-color;
  border-radius: 5px;
  height: 3vh;
  aspect-ratio: 1/1;
}

.alert-success{
  max-width: fit-content;
  padding: 6px;
  margin: 0;
  background-color: $success-color;
  color: $bright-font-color;
  border-radius: 10px;
  font-family: $main-font;
  font-size: 3vh;
  white-space: nowrap;
}

 #alert-btn{
  all: unset;
  text-align: center;
  margin: 6px;
  font-family: $main-font;
  font-size: 2.8vh;
  margin-left: auto;
  background-color: $secondary-color;
  border: none;
  color: $bright-font-color;
  border-radius: 5px;
  height: 3vh;
  aspect-ratio: 1/1;
 }

 #alert-btn:hover{
  background-color: $backshadow;
  color: $secondary-color;
 }

.alert-danger{
  max-width: fit-content;
  padding: 6px;
  margin: 0;
  background-color: $alert-color;
  color: $bright-font-color;
  border-radius: 10px;
  font-family: $main-font;
  font-size: 3vh;
  white-space: nowrap;
}
</style>