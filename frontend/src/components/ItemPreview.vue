<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth.store';
import Card from './Card.vue';
import ItemBox from './ItemBox.vue';
import { onMounted, ref } from 'vue';
import { useUserStore } from '../stores/users.store';
import { computed } from '@vue/reactivity';

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);
const userStore = useUserStore();
const { user } = storeToRefs(userStore);


const userExistingItems = computed(() => {
    if (user.value) {
        return user.value.items;
    }
    else {
        return
    }
});

const exItem1 = computed(() => {
    if (user.value) {
        return userExistingItems.value[0];
    }
    else {
        return
    }
});
const exItem2 = computed(() => {
    if (user.value) {
        return userExistingItems.value[1];
    }
    else {
        return
    }
});
const exItem3 = computed(() => {
    if (user.value) {
        return userExistingItems.value[2];
    }
    else {
        return
    }
});

onMounted(async () => {
    await userStore.getById(authUser.value.id);
});
</script>

<template>
    <Card title="Item manager" class="Homecard" id="itembox">

        <ItemBox :item1="exItem1" :item2="exItem2" :item3="exItem3" :tooltipUp="true" />

        <div class="flex-row">
            <router-link :to="`${authUser.id}/itemEdit`">
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