<template>
    <div class = "game-table">
        <v-data-table
            :items = "games"
            item-id = "id">

            <template v-slot:header>
                <tr id="game-table-top-label">
                    <th colspan="3">Games</th>
                </tr>
                <tr id ="game-table-header-row">
                    <th scope="col">Name</th>
                    <th scope="col">Scoring</th>
                    <th scope="col"></th>
                </tr>
            </template>
            <template v-slot:item="props">
                <tr>
                    <StringCell :stringToShow="props.item.name" />
                    <StringCell :stringToShow="props.item.scoring" />
                    <StringCell :stringToShow="props.item.name" />
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import StringCell from '../cells/StringCell.vue';
import Vue from 'vue';

export default {
    name: 'GameTable',
    components: {
        StringCell
    },
    props: {
        games: Array,
        logger: Vue.log
    }
}
</script>

<style scoped>
html, body {
    margin: 5px;
    padding: 0;
}

#game-table-top-label th {
    text-align: center;
}

#game-table-header-row th {
    text-align: center;
}
</style>