<script setup lang="ts">
import Card from "../../components/Card.vue";
import Item from "../../components/Item.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../../stores/users.store";
import { storeToRefs } from "pinia";
import { useAlertStore } from "../../stores/alert.store";
import { computed, onBeforeMount, onMounted, Ref, ref } from "vue";
import LoadingScreen from "../../components/LoadingScreen.vue";

const route = useRoute();
const id = route.params.id;
const userStore = useUserStore();
let { user } = storeToRefs(userStore);
let { genItemsUser } = storeToRefs(userStore);

const selectOwnArray: Ref<boolean[]> = ref([false, false, false]);
const selectGenArray: Ref<boolean[]> = ref([false, false, false]);

const exItem1 = ref();
const exItem2 = ref();
const exItem3 = ref();
const item1 = ref();
const item2 = ref();
const item3 = ref();

const ownItem1Highlight = computed(() => {
    if (selectOwnArray.value[0]) return true;
    else return false;
});

const ownItem2Highlight = computed(() => {
    return selectOwnArray.value[1];
});

const ownItem3Highlight = computed(() => {
    return selectOwnArray.value[2];
});

const genItem1Highlight = computed(() => {
    return selectGenArray.value[0];
});

const genItem2Highlight = computed(() => {
    return selectGenArray.value[1];
});

const genItem3Highlight = computed(() => {
    return selectGenArray.value[2];
});

const checkedOwnItem = computed(() => {
    if (selectOwnArray.value[0]) return exItem1.value.id;
    else if (selectOwnArray.value[1]) return exItem2.value.id;
    else if (selectOwnArray.value[2]) return exItem3.value.id;
    else return null;
});

const checkedGenItem = computed(() => {
    if (selectGenArray.value[0]) return item1.value.id;
    else if (selectGenArray.value[1]) return item2.value.id;
    else if (selectGenArray.value[2]) return item3.value.id;
    else return null;
});

function chooseOwnItem1() {
    selectOwnArray.value[0] = !selectOwnArray.value[0];
    selectOwnArray.value[1] = false;
    selectOwnArray.value[2] = false;
}
function chooseOwnItem2() {
    selectOwnArray.value[1] = !selectOwnArray.value[1];
    selectOwnArray.value[0] = false;
    selectOwnArray.value[2] = false;
}
function chooseOwnItem3() {
    selectOwnArray.value[2] = !selectOwnArray.value[2];
    selectOwnArray.value[1] = false;
    selectOwnArray.value[0] = false;
}
function chooseGenItem1() {
    selectGenArray.value[0] = !selectGenArray.value[0];
    selectGenArray.value[1] = false;
    selectGenArray.value[2] = false;
}
function chooseGenItem2() {
    selectGenArray.value[1] = !selectGenArray.value[1];
    selectGenArray.value[0] = false;
    selectGenArray.value[2] = false;
}
function chooseGenItem3() {
    selectGenArray.value[2] = !selectGenArray.value[2];
    selectGenArray.value[1] = false;
    selectGenArray.value[0] = false;
}
function getUserGeneratedItems() {
    const userGeneratedItems = genItemsUser.value.genItems;
    item1.value = userGeneratedItems[0];
    item2.value = userGeneratedItems[1];
    item3.value = userGeneratedItems[2];
}

function getUserExistingItems() {
    const userExistingItems = user.value.items;
    exItem1.value = userExistingItems[0];
    exItem2.value = userExistingItems[1];
    exItem3.value = userExistingItems[2];
}

async function onSubmit(event: Event) {
    event.preventDefault();
    const alertStore = useAlertStore();
    const formData = new FormData(event.target as HTMLFormElement);

    const values = {
        exItem: Number(formData.get("exItem")),
        genItem: Number(formData.get("genItem")),
    };
    console.log(values);

    try {
        await userStore.updateItems(user.value.id, values);
        alertStore.success("Items updated");
        await userStore.getById(id);
        getUserExistingItems();
        await userStore.generateItems(id);
        getUserGeneratedItems();
    } catch (error) {
        alertStore.error("Could not save changes");
    }
}

// onMounted(() => {
//     getUserExistingItems();
//     getUserGeneratedItems();
//     console.log("exitem");
//     console.log(exItem1.value);
//     console.log("item");
//     console.log(item1.value);
// })

