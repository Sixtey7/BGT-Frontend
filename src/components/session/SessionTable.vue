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
            <template>
                <tr>
                    <StringCell :stringToShow="props.item.date" />
                    <StringCell :stringToShow="props.item.game" />
                    <StringCell :stringToShow="props.item.players.length" />
                    <StringCell :stringToShow="props.item.game" />
                </tr>
            </template>
        </v-data-table>
    </div>
</template>
<script>
import StringCell from '../cells/StringCell.vue';
import Vue from 'vue';

export default {
       name: 'SessionTable',
       components: {
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