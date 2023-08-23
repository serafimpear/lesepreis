<template>
    <div :class="`input-field ${disabled}`">
        <div class="input-field-text">{{ text }}</div>
        <div :class="`input-field-field ui-styled  ${number}`">
            <input v-if="(typeof value !== undefined)" type="text" placeholder="..." :name="`${variable}`" :value="`${value}`">
            <input v-else type="text" placeholder="..." :name="`${variable}`">
        </div>
    </div>
</template>

<script>
export default {
    props: ['text', 'variable', 'disabled', 'number', 'value'],
}
</script>

<style>
div.input-field {
    display: grid;
    gap: 20px;
    grid-template-columns: auto 1fr;
    font-size: 18px;
    text-wrap: nowrap;
}

div.input-field .input-field-text {
    font-weight: 600;
    display: flex;
    align-items: center;
}

div.input-field .input-field-field {
    /*width: 100%;*/
}

div.input-field .input-field-field.number {
    width: 67px;
}

div.input-field.disabled .input-field-field {
    border: 1px dotted black;
}

div.input-field input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 18px;
}
</style>