onBeforeMount(async () => {
    await userStore.getById(id);
    getUserExistingItems();
    await userStore.generateItems(id);
    getUserGeneratedItems();
    console.log(user);
});
</script>

<template>
    <template v-if="!(user?.loading || user?.error) && user.itemCoin <= 0">
        <Card title="Item Manager" class="Homecard item-manager">
            <div>
                <p>
                    You don't have any item coins to redeem! Win a match to get an item
                    coin!
                </p>
                <h2>Current ItemCoins: {{ user.itemCoin }}</h2>
                <div class="btn-container">
                    <router-link to="/home">
                        <button class="btn router-link-in-button discard">
                            Back to Home
                        </button>
                    </router-link>
                </div>
            </div>
        </Card>
    </template>
    <template v-if="!(user?.loading || user?.error) && user.itemCoin >= 1">
        <Card title="Item Manager" class="Homecard item-manager">
            <div class="generateItems flex-col">
                <div class="generateItemDiv flex-row">
                    <h2>{{ user.itemCoin }}</h2>
                    <img class="itemcoin" src="../../../public/assets/ItemCoin.png" />
                </div>
            </div>
            <div v-if="exItem1 && item1">
                <h2>Your Equipped Items</h2>
                <form @submit="onSubmit">
                    <div class="item-container">
                        <Item :itemKind="exItem1.kind" :multiplier="exItem1.modifier" :tooltipUp="true"
                            :isHighlighted="ownItem1Highlight" @click="chooseOwnItem1" />
                        <Item :itemKind="exItem2.kind" :multiplier="exItem2.modifier" :tooltipUp="true"
                            :isHighlighted="ownItem2Highlight" @click="chooseOwnItem2" />
                        <Item :itemKind="exItem3.kind" :multiplier="exItem3.modifier" :tooltipUp="true"
                            :isHighlighted="ownItem3Highlight" @click="chooseOwnItem3" />
                        <input type="hidden" name="exItem" :value="checkedOwnItem" />
                    </div>
                    <h2>New Items</h2>
                    <div class="item-container">
                        <Item :itemKind="item1.kind" :multiplier="item1.modifier" :tooltipUp="false"
                            :isHighlighted="genItem1Highlight" @click="chooseGenItem1" />
                        <Item :itemKind="item2.kind" :multiplier="item2.modifier" :tooltipUp="false"
                            :isHighlighted="genItem2Highlight" @click="chooseGenItem2" />
                        <Item :itemKind="item3.kind" :multiplier="item3.modifier" :tooltipUp="false"
                            :isHighlighted="genItem3Highlight" @click="chooseGenItem3" />
                        <input type="hidden" name="genItem" :value="checkedGenItem" />
                    </div>
                    <div class="flex-row itemEditBtns">
                        <div class="btn-container">
                            <button class="btn">Save</button>
                        </div>

                        <div class="btn-container">
                            <router-link to="/home">
                                <button class="btn router-link-in-button discard">
                                    back to home
                                </button>
                            </router-link>
                        </div>
                    </div>
                </form>
            </div>
        </Card>
    </template>
    <template v-if="user.loading">
        <LoadingScreen />
    </template>
</template>

<style lang="scss">
@import "../../css/main.scss";

.item-manager .generateItemDiv h2 {
    font-size: 6vw;
}

.generateItems {
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-manager .item-container {
    height: 20vh;
}

.item-manager {
    height: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-manager h2 {
    margin-top: 3vh;
    font-size: 2.5vw;
}

.item-manager p {
    padding: 1vh;
}

.itemEditBtns {
    margin-top: 2vh;
}

.itemcoin {
    align-self: center;
    border: none;
    width: 60px;
    aspect-ratio: 1/1;
}

/* Tablet styles */
@media (max-width: 768px) {
    .item-manager {
        margin: 5vw;
        width: unset;
    }

    .item-manager .item-container {
        height: 12vh;
    }
}

/* Phone styles */
@media (max-width: 480px) {
    .item-manager {
        width: 100vw;
        justify-content: unset;
        margin: 1.5vw;
        padding: 0;
    }

    .item-manager img {
        margin: 0;
        padding: 0;
        width: 25vw;
        height: auto;
    }

    .item-manager .item-container {
        height: 12vh;
    }

    .item-manager h2 {
        font-size: 5vw;
    }
}
</style>
