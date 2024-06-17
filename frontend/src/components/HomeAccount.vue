<script setup lang="ts">
import Card from './Card.vue';
import { useAuthStore } from '../stores/auth.store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
console.log({ user });
</script>

<template>
    <Card title="Your Homepage" class="Homecard">
        <h1>Hello, {{user.username}}!</h1>
        <p>It is the perfect time for a thrilling match today!</p>
        <router-link :to="`/edit/${user.id}`">Manage Account and Items</router-link>
        <div class="flex-row">
            <button @click="authStore.logout()">Logout</button>
            <button @click="">Find Match</button>
        </div>
    </Card>
</template>

<style>

</style>