<script setup lang="ts">
    import Card from './Card.vue';
    import Item from './Item.vue';
</script>

<template>
    <Card title="Item manager" class="Homecard">
        <div class="flex-row">
            <Item :item-kind="1" :multiplier="2.2" />
            <Item :item-kind="3" :multiplier="88.22" />
            <Item :item-kind="5" :multiplier="0.2" />
        </div>
    </Card>
</template>