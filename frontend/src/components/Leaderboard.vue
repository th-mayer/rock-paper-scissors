<script setup lang="ts">
import Card from './Card.vue';
import { useAuthStore } from '../stores/auth.store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
console.log({ user });
</script>

<template>
    <Card title="Leaderboard" class="leaderbaord">
        <div>
        </div>
    </Card>
</template>

<style></style>