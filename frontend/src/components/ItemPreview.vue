<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth.store';
import Card from './Card.vue';
import ItemBox from './ItemBox.vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <Card title="Item manager" class="Homecard">

        <ItemBox />

        <div class="flex-row">
            <router-link :to="`${user.id}/itemEdit`">
                <button class="margin-top-10">
                    Configure Items
                </button>
            </router-link>
        </div>
    </Card>
</template>

<style lang="scss">
@import '../css/main.scss';


</style>