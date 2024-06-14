<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store';
import { storeToRefs } from 'pinia';
import Card from '../components/Card.vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
console.log({ user });
</script>

<template>
    <div class="flex-row">
        <Card title="Your Homepage" class="Homecard">
            <h1>"Hello {{ user.username }} !"</h1>
            <p><router-link to="/edituser">Manage Account and Items</router-link></p>
            <button @click="authStore.logout()" class="btn btn-link">Logout</button>
        </Card>
        <Card title="Your Homepage" class="Homecard">
            <h1>"Hello {{ user.username }} !"</h1>
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