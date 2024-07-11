<script setup lang="ts">
import Card from '../components/Card.vue';

const props = defineProps<{
    title: string,
    message: string
}>();

</script>

<template>
    <div class="gameEndScreen">
        <Card class="endCard" :title="props.title">
            <p>{{ props.message }}</p>
            <router-link to="/home">
                <button class="btn router-link-in-button discard">
                    send me back home
                </button>
            </router-link>
        </Card>
    </div>
</template>

<style lang="scss">
@import '../css/main.scss';

.gameEndScreen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.gameEndScreen>.endCard {
    width: 80vw;
}
</style>