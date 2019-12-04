<script>
const uuidv4 = require('uuid/v4');
import moment from 'moment';

export default {
    name: 'SessionModal',
    props: ['show', 
        'sessionToEdit',
        'gameArray',
        'playerArray'],
    data: function() {
        return {
            session: {},
            currentPlayers: {}
        }
    },
    mounted: function(){
        // TODO: need to remove this when sessions have players
        this.session.players = new Array();

        this.currentPlayers = this.session.players;
    },
    methods: {
        close() {
            this.clearValues();
            this.$emit('close');
        },
        save() {
            //deep copy the session prior to emitting it
            this.session.players = this.currentPlayers;
            this.$emit('save', JSON.parse(JSON.stringify(this.session)));
            this.clearValues();
        },
        addPlayer() {
            let uuid = uuidv4();
            this.session.players.push({'id': uuid, 'name': '', 'new': true});
            this.currentPlayers.push({'id': uuid, 'name': '', 'new': true});

        },
        clearValues() {
            this.session.game = '';
            this.session.date = '';
            this.session.players = new Array();
        }
    },
    watch: {
        show: function(show) {
            if (show) {
                //we'll want to set the vlaues of the model if they were provided
                if (this.sessionToEdit) {
                    this.session = JSON.parse(JSON.stringify(this.sessionToEdit));
                }
                else {
                    this.clearValues();
                }
            }
        }
    },
    filters: {
        formatDate: function(value) {
            if (!value) {
                return;
            }
            return moment.utc(value).format('MMM DD, YYYY');
        }
    }
}
</script>
<template>
    <v-layout row justify-center>
        <v-dialog v-model="show" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">New Session</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12>
                                <v-select
                                    :items = "this.gameArray"
                                    label = "Game"
                                    item-text = "name"
                                    item-value = "id"
                                    v-model = "session.game_id"
                                    required>
                                </v-select>
                                <v-date-picker
                                    label = "Date"
                                    v-model="session.date"
                                    required>
                                </v-date-picker>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <div style="width: 100%">
                                <v-btn color = "primary" dark @click="addPlayer()" style = "float: right;">Add Player
                                    <v-icon dark right>add</v-icon>
                                </v-btn>
                            </div>
                            <v-flex v-for = "player in currentPlayers" v-bind:key="player.id" xs12 sm12>
                                <v-row>
                                    <v-select
                                        :items = "playerArray"
                                        label = "Player"
                                        item-text = "name"
                                        item-value = "name"
                                        v-model = "player.name">
                                    </v-select>
                                    <v-spacer></v-spacer>
                                    <v-text-field
                                        label="score"
                                        v-model="player.score"
                                        required>
                                    </v-text-field>
                                </v-row>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color = "blue-darken-1" text @click="close()">Close</v-btn>
                    <v-btn color = "blue-darken-1" text @click="save()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<style>
* {
    box-sizing: border-box;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
}

.modal-container {
    width: 300px;
    margin: 40px auto 0;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.text-right {
    text-align: right;
}

.form-label {
    display: block;
    margin-bottom: 1em;
}

.form-label > .form-control {
    margin-top: 0.5em;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.5em 1em;
    line-height: 1.5;
    border: 1px solid #ddd;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>