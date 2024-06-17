<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <div v-if="user">
        <div class="flex-row">
            <HomeAccount></HomeAccount>
            <Card title="Leaderboard" class="Homecard">
                <p><router-link :to="`/edit/${user.id}`">Manage Account and Items</router-link></p>
                <button @click="authStore.logout()" class="btn btn-link">Logout</button>
        </Card>
        </div>
    </div>
</template>

<style>
.flex-row {
    display: flex;
    flex-direction: row;
}
    .Homecard {
        margin: 5vh;
    }
</style>