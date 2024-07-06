<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth.store";
import Card from "./Card.vue";
import ItemBox from "./ItemBox.vue";
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "../stores/users.store";
import { Item } from "../types/socket-connection-types";

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const exItem1 = ref<Item | null>(null);
const exItem2 = ref<Item | null>(null);
const exItem3 = ref<Item | null>(null);

onBeforeMount(async () => {
    await userStore.getById(authUser.value.id);
    const userExistingItems = user.value.items;
    exItem1.value = userExistingItems[0];
    exItem2.value = userExistingItems[1];
    exItem3.value = userExistingItems[2];
});
</script>

<template>
  <Card title="Item manager" class="Homecard" id="itembox">
    <template v-if="!(user.loading || user.error)">
      <ItemBox :item1="exItem1" :item2="exItem2" :item3="exItem3" :tooltipUp="true" />
    </template>
    <template v-if="user.loading">
      <!-- TODO loading spinner -->
      <div>loading</div>
    </template>

    <div class="flex-row">
      <router-link :to="`${authUser.id}/itemEdit`">
        <button class="margin-top-10">Configure Items</button>
      </router-link>
    </div>
  </Card>
</template>

<style lang="scss">
@import "../css/main.scss";

#itembox {
  height: fit-content;
}

#itembox .item-container img {
  height: 20vh;
}
</style>
