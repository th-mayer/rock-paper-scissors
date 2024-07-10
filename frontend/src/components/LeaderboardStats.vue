<script lang="ts">
export default {
    props: ['name', 'wins']
}
</script>

<template>
    <div class="leaderboardStats">
        <p>{{ name }}</p>
        <hr>
        <p class="wins">{{ wins }} wins</p>
    </div>
</template>

<style lang="scss">
@import '@/css/main.scss';

.leaderboardStats {
    display: flex;
    justify-content: center;
    width: 100%;

}

hr {
    width: 100%;
    border: none;
    border-top: dotted 5px;
    color: $bright-font-color;
    margin-left: 1vw;
    margin-right: 1vw;
    transform: translateY(1.2vh);
}

.wins {
    white-space: nowrap;
}
/* bigger than tablet styles */
@media (max-width: 1100px) {
    .leaderboardStats {
        width: 80vw;
        max-width: 600px;
    }
}

/* Tablet styles */
@media (max-width: 768px) {
    .leaderboardStats{
        width: 84vw;
    }
}

/* Phone styles */
@media (max-width: 480px) {}
</style>