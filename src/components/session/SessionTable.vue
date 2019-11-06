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
                    <DateCell :dateToShow="props.item.date" />
                </tr>
            </template>
        </v-data-table>
    </div>
</template>
<script>
import DateCell from '../cells/DateCell.vue';
import NumberCell from '../cells/NumberCell.vue';
import StringCell from '../cells/StringCell.vue';

import Vue from 'vue';

export default {
       name: 'SessionTable',
       components: {
           DateCell,
           NumberCell,
           StringCell
       },
       props: {
           sessions: Array,
           logger: Vue.logger
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