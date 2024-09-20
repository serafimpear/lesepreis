<template>
    <button :tabindex="tabindex" :class="'ui-button ui-styled ' + color + ' ' + tclass">
        {{ text }}
        <img v-if="type == 'add'" src="@/assets/svgs/icon-plus.svg">
        <img v-if="type == 'yes'" src="@/assets/svgs/icon-yes.svg">
        <img v-if="type == 'no'" src="@/assets/svgs/icon-no.svg">
        <img v-if="type == 'delete'" src="@/assets/svgs/icon-trashcan.svg">
        <img v-if="type == 'import'" src="@/assets/svgs/import.svg">
        <img v-if="type == 'export'" src="@/assets/svgs/export.svg">
    </button>
</template>

<style>
button.ui-button {
    column-gap: 10px;
    background-color: white;
    line-height: 40px;
    /* margin-left: auto; */
    text-wrap: nowrap;
    cursor: pointer;
}

button.ui-button:hover {
    background: #F5F5F5;
}

button.ui-button:active {
    filter: brightness(0.8);
}

button.ui-button.red {
    border-color: #D90000;
    color: #D90000;
}

button.ui-button.red img {
    filter: invert(7%) sepia(94%) saturate(6443%) hue-rotate(0deg) brightness(115%) contrast(110%);
}

button.ui-button.green {
    border-color: #008A06;
    color: #008A06;
}

button.ui-button.green img {
    filter: invert(31%) sepia(85%) saturate(1108%) hue-rotate(91deg) brightness(98%) contrast(103%);
}
</style>

<script>
export default {
    props: ['type', 'text', 'color', 'tabindex', 'tclass'],
}
</script>