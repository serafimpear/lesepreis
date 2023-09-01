<template>
    <button class="ui-button ui-styled">
        {{ text }}
        <img v-if="type == 'add'" src="@/assets/svgs/icon-plus.svg">
        <img v-if="type == 'yes'" src="@/assets/svgs/icon-yes.svg">
        <img v-if="type == 'no'" src="@/assets/svgs/icon-no.svg">
        <img v-if="type == 'delete'" src="@/assets/svgs/icon-trashcan.svg">
    </button>
</template>

<style>
button.ui-button {
    column-gap: 10px;
    background-color: white;
    line-height: 40px;
    margin-left: auto;
    text-wrap: nowrap;
}

button.ui-button:hover {
    cursor: pointer;
}
</style>

<script>
export default {
    props: ['type', 'text']
}
</script>