<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

const props = defineProps<{
    itemKind: number,
    multiplier: number,
    tooltipUp: boolean,
}>();

let onHover = ref(false);

const item = {
    names: ["Heavy Stone", "Sharp Paper", "Pointy Scissors", "Brittle Stone", "Soggy Paper", "Blunt Scissors", "Empty Slot"],
    symbols: ["Stone", "Paper", "Scissors"],
    pictures: ["../../public/assets/rockdmg.png", "../../public/assets/paperdmg.png", "../../public/assets/scissorsdmg.png", "../../public/assets/rockdefense.png", "../../public/assets/paperdefense.png", "../../public/assets/scissorsdefense.png", "../../public/assets/empty2.png"],
    descriptionDmg1: "Equipped person deals ",
    descriptionDmg2: " times the damage when winning with ",
    descriptionPro1: "Equipped person receives only ",
    descriptionPro2: " times the damage when loosing against ",
    descriptionEmpt: "Owner needs to win a match to be able to place an item here",
}

const itemName = computed(() => {
    if (props.itemKind >= 0 && props.itemKind <= 5) {
            
        return item.names[props.itemKind];
    }
    return item.names[6];
})

const itemSymbol = computed(() => {
    if (props.itemKind >= 0 && props.itemKind <= 2) {
            return item.symbols[props.itemKind];
    }
    else if (props.itemKind >= 3 && props.itemKind <= 5) {
            return item.symbols[props.itemKind - 3];
    }
    return "";
})

const itemPic = computed(() => {
    if (props.itemKind >= 0 && props.itemKind <= 5) {
        return item.pictures[props.itemKind];
    }
    return item.pictures[6];
})

const itemDescription = computed(() => {
    if (props.itemKind) {
        if (props.itemKind >= 0 && props.itemKind <= 2) {
            return [item.descriptionDmg1, item.descriptionDmg2];
        }
        if (props.itemKind >= 3 && props.itemKind <= 5) {
            return [item.descriptionPro1, item.descriptionPro2];
        }
    }
    return [item.descriptionEmpt, ""];
})

const itemModifier = computed(() => {
    if (props.itemKind) {
        if (props.itemKind >= 0 && props.itemKind <= 5) {
            return props.multiplier + "x";
        }
    }
    return "";
})

const tooltipPositionClass = computed(() => {
    if (props.tooltipUp) {
        return "tooltipUp";
    }
    return "tooltipDown";
})

function showTooltip() {
    onHover.value = true;
}

function hideTooltip() {
    onHover.value = false;
}
</script>

<template>
    <div class="itemDiv" @mouseenter="showTooltip" @mouseleave="hideTooltip">
        <img :src=itemPic>
    </div>
    <div class="itemDiscription" v-if="onHover" ref="tooltip" :class="tooltipPositionClass">
        <h2>{{ itemName }}</h2>
        <p>{{ itemDescription[0] }}<span class="highlighted">{{ itemModifier }}</span>{{ itemDescription[1] + itemSymbol
            + "." }}</p>
    </div>
</template>

<style lang="scss">
@import '@/css/main.scss';

div.itemDiv {
    height: 100%;
    margin: 5px;
}

div.itemDiscription {
    position: absolute;
    width: 30vw;
    background-color: $secondary-color;
    padding: 2vh;
    border-radius: 20px;
    border-color: $backshadow;
    border-width: 3px;
    border-style: solid;
    z-index: 1002;
}

div.itemDiv:hover>img {
    border-color: $highlight-color;
    transition: 0.1s ease-in;
}

div.itemDiscription>h2 {
    font-size: 5vh;
    margin: 0;
    margin-bottom: 0.5vh;
}

div.itemDiscription>p {
    font-size: 3vh;
}

div.itemDiscription.tooltipUp {
    bottom: 23vh;
}

div.itemDiscription.tooltipDown {
    top: 25vh;
}

img {
    height: 100%;
    border-radius: 20px;
    border-width: 5px;
    border-color: $bright-font-color;
    border-style: solid;
    background-color: $base-color;
}

.highlighted {
    color: $highlight-color;
}
</style>
