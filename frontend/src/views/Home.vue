<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
console.log({ user });
</script>

<template>
    <h1>Hello {{ user.username }} !</h1>
    <p><router-link to="/edituser">Manage Account and Items</router-link></p>
    <button @click="authStore.logout()" class="btn btn-link">Logout</button>
</template>