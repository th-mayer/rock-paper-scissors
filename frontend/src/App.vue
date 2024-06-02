<script setup lang="ts">
import SocketEvents from './components/SocketEvents.vue';
import Alert from './components/Alert.vue';
</script>

<template>
  <div class="app-container">
    <Alert />
    <SocketEvents msg="Connection Test"/>
    <div class="container pt-4 pb-4">
        <router-view />
    </div>
  </div>
</template>

<style scoped>
@import '@/css/main.scss';
</style>
