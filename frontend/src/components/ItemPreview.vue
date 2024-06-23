<script setup lang="ts">
import Card from './Card.vue';
import Item from './Item.vue';
import ItemBox from './ItemBox.vue';
</script>

<template>
    <Card title="Item manager" class="Homecard">

        <ItemBox />

        <div class="flex-row">
            <router-link to="/itemEdit">
                <button class="margin-top-10">
                    Configure Items
                </button>
            </router-link>
        </div>
    </Card>
</template>

<style lang="scss">
@import '../css/main.scss';


</style>