<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth.store";
import Card from "./Card.vue";
import ItemBox from "./ItemBox.vue";
import { computed, onBeforeMount, ref } from "vue";
import { useUserStore } from "../stores/users.store";
import { Item } from "../types/socket-connection-types";

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const exItem1 = ref<Item | null>(null);
const exItem2 = ref<Item | null>(null);
const exItem3 = ref<Item | null>(null);

const item1 = computed(() => {
  if (exItem1) return exItem1.value;
  else return { kind: 99, modifier: 0 };
});

const item2 = computed(() => {
  if (exItem2) return exItem2.value;
  else return { kind: 99, modifier: 0 };
});

const item3 = computed(() => {
  if (exItem3) return exItem3.value;
  else return { kind: 99, modifier: 0 };
});

onBeforeMount(async () => {
  await userStore.getById(authUser.value.id);
  const userExistingItems = user.value.items;
  exItem1.value = userExistingItems[0];
  exItem2.value = userExistingItems[1];
  exItem3.value = userExistingItems[2];
});
</script>

<template>
  <Card title="manage items" class="Homecard" id="itembox">
    <template v-if="!(user.loading || user.error)">
      <ItemBox :item1="item1!" :item2="item2!" :item3="item3!" :tooltipUp="true" />
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

/* Tablet styles */
@media (max-width: 768px) {
#itembox .item-container img{
  width: 25vw;
  height: auto;
}
#itembox{
  margin: 5vw;
}
}

/* Phone styles */
@media (max-width: 480px) {
  #itembox{
    margin: 2vw;
  }
}
</style>
