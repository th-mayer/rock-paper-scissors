<template>
    <div>
        <div v-if=backdrop class="backdrop">
            <div class="card-container">
                <div class="card-topbar">
                    <h4 class="card-header">{{ title }}</h4>
                </div>
                <div class="card-rect">
                    <slot></slot>
                </div>
            </div>
        </div>
        <div v-else class="card-container">
            <div class="card-topbar">
                <h4 class="card-header">{{ title }}</h4>
            </div>
            <div class="card-rect">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: ['title', 'backdrop']
}
</script>

<style lang="scss">
@import '../css/main.scss';

.card-container {
    width: fit-content;
    height: fit-content;
    z-index: 1001;
    transform: translateY(-45px);
}

.backdrop {
    width: 100vw;
    height: 100vh;
    background-color: $backdrop-color;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* these are gonna need media queries to style on phone obv */
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

.card-topbar {
    display: flex;
    text-align: center;
    height: 6vh;
    padding: 20px;
    background-color: $secondary-color;
    border-radius: 20px;
    transform: translateY(30px);
    z-index: 1;
    font-family: $main-font;
    letter-spacing: 1px;
    font-size: 5vh;
    box-shadow: 7px 7px $backshadow;
}

.card-topbar h4 {
    text-align: center;
    margin: 0 auto;
    margin-top: -10px;
    color: $bright-font-color;
}

.card-container a {
    font-size: 60%;
    color: $bright-font-color;
    text-decoration: underline;
    width: fit-content;
}

.card-container p {
    font-size: 3vh;
    color: $bright-font-color;
    margin: 0;
}

.dots-container {
    display: flex;
    padding-top: .5vh;
}

.dot {
    height: 2.5vh;
    aspect-ratio: 1/1;
    margin-left: .4vw;
    margin-right: .4vw;
    background-color: $backshadow;
    border-radius: 50%;
    display: inline-block;
}

@media (max-width: 1100px) {
    .card-rect h2 {
        font-size: 12vw;
    }
}

@media (max-width: 786px) {
    .card-rect h2 {
        font-size: 8vw;
    }
}
</style>