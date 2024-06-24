<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({
    name: String,
    wins: Number,
    startHealth: Number,
});

const hb = ref(null);
const hbred = ref(null);
const hbblue = ref(null);

const maxHealth = 100;
let health = maxHealth;

function updateBar() {
    const targetWidth = health * (100 / maxHealth) + "%";

    if (hbred.value && hbblue.value && hb.value) {
        hbred.value.style.width = targetWidth;
        hb.value.style.width = targetWidth;
        hbblue.value.style.width = targetWidth;
    }
}

function dmg2() {
    health = Math.max(0, health - 30); // Ensure health does not go below 0
    updateBar();
    console.log("hii")
}

function heal() {
    health = Math.min(100, health + 30); // Ensure health does not go below 0
    updateBar();
    console.log("hii")
}

onMounted(() => {
    updateBar(); // Initialize the health bar on component mount
});

</script>

<template>
    <div class="card-rect">
        <div>
            <p>{{ name }}</p>
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

    <div class="row">
        <button @click="dmg2" class="add-damage btn" type="button">Damage</button>
        <button @click="heal" class="add-heal btn" type="button">Heal</button>
    </div>

</template>

<style lang="scss">
@import '../css/main.scss';

.card-rect {
    position: relative;
    height: fit-content;
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
}

.health-box {
    background-color: $backshadow;
    height: 30px;
    width: 500px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    border-radius: 15px;
}

.health-bar {
    background-color: $secondary-color;
    height: 100%;
    transition: width 1.5s ease;
    transition-delay: 0.1s;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 15px;
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
    border-radius: 15px;
}

.health-bar-blue {
    background-color: $highlight-color;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 1s ease;
    border-radius: 15px;
}
</style>