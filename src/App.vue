<template>
  <v-app dark sytle = "margin-top: 0px">
    <v-card height = "100%">
      <v-content>
        <v-container>
          <img alt="Vue logo" src="./assets/logo.png">
          <HelloWorld msg="Welcome to Your Vue.js App"/>
          <GameView></GameView>
        </v-container>
      </v-content>
    </v-card>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import GameView from './components/game/GameView.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    GameView
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
