<script setup lang="ts">
import { computed } from 'vue';
import { boolean } from 'yup';


const props = defineProps({
    type: Number,
});

const pic = computed(() => {
    if (props.type == 0) return "../../public/assets/rock.png";
    else if (props.type == 1) return "../../public/assets/paper.png";
    else if (props.type == 2) return "../../public/assets/scissors.png";
    return;
})

</script>

<template>
    <div class="pos-absolute fullscreen">
    <div class="flex-row top-symbol">
        <img class="combat-symbol-img enemy" :src="pic" />
    </div>
    <div class="flex-row bottom-symbol">
        <img class="combat-symbol-img player" :src="pic" />
    </div>
</div>
</template>

<style lang="scss">
@import '../css/main.scss';

.combat-symbol-img {
    all: unset;
    height: 40vh;
}

.combat-symbol-img.player {
    transform: translateY(10vh) translateX(-16vw) rotate(-90deg) scale(0.4);
    opacity: 40%;
    transition: 2s;
}

.combat-symbol-img.enemy {
    transform: translateY(-10vh) translateX(16vw) rotate(90deg) scale(0.4);
    opacity: 40%;
    transition: 2s;
}

//needs to be replaced lateron
div:hover .combat-symbol-img.enemy{
    transform: translateY(16vh) translateX(16vw) rotate(160deg) scale(1);
    opacity: 100%;
}

div:hover .combat-symbol-img.player {
    transform: translateY(-16vh) translateX(-16vw) rotate(-20deg) scale(1);
    opacity: 100%;
}

.pos-absolute {
    position: absolute;
    z-index: 0;
}

.fullscreen{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.flex-row.top-symbol{
    justify-content: flex-start;
}

.flex-row.bottom-symbol {
    justify-content: flex-end;
}
</style>