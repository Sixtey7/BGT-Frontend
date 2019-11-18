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
            @edit = "editGame"
            @delete = "deleteGame"
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

export default {
    name: 'GameView',
    components: {
        GameTable,
        GameModal
    },
    data() {
        return {
            isModalVisible: false,
            gameToShow: null
        }
    },
    props: {
        logger: Object,
        gameModel: GameModel
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
            this.isModalVisible = false;
            this.gameToShow = null;

            this.gameModel.saveGame(gameToSave);
        },
        editGame(idToEdit) {
            this.gameToShow = this.gameArray.find(game => game.id === idToEdit);

            this.isModalVisible = true;
        },
        deleteGame(idToDelete) {
            this.logger.debug('App is deleting a game: ' + idToDelete);

            this.gameModel.deleteGame(idToDelete);
        }
    },
    computed: {
        gameArray() {
            return this.gameModel.gameArray
        }
    }
}
</script>