<script setup lang="ts">
import Alert from './components/Alert.vue';
import Background from './components/Background.vue';
import socket from './socket';

socket.on('connect', () => {
  console.log('[socket]: Connected to server');
});

socket.on('disconnect', () => {
  console.log('[socket]: Disconnected from server');
});
</script>

<template>
  <div class="app-container">
    <Background class="ultimate-bg"/>
    <Alert />
    <router-view />
  </div>
</template>

<style lang="scss">
@import '@/css/main.scss';

.app-container {
  width: 100%;
  height: 100%;
  position: fixed;
}
.ultimate-bg {
  position: fixed;
}
</style>
