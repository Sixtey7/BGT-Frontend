<template>
  <v-app dark sytle = "margin-top: 0px">
    <v-card height = "100%">
      <v-content>
        <v-container>
          <GameView></GameView>
        </v-container>
        <v-container>
          <PlayerView></PlayerView>
        </v-container>
        <v-container>
          <SessionView></SessionView>
        </v-container>
      </v-content>
    </v-card>
  </v-app>
</template>

<script>
import GameView from './components/game/GameView.vue';
import PlayerView from './components/players/PlayerView.vue';
import SessionView from './components/session/SessionView.vue';


export default {
  name: 'app',
  components: {
    GameView,
    PlayerView,
    SessionView
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
