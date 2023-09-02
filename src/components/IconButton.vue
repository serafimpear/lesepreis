<template>
    <button class="ui-single-icon-button">
        <img v-if="type == 'add'" src="@/assets/svgs/icon-plus.svg">
        <img v-if="type == 'yes'" src="@/assets/svgs/icon-yes.svg">
        <img v-if="type == 'no'" src="@/assets/svgs/icon-no.svg">
        <img v-if="type == 'delete'" src="@/assets/svgs/icon-trashcan.svg">
    </button>
</template>

<style>
button.ui-single-icon-button {
    background: white;
    margin-left: auto;
    border-radius: 20px;
    border: none;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

button.ui-single-icon-button:hover {
    background: #F5F5F5;
}

button.ui-single-icon-button:active {
    filter: brightness(0.8);
}
</style>

<script>
export default {
    props: ['type']
}
</script>