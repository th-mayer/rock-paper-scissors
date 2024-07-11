<script setup lang="ts">
import { Ref, computed, onMounted, ref, watch } from "vue";
import ItemBox from "./ItemBox.vue";
import { Item } from "../types/socket-connection-types"

const props = defineProps<{
    name: string,
    wins: number,
    topbar: boolean,
    health: number,
    items: Array<Item>
}>();

watch(() => props.health, () => {
    setTimeout(updateBar, 2000);
});

const hb: Ref<HTMLElement | undefined> = ref();
const hbred: Ref<HTMLElement | undefined> = ref();
const hbblue: Ref<HTMLElement | undefined> = ref();

const maxHealth = 100;

const items = computed(() => {
    if (props.items) return props.items;
    else {
        let placeholder: Item = { kind: 99, modifier: 1 };
        return [placeholder, placeholder, placeholder];
    }
})

function updateBar() {
    const targetWidth = props.health * (100 / maxHealth) + "%";

    hbred.value!.style.width = targetWidth;
    hbblue.value!.style.width = targetWidth;
    hb.value!.style.width = targetWidth;
}

onMounted(() => {
    updateBar();
});

const alignmentClass = computed(() => {
    if (props.topbar) return "alignTop";
    else return "alignBottom";
});

const alignmentItemTooltip = computed(() => {
    return !props.topbar;
});
</script>

<template>
    <div class="card-rect-player-mobile flex-col" :class="alignmentClass">
        <ItemBox v-if="!props.topbar" :tooltipUp="alignmentItemTooltip" :item1="items[0]" :item2="items[1]"
            :item3="items[2]" style="margin-right: 3vw;" />
        <div class="flex-col">
            <div class="name-and-wins flex-row no-align">
                <h2>{{ name }}</h2>
                <p>{{ wins }} wins</p>
            </div>
            <div class="itembox-mobile">
                <ItemBox v-if="props.topbar" :tooltipUp="alignmentItemTooltip" :item1="items[0]" :item2="items[1]"
                    :item3="items[2]" style="margin-left: 3vw;" />
            </div>
        </div>

        <div class="health-box-mobile">
            <div ref="hbred" class="health-bar-red-mobile"></div>
            <div ref="hbblue" class="health-bar-blue-mobile"></div>
            <div ref="hb" class="health-bar-mobile"></div>
        </div>
    </div>
</template>

<style lang="scss">
@import '../css/main.scss';


.card-rect-player-mobile {
    position: relative;
    height: 100%;
    width: 100vw;
    margin: 0;
    background-color: $base-color;
    padding: 20px;
    border-radius: 20px;
    z-index: 1002;
    font-family: $main-font;
    letter-spacing: 1px;
    font-size: 5vh;
    font-style: normal;
    box-shadow: 7px 7px $backshadow;
    justify-content: space-between;
    overflow: hidden;
    padding-bottom: 4vh;
}

.card-rect-player-mobile.alignTop {
    align-self: unset;
    align-self: end;
}

.name-and-wins {
    display: flex;
    position: relative;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
}

.name-and-wins p {
    font-size: 4vh;
}

.name-and-wins h2 {
    font-size: 4.5vh;
    color: $secondary-color;
    margin-right: 3vw;
}


.card-rect-player-mobile.alignBottom {
    align-self: self-start;
}

.health-box-mobile {
    background-color: $backshadow;
    height: 4vh;
    min-height: max(4vh, 20px);
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    border-radius: 200px;
}

.health-bar-mobile {
    background-color: $secondary-color;
    height: 100%;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 200px;
    transition: width 1.5s ease;
    transition-delay: 0.1s;
}

.health-bar-red-mobile {
    background-color: $alert-color;
    height: 100%;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 2s ease;
    transition-delay: 0.3s;
    border-radius: 200px;
}

.health-bar-blue-mobile {
    background-color: $highlight-color;
    height: 100%;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 1s ease;
    border-radius: 200px;
}

.itembox-mobile img {
    width: 10vw;
    height: auto;
    border-radius: 5px;
    border-width: 4px;
}

.name-and-wins.flex-row {
    justify-content: left;
}

@media (max-width: 768px) {}
</style>