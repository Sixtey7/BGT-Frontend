<template>
    <div class = "session-table">
        <v-data-table
            :items = "sessions"
            item-id = "id">

            <template v-slot:header>
                <tr id="session-table-top-label">
                    <th colspan="4">Sessions</th>
                </tr>
                <tr id = "session-table-header-row">
                    <th scope="col">Date</th>
                    <th scope="col">Game</th>
                    <th scope="col">Num Players</th>
                    <th scope="col"></th>
                </tr>
            </template>
            <template v-slot:item="props">
                <tr>
                    <DateCell :dateToShow="props.item.date" />
                    <StringCell :stringToShow="props.item.game_id" />
                    <NumberCell :numberToShow="props.item.players.length" />
                    <ButtonCell class="button-cell" :id="props.item.id" :buttons="buttons" @click="buttonClicked"/>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>
<script>
import ButtonCell from '../cells/ButtonCell.vue';
import DateCell from '../cells/DateCell.vue';
import NumberCell from '../cells/NumberCell.vue';
import StringCell from '../cells/StringCell.vue';

import Vue from 'vue';

export default {
       name: 'SessionTable',
       components: {
           ButtonCell,
           DateCell,
           NumberCell,
           StringCell
       },
       props: {
           sessions: Array,
           logger: Vue.logger
       },
       data() {
           return {
               buttons: [
                   {
                       name: 'edit',
                       iconToShow: 'edit'
                   },
                   {
                       name: 'delete',
                       iconToShow: 'delete'
                   },
                   {
                       name: 'add_session',
                       iconToShow: 'add_circle_outline'
                   }
               ]
           }
       },
       methods: {
           buttonClicked(buttonName, itemIdClicked) {
               this.logger.info(buttonName + ' was clicked for item: ' + itemIdClicked);
               if (buttonName === 'edit') {
                   this.handleEdit(itemIdClicked);
               }
               else if (buttonName === 'delete') {
                   this.handleDelete(itemIdClicked);
               }
               else if (buttonName === 'add_session') {
                   this.handleAddSession(itemIdClicked);
               }
               else {
                this.logger.error('Got an invalid action from button callback: ' + buttonName);
               }
           },
           handleEdit(itemIdClicked) {
               this.logger.info('doing an edit for item: ' + itemIdClicked);
               this.$emit('edit', itemIdClicked);
           },
           handleDelete(itemIdClicked) {
               this.logger.info('doing a delete for item: ' + itemIdClicked);
               this.$emit('delete', itemIdClicked);
           },
           handleAddSession(itemIdClicked) {
               this.logger.info('adding a session for item ' + itemIdClicked);
               this.$emit('add_session', itemIdClicked);
           }
       }
}
</script>

<style scoped>
html, body {
    margin: 5px;
    padding: 0;
}

#session-table-top-label th {
    text-align: center;
}

#session-table-header-row th {
    text-align: center;
}
</style>