<script setup lang="ts">
import Card from './Card.vue';
import { useAuthStore } from '../stores/auth.store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
console.log({ user });
</script>

<template>
    <Card title="your Account" class="Homecard">
        <h1>Hello, {{ user.username }}!</h1>
        <p>It is the perfect time for a thrilling match today!</p>

        <div class="flex-row">
            <router-link :to="`/edit/${user.id}`">
                <button class="router-link-in-button">Manage Account and Items</button>
            </router-link>
            <button @click="authStore.logout()">Logout</button>
        </div>
    </Card>
</template>

<style lang="scss">
    @import '@/css/main.scss';
</style>