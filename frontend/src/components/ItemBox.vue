<script setup lang="ts">
import Item from './Item.vue';

const props = defineProps<{
    tooltipUp: boolean,
    item1: { kind: number, multiplier: number },
    item2: { kind: number, multiplier: number },
    item3: { kind: number, multiplier: number },
}>();

</script>

<template>
    <div class="item-container">
        <Item :item-kind="item1?.kind" :multiplier="item1?.multiplier" :tooltipUp="props.tooltipUp"/>
        <Item :item-kind="item2?.kind" :multiplier="item2?.multiplier" :tooltipUp="props.tooltipUp"/>
        <Item :item-kind="item3?.kind" :multiplier="item3?.multiplier" :tooltipUp="props.tooltipUp"/>
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