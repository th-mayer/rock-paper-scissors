<script setup lang="ts">
import { Ref, ref, onMounted, computed } from "vue";
import Card from "./Card.vue";
import Symbol from "./Symbol.vue";

const timer: Ref<HTMLElement | undefined> = ref();
const show = ref(true);
const selectArray: Ref<boolean[]> = ref([false, false, false]);

const emit = defineEmits(["confirm-symbol", "confirm-last"]);

const rockHighlight = computed(() => {
    return selectArray.value[0];
});

const paperHighlight = computed(() => {
    return selectArray.value[1];
});

const scissorsHighlight = computed(() => {
    return selectArray.value[2];
});

function startTimer() {
    if (timer.value) {
        timer.value.style.width = "0%";
        timer.value.style.backgroundColor = "#ef277a";
        setTimeout(removeWindow, 8050);
    }
}

function removeWindow() {
    show.value = false;
    emit("confirm-last");
}

function chooseRock() {
    selectArray.value[0] = !selectArray.value[0];
    selectArray.value[1] = false;
    selectArray.value[2] = false;
    if (selectArray.value[0]) emit("confirm-symbol", "r");
    else emit("confirm-symbol", "");
}
function choosePaper() {
    selectArray.value[1] = !selectArray.value[1];
    selectArray.value[0] = false;
    selectArray.value[2] = false;
    if (selectArray.value[1]) emit("confirm-symbol", "p");
    else emit("confirm-symbol", "");
}
function chooseScissors() {
    selectArray.value[2] = !selectArray.value[2];
    selectArray.value[1] = false;
    selectArray.value[0] = false;
    if (selectArray.value[2]) emit("confirm-symbol", "s");
    else emit("confirm-symbol", "");
}
onMounted(() => {
    setTimeout(startTimer, 500); // Initialize the health bar on component mount
});
</script>

<template>
    <Card v-show="show" title="select!" class="flex-row symbol-select-container">
        <div>
            <div class="timer">
                <div ref="timer" class="timer-bar"></div>
            </div>
        </div>

        <div class="flex-row">
            <Symbol :isHighlighted="rockHighlight" @click="chooseRock" :type="0" class="highlighted"></Symbol>
            <Symbol :isHighlighted="paperHighlight" @click="choosePaper" :type="1" class="highlighted"></Symbol>
            <Symbol :isHighlighted="scissorsHighlight" @click="chooseScissors" :type="2" class="highlighted"></Symbol>
        </div>
    </Card>
</template>

<style lang="scss">
@import "@/css/main.scss";

.symbol-select-container {
    display: flex;
    max-height: 10vw;
    align-items: center;
}

.timer {
    background-color: $backshadow;
    height: 4vh;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    border-radius: 200px;
    margin-bottom: 2vh;
}

.timer-bar {
    background-color: $secondary-color;
    width: 100%;
    height: 100%;
    transition: width 8s linear, background-color 4s linear;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 200px;
}

/* Additional styles for highlighted state */
.highlighted {
    border-color: $backshadow;
    border: 2px solid transparent;
    transition: border-color 0.3s;
}

.highlighted.selected {
    border-color: $highlight-color;
}

@media (max-width: 768px) {
    .timer {
        height: 2.5vh;
    }

    .symbol-select-container {
        max-height: 20vw;
    }
}

/* Phone styles */
@media (max-width: 480px) {}
</style>
