<template>
    <div :class="`input-field disabled`">
        <div class="input-field-text">{{ text }}</div>
        <div :class="`input-field-field ui-styled twonumber`">
            <div class="input-field-twonumber-number1">{{ value1 }}</div>
            <div class="input-field-twonumber-breakline">/</div>
            <div class="input-field-twonumber-number2">{{ value2 }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['text', 'disabled', 'value1', 'value2']
}
</script>

<style>
div.input-field .input-field-field.twonumber {
    width: 80px;
    display: flex;
    justify-content: space-between;
    column-gap: 2px;
}

div.input-field-twonumber-number1 {
    color: #008a06;
}

div.input-field-twonumber-number2 {
    color: #d90000;
}
</style>