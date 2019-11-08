<template>
    <td>
        <v-icon v-for="button in buttons" v-bind:key="button.name"
            small
            class="mr-2"
            @click="buttonClicked(button.name)"
        >
            {{ button.iconToShow }}
        </v-icon>
    </td>
</template>
<script>
export default {
    name: "ButtonCell",
    props: {
        buttons: Array,
        id: String,
    },
    methods: {
        buttonClicked(itemClicked) {
            // eslint-disable-next-line
            console.log('Got the value: ' + itemClicked)
            this.$emit('click', itemClicked, this.$props.id );
        }
    }
}
</script>