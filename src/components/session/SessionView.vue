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
            @edit = "editSession"
            @delete = "deleteSession"
            @add_session = "addToSession"
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

export default {
    name: 'SessionView',
    components: {
        SessionTable,
        SessionModal
    },
    data() {
        return {
            isModalVisible: false,
            sessionToShow: null
        }
    },
    props: {
        logger: Object,
        sessionModel: SessionModel,
        sessionArray: Array
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
            
            this.isModalVisible = false;
            this.sessionToShow = null;

            this.sessionModel.saveSession(sessionToSave);
        },
        editSession(idtoEdit) {
            this.sessionToShow = this.sessionArray.find(session => session.id === idtoEdit);

            this.isModalVisible = true;
        },
        deleteSession(idToDelete) {
            this.logger.debug('App is deleting a session: ' + idToDelete);
            this.sessionModel.deleteSession(idToDelete);
        },
        addToSession(idToAddTo) {
            this.logger.debug('App is adding a player to a session ' + idToAddTo);
        }
    }
}
</script>