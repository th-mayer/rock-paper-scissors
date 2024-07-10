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
  setTimeout(updateBar,2000);
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
    <div class="card-rect-player" :class="alignmentClass">
        <ItemBox v-if="!props.topbar" :tooltipUp="alignmentItemTooltip" :item1="items[0]" :item2="items[1]"
            :item3="items[2]" style="margin-right: 3vw;" />
        <div class="name-and-hp">
            <div>
                <h2>{{ name }}</h2>
                <p>{{ wins }} wins</p>
            </div>
            <div>
                <div class="health-box">
                    <div ref="hbred" class="health-bar-red"></div>
                    <div ref="hbblue" class="health-bar-blue"></div>
                    <div ref="hb" class="health-bar"></div>
                </div>
            </div>
        </div>
        <ItemBox v-if="props.topbar" :tooltipUp="alignmentItemTooltip" :item1="items[0]" :item2="items[1]"
            :item3="items[2]" style="margin-left: 3vw;" />
    </div>
</template>

<style lang="scss">
@import '../css/main.scss';

.column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-rect-player {
    display: flex;
    flex-direction: row;
    position: relative;
    height: 85%;
    width: fit-content;
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
}

.name-and-hp {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    width: 30vw;
    white-space: nowrap;
    overflow-x: hidden;
}

.name-and-hp p {
    font-size: 3vh;
}

.name-and-hp h2 {
    font-size: 4.5vh;
    color: $secondary-color;
}

.card-rect-player.alignTop {
    align-self: self-start;
}

.card-rect-player.alignBottom {
    align-self: self-end;
}

.health-box {
    background-color: $backshadow;
    height: 4vh;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    border-radius: 200px;
}

.health-bar {
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

.health-bar-red {
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

.health-bar-blue {
    background-color: $highlight-color;
    height: 100%;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 1s ease;
    border-radius: 200px;
}
</style>