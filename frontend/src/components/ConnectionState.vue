<script setup lang="ts">
import { watchEffect } from 'vue';
import { io } from 'socket.io-client';

const serverURL = "http://localhost:3000";
const socket = io(serverURL);

defineProps<{ msg: string }>()

watchEffect(() => {
  socket.on("connect", () => {
    console.log(socket);

    socket.emit("gn", {name: "steph"});

    socket.on("gm", (arg) => {
      console.log(arg);
    })
  });

})
</script>

<template>
  <p>Message: {{ msg }}</p>
  
</template>

<style>
</style>
