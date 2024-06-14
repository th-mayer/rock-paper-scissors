<template>
    <section class="main-background">
    </section>
</template>

<style lang="scss">
    @import '@/css/main.scss';

    .main-background {
        background-position: right top;
        background-attachment: fixed;
        position: fixed;
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        background-image: url(../../public/assets/background90.png);
        background-size:   cover;
        z-index: -1000;
    }
</style>