<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth.store';
import HomeAccount from '../components/HomeAccount.vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <div v-if="user">
        <div class="flex-row">
            <HomeAccount></HomeAccount>
            <Leaderboard>
                <p>UserXY has XY wins - placeholder</p>
            </Leaderboard>
        </div>
        <button class="router-link-in-button"><router-link to="/game">Find Match</router-link></button>
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