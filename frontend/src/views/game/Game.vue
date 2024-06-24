<script setup lang="ts">
import SocketEvents from '../../components/SocketEvents.vue';
import ItemBox from '../../components/ItemBox.vue';
import Card from '../../components/Card.vue';
import PlayerCard from '../../components/PlayerCard.vue';


const props = defineProps({
  enemyName: String,
  playerName: String
});

</script>

<template>
  <SocketEvents msg="Connection Test" />
  <PlayerCard name="trinkl" wins="3123" class="enemy">
    <h1></h1>
  </PlayerCard>
  <ItemBox />
</template>

<style lang="scss">
@import "../../css/main.scss";

* {
  margin: 0;
  color: $bright-font-color;
}
</style>