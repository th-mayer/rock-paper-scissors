<script setup lang="ts">
import Card from "../../components/Card.vue";
import Item from "../../components/Item.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../../stores/users.store";
import { storeToRefs } from "pinia";
import { useAlertStore } from "../../stores/alert.store";
import { Form, Field } from "vee-validate";
import { generateRandomItem } from "../../helpers/randomItemGenerator";
import { computed, Ref, ref } from "vue";
import { number, object } from "yup";

const route = useRoute();
const id = route.params.id;
const userStore = useUserStore();
let { user } = storeToRefs(userStore);
userStore.getById(id);
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
})

const ownItem2Highlight = computed(() => {
    return selectOwnArray.value[1];
})

const ownItem3Highlight = computed(() => {
    return selectOwnArray.value[2];
})

const genItem1Highlight = computed(() => {
    return selectGenArray.value[0];
})

const genItem2Highlight = computed(() => {
    return selectGenArray.value[1];
})

const genItem3Highlight = computed(() => {
    return selectGenArray.value[2];
})

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
            <div class="generateItems">
                <button class="btn" @click="generateItems">Generate Items</button>
            </div>
            <div v-if="exItem1">
                <h2>your equipped items</h2>
                <Form @submit="onSubmit" :validation-schema="schema">
                    <!-- <ItemBox :item1="exItem1" :item2="exItem2" :item3="exItem3" :tooltip-up="true" /> -->
                    <!-- <Field name="exItem" type="radio" :value="exItem1.id" :unchecked-value="false" /> -->
                    <div class="item-container">
                        <Item :itemKind="exItem1.kind" :multiplier="exItem1.modifier" :tooltipUp="true"
                            :isHighlighted="ownItem1Highlight" @click="chooseOwnItem1" />
                        <Field name="exItem" type="radio" :value="exItem1.id" :unchecked-value="ownItem1Highlight"
                            :tooltipUp="false" style="visibility:hidden;" />
                        <Item :itemKind="exItem2.kind" :multiplier="exItem2.modifier" :tooltipUp="true"
                            :isHighlighted="ownItem2Highlight" @click="chooseOwnItem2" />
                        <Field name="exItem" type="radio" :value="exItem2.id" :unchecked-value="ownItem2Highlight"
                            :tooltipUp="false" style="visibility:hidden;" />
                        <Item :itemKind="exItem3.kind" :multiplier="exItem3.modifier" :tooltipUp="true"
                            :isHighlighted="ownItem3Highlight" @click="chooseOwnItem3" />
                        <Field name="exItem" type="radio" :value="exItem3.id" :unchecked-value="ownItem3Highlight"
                            :tooltipUp="false" style="visibility:hidden;" />
                    </div>
                    <h2>new items</h2>
                    <div class="item-container">
                        <!-- <ItemBox :item1="item1" :item2="item2" :item3="item3" :tooltip-up="true" /> -->
                        <Item :itemKind="item1.kind" :multiplier="item1.modifier" :tooltipUp="false"
                            :isHighlighted="genItem1Highlight" @click="chooseGenItem1" />
                        <Field name="item" type="radio" :value="item1" :unchecked-value="genItem1Highlight"
                            style="visibility:hidden;" />
                        <Item :itemKind="item2.kind" :multiplier="item2.modifier" :tooltipUp="false"
                            :isHighlighted="genItem2Highlight" @click="chooseGenItem2" />
                        <Field name="item" type="radio" :value="item2" :unchecked-value="genItem2Highlight"
                            style="visibility:hidden;" />
                        <Item :itemKind="item3.kind" :multiplier="item3.modifier" :tooltipUp="false"
                            :isHighlighted="genItem3Highlight" @click="chooseGenItem3" />
                        <Field name="item" type="radio" :value="item3" :unchecked-value="genItem3Highlight"
                            style="visibility:hidden;" />
                    </div>
                    <div class="flex-row itemEditBtns">
                        <div class="btn-container">
                            <button class="btn ">
                                save
                            </button>
                        </div>

                        <div class="btn-container">
                            <router-link to="/home">
                                <button class="btn router-link-in-button discard">
                                    Discard
                                </button>
                            </router-link>
                        </div>
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

.generateItems {
    display: flex;
    justify-content: center;
    align-items: center;

}

.item-manager .item-container {
    height: 20vh;
}

.item-manager {
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-manager h2 {
    margin-top: 3vh;
}

.item-manager p {
    padding: 1vh;
}

.itemEditBtns {
    margin-top: 2vh;
}
</style>