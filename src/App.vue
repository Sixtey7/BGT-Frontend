<template>
  <v-app dark sytle = "margin-top: 0px">
    <v-card height = "100%">
      <v-content>
        <v-container>
          <GameView
            :gameModel = "gameModel"
            :gameArray = "gameModel.gameArray"
            :logger = "logger">
          </GameView>
        </v-container>
        <v-container>
          <PlayerView
            :playerModel = "playerModel"
            :playerArray = "playerModel.playerArray"
            :logger = "logger">
          </PlayerView>
        </v-container>
        <v-container>
          <SessionView
            :sessionModel = "sessionModel"
            :sessionArray = "sessionModel.sessionArray"
            :logger = "logger">
          </SessionView>
        </v-container>
      </v-content>
    </v-card>
  </v-app>
</template>

<script>
import GameView from './components/game/GameView.vue';
import PlayerView from './components/players/PlayerView.vue';
import SessionView from './components/session/SessionView.vue';
import GameModel from './model/GameModel';
import PlayerModel from './model/PlayerModel';
import SessionModel from './model/SessionModel';
import Vue from 'vue';

export default {
  name: 'app',
  components: {
    GameView,
    PlayerView,
    SessionView
  },
  data() {
    return {
      logger: Vue.$log,
      gameModel: new GameModel(Vue.$log),
      playerModel: new PlayerModel(Vue.$log),
      sessionModel: new SessionModel(Vue.$log)
    }
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
