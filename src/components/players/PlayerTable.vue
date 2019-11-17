<template>
    <div class = "player-table">
        <v-data-table
            :items = "players"
            item-id = "id">

            <template v-slot:header>
                <tr id="player-table-top-label">
                    <th colspan="2">Players</th>
                </tr>
                <tr id = "player-table-header-row">
                    <th scope="col">Name</th>
                    <th scope="col"></th>
                </tr>
            </template>
            <template v-slot:item = "props">
                <tr>
                    <StringCell :stringToShow="props.item.name" />
                    <ButtonCell class="button-cell" :id="props.item.id" :buttons="buttons" @click="buttonClicked" />
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
    name: 'PlayerTable',
    components: {
        ButtonCell,
        StringCell
    },
    props: {
        players: Array,
        logger: Vue.log
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
            this.$emit('delete', itemIdClicked)
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
.button-cell {
    float: right;
}
</style>