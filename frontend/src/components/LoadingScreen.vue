<script setup lang="ts">
import Card from './Card.vue';
const emit = defineEmits(['cancel-matchmaking'])


const props = defineProps({
    inQueue: Boolean,
});

function cancelMatchmaking() {
    if (props.inQueue) emit("cancel-matchmaking");
}

</script>

<template>
    <Card title="in queue" class="loadingScreen">
        <div class="loadingDots">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <p v-if="props.inQueue">Finding your perfect match...</p>
        <p v-else>Wait to be added to matchmaking...</p>

        <div class="btn-container">
            <router-link to="/home">
                <button class="btn router-link-in-button discard" @click="cancelMatchmaking">
                    cancel matchmaking
                </button>
            </router-link>
        </div>
    </Card>
</template>

<style lang="scss">
@import '@/css/main.scss';

.loadingScreen {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

@keyframes scaling {

    0%,
    100% {
        transform: scale(0.4);
        background-color: $alert-color;
    }

    40% {
        transform: scale(1);
        background-color: $highlight-color;
    }

    50% {
        transform: scale(1);
        background-color: $secondary-color;
        ;
    }
}

.loadingDots {
    display: flex;
    justify-content: center;
    padding: 10px;
}

.loadingDots div {
    height: 5vh;
    aspect-ratio: 1/1;
    border-radius: 50%;
    transform: scale(0);
    background-color: $base-color;
    animation: scaling 2.5s ease-in-out infinite;
    display: inline-block;
    margin: .5rem;
}

.loadingDots div:nth-child(0) {
    animation-delay: 0s;
}

.loadingDots div:nth-child(1) {
    animation-delay: 0.2s;
}

.loadingDots div:nth-child(2) {
    animation-delay: 0.4s;
}

.loadingDots div:nth-child(3) {
    animation-delay: 0.6s;
}

.loadingDots div:nth-child(4) {
    animation-delay: 0.8s;
}

.loadingDots div:nth-child(5) {
    animation-delay: 1s;
}

</style>