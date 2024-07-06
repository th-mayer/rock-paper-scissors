<script setup lang="ts">
import Card from "../../components/Card.vue";
import Item from "../../components/Item.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../../stores/users.store";
import { storeToRefs } from "pinia";
import { useAlertStore } from "../../stores/alert.store";
import { Form, Field } from "vee-validate";
import { generateRandomItem } from "../../helpers/randomItemGenerator";
import ItemBox from "../../components/ItemBox.vue";
import { ref } from "vue";
import { number, object } from "yup";

const route = useRoute();
const id = route.params.id;
const userStore = useUserStore();
let { user } = storeToRefs(userStore);
userStore.getById(id);

console.log({ user });

const exItem1 = ref();
const exItem2 = ref();
const exItem3 = ref();
const item1 = ref();
const item2 = ref();
const item3 = ref();

// defineEmits(["choose-item"]);

function generateItems() {
    const userExistingItems = user.value.items;
    console.log(userExistingItems);
    exItem1.value = userExistingItems[0];
    exItem2.value = userExistingItems[1];
    exItem3.value = userExistingItems[2];

    item1.value = generateRandomItem();
    item2.value = generateRandomItem();
    item3.value = generateRandomItem();
}

async function onSubmit(values: any) {
    const alertStore = useAlertStore();
    console.log(values);
    try {
        await userStore.update(user.value.id, values);
        alertStore.success("Items updated");
    } catch (error) {
        alertStore.error(error);
    }
}

// TODO actual validation
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
            <p>Click to generate new items to choose from!</p>
            <button class="btn" @click="generateItems">Generate Items</button>
            <div v-if="exItem1">
                <h2>your equipped items</h2>
                <Form @submit="onSubmit" :validation-schema="schema">
                    <!-- <ItemBox :item1="exItem1" :item2="exItem2" :item3="exItem3" :tooltip-up="true" /> -->
                    <!-- <Field name="exItem" type="radio" :value="exItem1.id" :unchecked-value="false" /> -->
                    <div class="item-container">
                        <Item :itemKind=exItem1.kind :multiplier="exItem1.modifier"/>
                        <Field name="exItem" type="radio" :value="exItem1.id" :unchecked-value="false" />
                        <Item :itemKind="exItem2.kind" :multiplier="exItem2.modifier" />
                        <Field name="exItem" type="radio" :value="exItem2.id" :unchecked-value="false" />
                        <Item :itemKind="exItem3.kind" :multiplier="exItem3.modifier" />
                        <Field name="exItem" type="radio" :value="exItem3.id" :unchecked-value="false" />
                    </div>
                    <h2>new items</h2>
                    <div class="item-container">
                        <!-- <ItemBox :item1="item1" :item2="item2" :item3="item3" :tooltip-up="true" /> -->
                        <Item :itemKind="item1.kind" :multiplier="item1.modifier" />
                        <Field name="item" type="radio" :value="item1" :unchecked-value="false" />
                        <Item :itemKind="item2.kind" :multiplier="item2.modifier" />
                        <Field name="item" type="radio" :value="item2" :unchecked-value="false" />
                        <Item :itemKind="item3.kind" :multiplier="item3.modifier" />
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
</template>

<style lang="scss">
@import '../../css/main.scss';

.item-manager .item-container {
    height: 20vh;
}

.item-manager h2 {
    margin-top: 5vh;
}
</style>