<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAlertStore } from "../stores/alert.store";

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>

<template>
  <div v-if="alert" class="container">
    <div class="m-3">
      <div class="alert alert-dismissable" :class="alert.type">
        <button @click="alertStore.clear()" class="btn btn-link close">
          x
        </button>
        {{ alert.message }} :(
      </div>
    </div>
  </div>
</template>

<style>
.alert, .alert-dismissable{
  max-width: fit-content;
  padding: 10px;
  margin: 0 auto;
  margin-top: 2vh;
  background-color: rgb(239, 39, 122);
  color: white;
  border-radius: 5px;
  font-family: tweety;
  font-size: 3vh;
}

.close{
  font-family: tweety;
  font-size: 2.5vh;
  margin-left: auto;
  background-color: white;
  border: none;
  color: rgb(239, 39, 122);
  border-radius: 2px;
  height: 3vh;
  aspect-ratio: 1/1;
}
</style>