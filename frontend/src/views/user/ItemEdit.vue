<script setup lang="ts">
import ChooseNewItem from "../../components/ChooseNewItem.vue";
import Card from "../../components/Card.vue";
import Item from "../../components/Item.vue";
import ItemPreview from "../../components/ItemPreview.vue";
import ItemBox from "../../components/ItemBox.vue";
import { Router } from "vue-router";

</script>

<template>
    <Card title="item manager" class="Homecard item-manager">
        <p>Click on one old and on one new Item to swap them!</p>
        <h2>equipped</h2>
        <ItemBox />
        <h2>Other items</h2>
        <ItemBox />
        <div class="btn-container">
            <button class="btn">
                save
            </button>
        </div>
    </Card>

    <!--     
    <template v-if="user?.loading">
        <div></div>
        <span></span>
    </template>
<template v-if="user?.error">
        <div>
            <div>Error loading user: {{ user.error }}</div>
        </div>
    </template>
-->
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