<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Card from '../components/Card.vue';

enum ws {
    PLAYER_WIN,
    OPPONENT_WIN,
    TIE
}

let symbolClass = "combat-symbol-img ";
let enemy = "enemy";
let player = "player";
let show = "show";
let showSymbols = ref(false);
let showResult = ref(false);

const props = defineProps({
    player_name: String,
    opponent_name: String,
    player_symbol: String,
    opponent_symbol: String,
});

const symbolClasses = computed(() => {
    return symbolClass + (showSymbols.value ? show : '');
});

const opponentPic = computed(() => {
    switch (props.opponent_symbol) {
        case "r":
            return "../../public/assets/rock.png";
        case "p":
            return "../../public/assets/paper.png";
        case "s":
            return "../../public/assets/scissors.png";
        default:
            return "../../public/assets/nosymbol.png";
    }
});

const playerPic = computed(() => {
    switch (props.player_symbol) {
        case "r":
            return "../../public/assets/rock.png";
        case "p":
            return "../../public/assets/paper.png";
        case "s":
            return "../../public/assets/scissors.png";
        default:
            return "../../public/assets/nosymbol.png";
    }
});

const win = computed(() => {
    if (
        (props.player_symbol == "r" && props.opponent_symbol == "s") ||
        (props.player_symbol == "p" && props.opponent_symbol == "r") ||
        (props.player_symbol == "s" && props.opponent_symbol == "p") || (props.player_symbol != "" && props.opponent_symbol == "")
    ) return ws.PLAYER_WIN;

    if (
        (props.player_symbol == "s" && props.opponent_symbol == "r") ||
        (props.player_symbol == "r" && props.opponent_symbol == "p") ||
        (props.player_symbol == "p" && props.opponent_symbol == "s") || (props.opponent_symbol != "" && props.player_symbol == "")
    ) return ws.OPPONENT_WIN;

    return ws.TIE;
});

onMounted(() => {
    setTimeout(() => {
        showSymbols.value = true;
    }, 500);
    setTimeout(() => {
        showResult.value = true;
    }, 2500);
    setTimeout(() => {
        showSymbols.value = false;
        showResult.value = false;
    }, 5000);
})
</script>

<template>
    <div class="combatResult">
        <div v-if="showResult" class="showResult">
            <p v-if="win === ws.PLAYER_WIN">{{ player_name }} wins this round!</p>
            <p v-else-if="win === ws.OPPONENT_WIN">{{ opponent_name }} wins this round!</p>
            <p v-else>Tie!</p>
        </div>
    </div>

    <div class="pos-absolute fullscreen">
        <div class="flex-row top-symbol">
            <img :class="[symbolClasses, enemy]" :src="opponentPic" />
        </div>
        <div class="flex-row bottom-symbol">
            <img :class="[symbolClasses, player]" :src="playerPic" />
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
.combat-symbol-img.enemy.show {
    transform: translateY(16vh) translateX(16vw) rotate(160deg) scale(1);
    opacity: 100%;
}

.combat-symbol-img.player.show {
    transform: translateY(-16vh) translateX(-16vw) rotate(-20deg) scale(1);
    opacity: 100%;
}

.pos-absolute {
    position: absolute;
    z-index: 0;
}

.fullscreen {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.flex-row.top-symbol {
    justify-content: flex-start;
}

.flex-row.bottom-symbol {
    justify-content: flex-end;
}

.combatResult {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
}

.showResult {
    font-size: 10vw;
    z-index: 1010;
    background-color: $secondary-color;
    padding: 2%;
    border-radius: 10px;
}

.showResult p {
    font-size: 10vw;
    padding-right: 3vw;
    padding-left: 3vw;
}
</style>