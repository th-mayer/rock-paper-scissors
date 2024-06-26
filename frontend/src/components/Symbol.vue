<script setup lang="ts">
import { computed } from 'vue';


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
    <div class="symbol-container">
        <img class="symbol-img" :src="pic" />
    </div>
</template>

<style lang="scss">
@import '../css/main.scss';

.symbol-container {
    height: 100%;
    display: flex;
}

.symbol-img {
    height: 20vh;
    margin-left: 1vh;
    margin-right: 1vh;
}

.symbol-img:hover {
    border-color: $highlight-color;
    cursor: pointer;
}
</style>