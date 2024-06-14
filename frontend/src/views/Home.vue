<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store';
import { storeToRefs } from 'pinia';
import Card from '../components/Card.vue';
import HomeAccount from '../components/HomeAccount.vue'

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
console.log({ user });
</script>

<template>
    <div class="flex-row">
        <HomeAccount></HomeAccount>
        <Card title="Leaderboard" class="Homecard">
            <p></p>
            <p><router-link to="/edituser">Manage Account and Items</router-link></p>
            <button @click="authStore.logout()" class="btn btn-link">Logout</button>
        </Card>
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