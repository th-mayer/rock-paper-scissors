<script setup lang="ts">
    const props = defineProps({
    itemKind: Number,
    multiplier: Number
    });
</script>

<template>
    <div class="itemDiv" v-if="props.itemKind == 1"> <!-- More Damage with Stone -->
        <img src="../../public/assets/rockdmg.png">
        <div class="itemDiscription">
            <h2>Heavy Stone</h2>
            <p>Equipped person deals <span class="highlighted">{{ props.multiplier }}x</span> times the damage when winning with rock</p>
        </div>
    </div>
    <div class="itemDiv" v-else-if="props.itemKind == 2"> <!-- More Damage with Paper -->
        <img src="../../public/assets/paperdmg.png">
        <div class="itemDiscription">
            <h2>Sharp Paper</h2>
            <p>Equipped person deals <span class="highlighted">{{ props.multiplier }}x</span> times the damage when winning with paper</p>
        </div>
    </div>
    <div class="itemDiv" v-else-if="props.itemKind == 3"> <!-- More Damage with Scissors -->
        <img src="../../public/assets/scissorsdmg.png">
        <div class="itemDiscription">
            <h2>Pointy Scissors</h2>
            <p>Equipped person deals <span class="highlighted">{{ props.multiplier }}x</span> times the damage when winning with scissors</p>
        </div>
    </div>
    <div class="itemDiv" v-else-if="props.itemKind == 4"> <!-- Protection from Stone -->
        <img src="../../public/assets/rockdefense.png">
        <div class="itemDiscription">
            <h2>Brittle Stones</h2>
            <p>Equipped person receives only <span class="highlighted">{{ props.multiplier }}x</span> times the damage when loosing aginst rock"</p>
        </div>
    </div>
    <div class="itemDiv" v-else-if="props.itemKind == 5"> <!-- Protection from Paper -->
        <img src="../../public/assets/paperdefense.png">
        <div class="itemDiscription">
            <h2>Soggy Paper</h2>
            <p>Equipped person receives only <span class="highlighted">{{ props.multiplier }}x</span> times the damage when loosing aginst paper</p>
        </div>
    </div>
    <div class="itemDiv" v-else-if="props.itemKind == 6"> <!-- Protection from Scissors -->
        <img src="../../public/assets/scissorsdefense.png">
        <div class="itemDiscription">
            <h2>Blunt Scissors</h2>
            <p>Equipped person receives only <span class="highlighted">{{ props.multiplier }}x</span> times the damage when loosing aginst scissors</p>
        </div>
    </div>
    <div class="itemDiv" v-else> <!-- No Item -->
        <img src="../../public/assets/empty.png">
        <div class="itemDiscription">
            <h2>No Item Equipped</h2>
            <p>Win a match to be able to place an item here!</p>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/css/main.scss';

div.itemDiv {
    height: 23vh;
    aspect-ratio: 1/1;
    background-color: $base-color;
    border-radius: 20px;
    border-width: 5px;
    border-color: $bright-font-color;
    border-style: solid;
    border-color: $backshadow;
    margin: 5px;
}

div.itemDiscription {
    visibility: hidden;
    position: fixed;
    width: 30vw;
    background-color: $secondary-color;
    padding: 2vh;
    border-radius: 20px;
    border-color: $backshadow;
    border-width: 3px;
    border-style: solid;
}

div.itemDiv:hover{
    border-color: $highlight-color;
    transition: 0.1s ease-in;
}

div.itemDiscription > h2 {
    font-size: 5vh;
    margin: 0;
    margin-bottom: 0.5vh;
}

div.itemDiscription > p {
    font-size: 3vh;
}

div:hover > div.itemDiscription {
    visibility: visible;
}

img {
    height: 100%;
}

.highlighted{
    color: $highlight-color;
}

</style>
