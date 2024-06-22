<template>
    <div class="leaderboardStats">
        <p>{{ name }}</p>
        <hr>
        <p>{{ wins }}</p>
    </div>
</template>

<script lang="ts">
export default {
    props: ['name', 'wins']
}
</script>

<style lang="scss">
@import '@/css/main.scss';

.leaderboardStats {
    display: flex;
    flex-direction: row;
    width: 100%;
    
}

hr{
    width: 100%;
    border: none;
    border-top: dotted 5px;
    color: $bright-font-color;
    margin-left: 1vw;
    margin-right: 1vw;
    transform: translateY(-1.2vh);
}
</style>