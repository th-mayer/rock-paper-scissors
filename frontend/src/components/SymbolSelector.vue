<script setup lang="ts">
import { Ref, ref, onMounted } from 'vue';
import Card from './Card.vue';
import Symbol from './Symbol.vue';

const timer: Ref<HTMLElement | undefined> = ref();
const show = ref(true);
const selectArray: Ref<boolean[]> = ref([false, false, false]);
const rock = ref<HTMLElement | null>(null);
const paper = ref<HTMLElement | null>(null);
const scissors = ref<HTMLElement | null>(null);

function startTimer() {
    if (timer.value) {
        timer.value.style.width = "0%";
        timer.value.style.backgroundColor = "#ef277a";
        setTimeout(removeWindow, 8050);
    }
}

function removeWindow() {
    show.value = false;
}

function select(a: number) {
    // Reset all borders
    if (rock.value) rock.value.style.borderColor = "ffffff";
    if (paper.value) paper.value.style.borderColor = "ffffff";
    if (scissors.value) scissors.value.style.borderColor = "ffffff";

    // Highlight the selected symbol
    switch (a) {
        case 0:
            if (rock.value) rock.value.style.backgroundColor = "00aeff";
            console.log("hey")
            break;
        case 1:
            if (paper.value) paper.value.style.borderColor = "00aeff";
            break;
        case 2:
            if (scissors.value) scissors.value.style.borderColor = "00aeff";
            break;
    }
}

onMounted(() => {
    // Perform any additional setup if needed
});
</script>

<template>
    <Card v-show="show" title="Choose your symbol!" class="flex-row symbol-select-container">
        <div>
            <div class="timer" @click="startTimer">
                <div ref="timer" class="timer-bar"></div>
            </div>
        </div>

        <div class="flex-row">
            <Symbol ref="rock" @click="select(0)" :type="0" class="highlighted"></Symbol>
            <Symbol ref="paper" @click="select(1)" :type="1" class="highlighted"></Symbol>
            <Symbol ref="scissors" @click="select(2)" :type="2" class="highlighted"></Symbol>
        </div>
    </Card>
</template>


<style lang="scss">
@import '@/css/main.scss';

.symbol-select-container {
    max-height: 40vh;
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
    border: 2px solid transparent;
    transition: border-color 0.3s;
}

.highlighted.selected {
    border-color: #00aeff;
}
</style>
