<script setup lang="ts">
import Card from './Card.vue';
import { useAuthStore } from '../stores/auth.store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <Card title="your Account" class="Homecard">
        <h1>Hello, {{ user.username }}!</h1>
        <p>It is the perfect time for a thrilling match today!</p>

        <div class="flex-row margin-top-10">
            <router-link :to="`/edit/${user.id}`">
                <button class="router-link-in-button acc-btn">edit Account</button>
            </router-link>

            
            <button class="acc-btn router-link-in-button discard" @click="authStore.logout()">Logout</button>
        </div>
    </Card>
</template>

<style lang="scss">
@import '@/css/main.scss';


.acc-btn{
    margin: 0;
}

.flex-row{
    justify-content: space-evenly;
}
</style>