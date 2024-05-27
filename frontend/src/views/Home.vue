<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store';
import { storeToRefs } from 'pinia';
import Login from './account/Login.vue';

const authStore = useAuthStore();
const user = storeToRefs(authStore);
</script>

<template>
  <div v-if="user">
    <h1>Hello {{ user }}</h1>
    <Login></Login>
    <!--
      <p><router-link to="/users">Manage Users</router-link></p>

    -->

  </div>
</template>