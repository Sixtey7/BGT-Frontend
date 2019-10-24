<template>
    <div id = "games-view">
        <div v-for = "game in gameArray" v-bind:key = "game.id">
            <ul>
                <li> {{ game.id }} </li>
                <li> {{ game.name }} </li>
                <li> {{ game.scoring }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import GameModel from '../../model/GameModel.js';
import Vue from 'vue'

export default {
    name: 'GameView',
    data() {
        return {
            logger: Vue.$log,
            gameModel: new GameModel(Vue.$log),
        }
    },
    props: {
    },
    computed: {
        gameArray() {
            return this.gameModel.gameArray
        }
    },
    created() {
        this.logger.debug('hello world!')
      //  this.gameArray = this.gameModel.gameArray
        this.logger.debug("Game Array has " + this.gameArray.length + " elements");
    }
}
</script>