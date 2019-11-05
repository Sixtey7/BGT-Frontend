<template>
    <td class="text-xs-center">{{ numberToShow }}</td>
</template>

<script>
export default {
    name: "NumberCell",
    props: {
        numberToShow: Number
    }
}
</script>