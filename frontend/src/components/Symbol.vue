<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps({
    type: Number,
    isHighlighted: Boolean,
});

const highlightStyle = computed(() => {
    if (props.isHighlighted) return "symbol-container img-highlight";
    else return "symbol-container";
})

const pic = computed(() => {
    if (props.type == 0) return "../../public/assets/rock.png";
    else if (props.type == 1) return "../../public/assets/paper.png";
    else if (props.type == 2) return "../../public/assets/scissors.png";
    return;
})

</script>

<template>
    <div :class="highlightStyle">
        <img class="symbol-img" :src="pic" />
    </div>
</template>

<style lang="scss">
@import '../css/main.scss';

.symbol-container {
    height: 100%;
    display: flex;
    border-color: $backshadow;
}

.symbol-img {
    height: 10vw;
    margin-left: 1vh;
    margin-right: 1vh;
    border-color: $backshadow;
}

.symbol-img:hover {
    border-color: $highlight-color;
    cursor: pointer;
}

.highlighted {
    border-color: $backshadow;
    border: 2px solid transparent;
    transition: border-color 0.3s;
}

.symbol-container.img-highlight>img {
    border-color: $secondary-color;
    border-style: 2px solid;
}

/* Tablet styles */
@media (max-width: 768px) {

}

/* Phone styles */
@media (max-width: 480px) {
    
}

</style>