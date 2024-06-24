<script setup lang="ts">
import Item from './Item.vue';


</script>

<template>
    <div class="item-container">
        <Item :item-kind="1" :multiplier="2.2"/>
        <Item :item-kind="3" :multiplier="88.22"/>
        <Item :item-kind="5" :multiplier="0.2" />
    </div>
</template>

<style lang="scss">
@import '../css/main.scss';

.item-container {
    height: 100%;
    display: flex;
    margin: 0;
}
</style>