<script setup lang="ts">
import SocketEvents from './components/SocketEvents.vue'
import Home from './views/Home.vue';
</script>

<template>
  <div class="app-container">
    <SocketEvents msg="Connection Test"/>
    <div class="container pt-4 pb-4">
      <Home />
      <!--
        <router-view />
      -->
    </div>
  </div>
</template>

<style scoped>
@import '@/css/main.scss';
</style>
