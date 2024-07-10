<script setup lang="ts">
import Card from './Card.vue';
import { useAuthStore } from '../stores/auth.store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <Card title="your Account" class="Homecard account">
        <h2>Hello, {{ user.username }}!</h2>
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


.acc-btn {
    margin: 0;
}

.flex-row {
    justify-content: space-evenly;
}

/* Tablet styles */
@media (max-width: 768px) {
    .account{
        width: 90vw;
    }
}

/* Phone styles */
@media (max-width: 480px) {

}
</style>