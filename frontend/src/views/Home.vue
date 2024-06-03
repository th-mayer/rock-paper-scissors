<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <div v-if="user">
        <h1>Hello {{ user.username }} !</h1>
        <p><router-link :to="`/edit/${user.id}`">Manage Account and Items</router-link></p>
        <button @click="authStore.logout()" class="btn btn-link">Logout</button>
    </div>
</template>