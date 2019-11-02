<template>
    <div id = "session-view">
        <div id = "add-session-div">
            <v-btn id = "session-add-button" color = "primary" dark @click="showModal">Add
                <v-icon dark right>add</v-icon>
            </v-btn>
        </div>
        <SessionTable
            :sessions = "sessionArray"
            :logger = "logger"
        />
        <SessionModal
            :show = "isModalVisible"
            :sessionToEdit = "sessionToShow"
            @close = "closeModal"
            @save = "saveSession"
        />
    </div>
</template>
<script>
import SessionModel from '../../model/SessionModel.js';
import SessionTable from './SessionTable.vue';
import SessionModal from './SessionModal.vue';
import Vue from 'vue';

export default {
    name: 'SessionView',
    components: {
        SessionTable,
        SessionModal
    },
    data() {
        return {
            logger: Vue.$log,
            gameModel: new SessionModel(Vue.$log),
            isModalVisible: false,
            sessionToShow: null
        }
    },
    props: {
    },
    methods: {
        showModal() {
            this.logger.debug('Opening the modal!');
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
            this.sessionToShow = null;
        },
        async saveSession(sessionToSave) {
            this.logger.debug('Saving the session: ' + JSON.stringify(sessionToSave));
            //TODO
        }
    },
    computed: {
        sessionArray() {
            return this.SessionModel.sessionArray;
        }
    }
}
</script>