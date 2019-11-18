<template>
    <div id = "players-view">
        <div id = "add-player-div">
            <v-btn id = "player-add-button" color = "primary" dark @click="showModal">Add
                <v-icon dark right>add</v-icon>
            </v-btn>
        </div>
        <PlayerTable
            :players = "playerArray"
            :logger = "logger"
            @edit = "editPlayer"
            @delete = "deletePlayer"
        />
        <PlayerModal
            :show = "isModalVisible"
            :playerToEdit = "playerToShow"
            @close = "closeModal"
            @save = "savePlayer"
        />
    </div>
</template>
<script>
import PlayerModel from '../../model/PlayerModel.js';
import PlayerTable from './PlayerTable.vue';
import PlayerModal from './PlayerModal.vue';

export default {
    name: 'PlayerView',
    components: {
        PlayerModal,
        PlayerTable
    },
    data() {
        return {
            isModalVisible: false,
            playerToShow: null
        }
    },
    props: {
        logger: Object,
        playerModel: PlayerModel
    },
    methods: {
        showModal() {
            this.logger.debug('Opening the modal!')
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
            this.playerToShow = null;
        },
        async savePlayer(playerToSave) {
            this.logger.debug("Saving the player: " + JSON.stringify(playerToSave));
            this.isModalVisible = false;
            this.playerToShow = null;

            this.playerModel.savePlayer(playerToSave);
        },
        editPlayer(idToEdit) {
            this.playerToShow = this.playerArray.find(player => player.id === idToEdit);

            this.isModalVisible = true;
        },
        deletePlayer(idToDelete) {
            this.logger.debug('App is deleting a player: ' + idToDelete);

            this.playerModel.deletePlayer(idToDelete);
        }
    },
    computed: {
        playerArray() {
            return this.playerModel.playerArray;
        }
    }
}
</script>