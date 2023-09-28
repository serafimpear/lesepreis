<template>
    <div class="input-field disabled">
        <div class="input-field-text">{{ text }}</div>
        <div class="input-field-field ui-styled multiplication-boolean-show">
            {{ value }}&nbsp;
            <img src="@/assets/svgs/icon-yes.svg" class="inline-icon" v-if="img == true">
            <img src="@/assets/svgs/icon-no.svg" class="inline-icon" v-else>
        </div>
    </div>
</template>

<script>
export default {
    props: ['text', 'img', 'value'],
}
</script>

<style>
img.inline-icon {
    height: 1.33em;
    width: auto;
    margin-bottom: -0.11em;
}
</style>