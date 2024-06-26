<script setup lang="ts">
import SocketEvents from '../../components/SocketEvents.vue';
import PlayerCard from '../../components/PlayerCard.vue';
import SymbolSelector from '../../components/SymbolSelector.vue';


const props = defineProps({
  enemyName: String,
  playerName: String
});

</script>

<template>
  <SocketEvents msg="Connection Test" />
  <div class="top-and-bottom">
    <div class="player-row">
      <PlayerCard name="trinkl" wins=234234 class="enemy" :topbar="true"/>
    </div>
    <SymbolSelector />
    <div class="player-row right">
      <PlayerCard name="professorClever69" wins="123" class="player" />
    </div>
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

.right {
  justify-content: end;
}

.top-and-bottom {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
</style>