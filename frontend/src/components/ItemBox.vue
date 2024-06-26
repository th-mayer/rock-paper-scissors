<script setup lang="ts">
import Item from './Item.vue';

const props = defineProps({
    tooltipUp: Boolean,
});

</script>

<template>
    <div class="item-container">
        <Item :item-kind="1" :multiplier="2.2" :tooltipUp="props.tooltipUp"/>
        <Item :item-kind="3" :multiplier="88.22" :tooltipUp="props.tooltipUp"/>
        <Item :item-kind="5" :multiplier="0.2" :tooltipUp="props.tooltipUp"/>
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