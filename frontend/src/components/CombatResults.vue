<script setup lang="ts">
import Symbol from './Symbol.vue';
import Card from './Card.vue';
</script>

<template>
    <Card>
        <div class="combatResult">
            <Symbol :type="1" />
        </div>
    </Card>
</template>

<style lang="scss">
@import '@/css/main.scss';

.combatResult{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>