<script setup lang="ts">
import ItemComp from './Item.vue';
import { Item } from "../types/socket-connection-types"

const props = defineProps<{
    tooltipUp: boolean,
    item1: Item,
    item2: Item,
    item3: Item,
}>();

</script>

<template>
    <div class="item-container">
        <ItemComp :item-kind="item1?.kind" :multiplier="item1?.modifier" :tooltipUp="props.tooltipUp"/>
        <ItemComp :item-kind="item2?.kind" :multiplier="item2?.modifier" :tooltipUp="props.tooltipUp"/>
        <ItemComp :item-kind="item3?.kind" :multiplier="item3?.modifier" :tooltipUp="props.tooltipUp"/>
    </div>
</template>

<style lang="scss">
@import '../css/main.scss';

.item-container {
    height: 85%;
    display: flex;
    margin: 0;
}
</style>