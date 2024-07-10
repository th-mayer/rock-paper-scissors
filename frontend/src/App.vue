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
    <Background class="ultimate-bg" />
    <Alert />
    <router-view />
  </div>
</template>

<style lang="scss">
@import '@/css/main.scss';

.app-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: auto;
}

.ultimate-bg {
  position: fixed;
}

@media (max-width: 480px) {
  .app-container {
    width: 105vh;
  }
}
</style>
