<script setup lang="ts">
import SocketEvents from '../../components/SocketEvents.vue';
import ItemBox from '../../components/ItemBox.vue';
import PlayerCard from '../../components/PlayerCard.vue';


const props = defineProps({
  enemyName: String,
  playerName: String
});

</script>

<template>
  <SocketEvents msg="Connection Test" />
  <div class="player-row">
    <PlayerCard name="trinkl2342342311234" wins=234234 class="enemy">
    </PlayerCard>
    <ItemBox height="15vh" width="15vh"/>
  </div>
</template>

<style lang="scss">
@import "../../css/main.scss";

* {
  margin: 0;
  color: $bright-font-color;
}

.player-row{
  display: flex;
  height: 15vh;
  width: 100vw;
  margin: 5vh;

}
</style>