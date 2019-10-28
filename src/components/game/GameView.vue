<template>
    <div id = "games-view">
        <div id = "add-games-div">
            <v-btn id = "games-add-button" color = "primary" dark @click="showModal">Add
                <v-icon dark right>add</v-icon>
            </v-btn>
        </div>
        <GameTable
            :games = "gameArray"
            :logger = "logger"
        />
        <GameModal
            :show = "isModalVisible"
            :gameToEdit = "gameToShow"
            @close = "closeModal"
            @save = "saveGame"
        />
    </div>
</template>

<script>
import GameModel from '../../model/GameModel.js';
import GameTable from './GameTable.vue';
import GameModal from './GameModal.vue';
import Vue from 'vue'

export default {
    name: 'GameView',
    components: {
        GameTable,
        GameModal
    },
    data() {
        return {
            logger: Vue.$log,
            gameModel: new GameModel(Vue.$log),
            isModalVisible: false,
            gameToShow: null
        }
    },
    props: {
    },
    methods: {
        showModal() {
            this.logger.debug('Opening the modal!')
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
            this.gameToShow = null;
        },
        async saveGame(gameToSave) {
            this.logger.debug("Saving the game: " + JSON.stringify(gameToSave));
            //TODO
        }
    },
    computed: {
        gameArray() {
            return this.gameModel.gameArray
        }
    }
}
</script>