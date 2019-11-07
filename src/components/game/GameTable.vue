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
                    <ButtonCell :id="props.item.id" :buttonName="buttonName" :icon="iconToShow" @click="buttonClicked"/>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import ButtonCell from '../cells/ButtonCell.vue';
import StringCell from '../cells/StringCell.vue';
import Vue from 'vue';

export default {
    name: 'GameTable',
    components: {
        ButtonCell,
        StringCell
    },
    props: {
        games: Array,
        logger: Vue.log
    },
    data() {
        return {
            buttonName: 'edit',
            iconToShow: 'edit'
        }
    },
    methods: {
        buttonClicked(buttonName, itemIdClicked) {
            this.logger.info(buttonName + ' was clicked for item: ' + itemIdClicked);
        }
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