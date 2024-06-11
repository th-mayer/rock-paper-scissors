<script setup lang="ts">
import SocketEvents from './components/SocketEvents.vue';
import Alert from './components/Alert.vue';
import Background from './components/Background.vue';

</script>

<template>
  <div class="app-container">
    <Background/>
    <Alert />
    <SocketEvents msg="Connection Test"/>
    <div class="container pt-4 pb-4">
        <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/css/main.scss';
</style>
