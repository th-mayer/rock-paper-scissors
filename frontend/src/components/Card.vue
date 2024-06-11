<template>
    <div class="backdrop">
        <div>
            <div class="card-topbar">
                <h4 class="card-header">Test{{ title }}</h4>
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

<style>
.backdrop {
  width: 100vw;
  height: 100vh;
  background-color: rgba(31, 112, 199, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-rect {
    position: relative;
    width: 40vw;
    height: fit-content;
    margin: 0;
    background-color: #F5A3F6;
    padding: 20px;
    border-radius: 20px;
    z-index: 10;
    font-family: tweety;
    letter-spacing: 1px;
    font-weight: 100;
    font-size: large;
    font-style: normal;
}
.card-topbar {
    position: relative;
    width: 40vw;
    height: 8vh;
    padding: 20px;
    margin: 0;
    background-color: #745CD8;
    border-radius: 20px;
    transform: translateY(50px);
    z-index: 1;
    font-family: tweety;
    letter-spacing: 1px;
    font-weight: 100;
    font-size: large;
    font-style: normal;
}
.card-topbar h4 {
    margin-top: -10px;
    color: #ffffff;
}
</style>