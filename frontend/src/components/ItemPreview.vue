<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth.store';
import Card from './Card.vue';
import ItemBox from './ItemBox.vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const userExistingItems = user.value.items;
console.log(userExistingItems);
const exItem1 = userExistingItems[0];
const exItem2 = userExistingItems[1];
const exItem3 = userExistingItems[2];

</script>

<template>
    <Card title="Item manager" class="Homecard" id="itembox">

        <ItemBox :item1="exItem1" :item2="exItem2" :item3="exItem3" :tooltipUp="true" />

        <div class="flex-row" v-if="!(user.loading || user.error)">
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

#itembox {
    height: fit-content;
}

#itembox .item-container img {
    height: 20vh;
}
</style>