<template>
    <td>
        <v-icon v-for="button in buttons" v-bind:key="button.name"
            class="ma-2"
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
            this.$emit('click', itemClicked, this.$props.id );
        }
    }
}
</script>