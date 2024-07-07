<script setup lang="ts">
import Card from "../../components/Card.vue";
import Item from "../../components/Item.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../../stores/users.store";
import { storeToRefs } from "pinia";
import { useAlertStore } from "../../stores/alert.store";
import { Form, Field } from "vee-validate";
import { generateRandomItem } from "../../helpers/randomItemGenerator";
import { ref } from "vue";
import { number, object } from "yup";

const route = useRoute();
const id = route.params.id;
const userStore = useUserStore();
let { user } = storeToRefs(userStore);
userStore.getById(id);

const exItem1 = ref();
const exItem2 = ref();
const exItem3 = ref();
const item1 = ref();
const item2 = ref();
const item3 = ref();

function generateItems() {
    getUserExistingItems();
    item1.value = generateRandomItem();
    item2.value = generateRandomItem();
    item3.value = generateRandomItem();
}

function getUserExistingItems() {
    const userExistingItems = user.value.items;
    exItem1.value = userExistingItems[0];
    exItem2.value = userExistingItems[1];
    exItem3.value = userExistingItems[2];
}

async function onSubmit(values: any) {
    const alertStore = useAlertStore();
    try {
        await userStore.update(user.value.id, values);
        alertStore.success("Items updated");
        // update existing items view
        await userStore.getById(id);
        getUserExistingItems();
    } catch (error) {
        alertStore.error("could not save changes");
    }
}

const schema = object({
    exItem: number().required(),
    item: object({
        kind: number(),
        modifier: number()
    }).required(),
});

</script>

<template>
    <template v-if="!(user?.loading || user?.error) && user.itemCoin > 0">
        <Card title="item manager" class="Homecard item-manager">
            <div>
                <p>You don't have any item coins to redeem! Win a match to get an item coin!</p>
                <div class="btn-container">
                    <router-link to="/home">
                        <button class="btn router-link-in-button discard">
                            back to home
                        </button>
                    </router-link>
                </div>
            </div>
        </Card>
    </template>
    <template v-if="!(user?.loading || user?.error) && user.itemCoin < 1">
        <Card title="item manager" class="Homecard item-manager">
            <p>Click to generate new items to choose from!</p>
            <button class="btn" @click="generateItems">Generate Items</button>
            <div v-if="exItem1">
                <h2>your equipped items</h2>
                <Form @submit="onSubmit" :validation-schema="schema">
                    <!-- <ItemBox :item1="exItem1" :item2="exItem2" :item3="exItem3" :tooltip-up="true" /> -->
                    <!-- <Field name="exItem" type="radio" :value="exItem1.id" :unchecked-value="false" /> -->
                    <div class="item-container">
                        <Item :itemKind=exItem1.kind :multiplier="exItem1.modifier" :tooltipUp="false" />
                        <Field name="exItem" type="radio" :value="exItem1.id" :unchecked-value="false"
                            :tooltipUp="false" />
                        <Item :itemKind="exItem2.kind" :multiplier="exItem2.modifier" :tooltipUp="false" />
                        <Field name="exItem" type="radio" :value="exItem2.id" :unchecked-value="false"
                            :tooltipUp="false" />
                        <Item :itemKind="exItem3.kind" :multiplier="exItem3.modifier" :tooltipUp="false" />
                        <Field name="exItem" type="radio" :value="exItem3.id" :unchecked-value="false" />
                    </div>
                    <h2>new items</h2>
                    <div class="item-container">
                        <!-- <ItemBox :item1="item1" :item2="item2" :item3="item3" :tooltip-up="true" /> -->
                        <Item :itemKind="item1.kind" :multiplier="item1.modifier" :tooltipUp="false" />
                        <Field name="item" type="radio" :value="item1" :unchecked-value="false" />
                        <Item :itemKind="item2.kind" :multiplier="item2.modifier" :tooltipUp="false" />
                        <Field name="item" type="radio" :value="item2" :unchecked-value="false" />
                        <Item :itemKind="item3.kind" :multiplier="item3.modifier" :tooltipUp="false" />
                        <Field name="item" type="radio" :value="item3" :unchecked-value="false" />
                    </div>
                    <div class="btn-container">
                        <button class="btn">
                            save
                        </button>
                    </div>
                </Form>
            </div>
        </Card>
    </template>
    <template v-if="user.loading">
        <!-- TODO loading spinner -->
        <div>loading</div>
    </template>
</template>

<style lang="scss">
@import '../../css/main.scss';

.item-manager .item-container {
    height: 20vh;
}

.item-manager {
    height: 85vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-manager h2 {
    margin-top: 5vh;
}

.item-manager p {
    padding: 1vh;
}
</style>