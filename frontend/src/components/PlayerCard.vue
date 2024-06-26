<script setup lang="ts">
import { Ref, computed, onMounted, ref } from "vue";
import ItemBox from "./ItemBox.vue";

const props = defineProps({
    name: String,
    wins: String,
    startHealth: Number,
    topbar: Boolean,
});

const hb: Ref<HTMLElement | undefined> = ref();
const hbred: Ref<HTMLElement | undefined> = ref();
const hbblue: Ref<HTMLElement | undefined> = ref();

const maxHealth = 100;
let health = maxHealth;

function updateBar() {
    const targetWidth = health * (100 / maxHealth) + "%";

    hbred.value!.style.width = targetWidth;
    hb.value!.style.width = targetWidth;
    hbblue.value!.style.width = targetWidth;

}

function damage() {
    health = Math.max(0, health - 30); // Ensure health does not go below 0
    updateBar();
}

function heal() {
    health = Math.min(100, health + 30); // Ensure health does not go below 0
    updateBar();
}

onMounted(() => {
    updateBar(); // Initialize the health bar on component mount
});

const alignmentClass = computed(() => {
    if (props.topbar) return "alignTop";
    else return "alignBottom";
});

const alignmentItemTooltip = computed(()=>{
    if (props.topbar) return false;
    else return true;
});
</script>

<template>
    <div class="card-rect" :class="alignmentClass">
        <ItemBox v-if="!props.topbar" :tooltipUp="alignmentItemTooltip" style="margin-right: 3vw;"/>
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
        <ItemBox v-if="props.topbar" :tooltipUp="alignmentItemTooltip" style="margin-left: 3vw;"/>
    </div>

    <div class="column">
        <button @click="damage" class="add-damage btn" type="button">Damage</button>
        <button @click="heal" class="add-heal btn" type="button">Heal</button>
    </div>

</template>

<style lang="scss">
@import '../css/main.scss';
.column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.card-rect {
    display: flex;
    flex-direction: row;
    position: relative;
    height: 100%;
    width: fit-content;
    margin: 0;
    background-color: $base-color;
    padding: 20px;
    border-radius: 20px;
    z-index: 10;
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
}

.card-rect.alignTop {
    align-self: self-start;
}

.card-rect.alignBottom {
    align-self: self-end;
}

.card-rect p {
    font-size: 3vh;
}

.card-rect h2 {
    font-size: 6vh;
    letter-spacing: 4px;
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
    transition: width 1.5s ease;
    transition-delay: 0.1s;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 200px;
}

.health-bar-red {
    background-color: $alert-color;
    height: 100%;
    width: 100%;
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
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 1s ease;
    border-radius: 200px;
}
</style>