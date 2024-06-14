<template>
    <div class="backdrop">
        <div>
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
        props: ['title']
    }
</script>

<style lang="scss">

.backdrop {
  width: 100vw;
  height: 100vh;
  background-color: rgba(31, 112, 199, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  
}

/* these are gonna need media queries to style on phone obv */
.card-rect {
    position: relative;
    height: 60vh;
    width: fit-content;
    margin: 0;
    background-color: #F5A3F6;
    padding: 20px;
    border-radius: 20px;
    z-index: 10;
    font-family: tweety;
    letter-spacing: 1px;
    font-weight: lighter;
    font-size: 5vh;
    font-style: normal;
    box-shadow: 7px 7px white;
}
.card-topbar {
    position: relative;
    height: 6vh;
    padding: 20px;
    margin: 0;
    background-color: #745CD8;
    border-radius: 20px;
    transform: translateY(30px);
    z-index: 1;
    font-family: tweety;
    letter-spacing: 1px;
    font-weight: 100;
    font-size: 5vh;
    font-style: normal;
    box-shadow: 7px 7px white;
}
.card-topbar h4 {
    margin-top: -10px;
    color: #ffffff;
}
</style>