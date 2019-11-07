<template>
    <td>
        <v-icon
            small
            class="mr-2"
            @click="buttonClicked(buttonName)"
        >
            {{ icon }}
        </v-icon>
    </td>
</template>
<script>
export default {
    name: "ButtonCell",
    props: {
        id: String,
        buttonName: String,
        icon: String
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