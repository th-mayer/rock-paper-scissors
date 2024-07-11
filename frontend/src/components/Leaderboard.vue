<script setup lang="ts">
import Card from './Card.vue';
import { storeToRefs } from 'pinia';
import LeaderboardStats from './LeaderboardStats.vue';
import { onBeforeMount, ref } from 'vue';
import { useUserStore } from '../stores/users.store';

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const leaderboard = ref();

onBeforeMount(async () => {
    await userStore.getLeaderboard();
    leaderboard.value = users.value.slice(0, 5);
    console.log(leaderboard.value);
});
</script>

<template>
    <Card title="Leaderboard" class="Homecard leaderboard">
        <h2>top 5 players</h2>
        <template v-if="users.loading">
            <!-- todo: loadin spinner -->
            <div>loading</div>
        </template>
        <template v-if="!(users.loading || users.error)">
            <LeaderboardStats v-for="user in leaderboard" :name="user.username" :wins="user.wins" />
        </template>
    </Card>
</template>

<style>
.leaderboard h2 {
    font-size: 4vw;
    width: 30vw;
    white-space: wrap;
}

/* shit in between styles */
@media (max-width: 1100px) {
    .leaderboard {
        width: unset;
        margin: 5vw;
    }
}

/* Tablet styles */
@media (max-width: 768px) {}

/* Phone styles */
@media (max-width: 480px) {}
</style>