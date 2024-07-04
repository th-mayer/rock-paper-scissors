<script setup lang="ts">
import Card from './Card.vue';
import { useAuthStore } from '../stores/auth.store';
import { storeToRefs } from 'pinia';
import LeaderboardStats from './LeaderboardStats.vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
console.log({ user });
</script>

<template>
    <Card title="Leaderboard" class="Homecard">
        <h1>top 5 players</h1>
        <LeaderboardStats name="marco" wins="123" />
        <LeaderboardStats name="marco" wins="123" />
        <LeaderboardStats name="marco" wins="123" />
        <LeaderboardStats name="marco" wins="123" />
        <LeaderboardStats name="marco" wins="123" />
    </Card>
</template>

<style></style>