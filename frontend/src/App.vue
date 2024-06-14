<script setup lang="ts">
import SocketEvents from './components/SocketEvents.vue';
import Alert from './components/Alert.vue';
import Background from './components/Background.vue';

</script>

<template>
  <div class="app-container">
    <Background class="ultimate-bg"/>
    <Alert />
    <SocketEvents msg="Connection Test"/>
    <div class="container pt-4 pb-4">
        <router-view />
    </div>
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
