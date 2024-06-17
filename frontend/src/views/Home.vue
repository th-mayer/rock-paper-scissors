<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth.store';
import HomeAccount from '../components/HomeAccount.vue';
import Card from '../components/Card.vue';

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