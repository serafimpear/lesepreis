<template>
    <div :class="`input-field ${disabled}`">
        <div class="input-field-text">{{ text }}</div>
        <div :class="`input-field-field ui-styled  ${number}`">
            <input :tabindex=tabindex :disabled="disabled" @input="$emit('update:modelValue', $event.target.value)"
                v-if="number == 'positivnumber'" type="number" placeholder="..." min="0"
                oninput="validity.valid||(value='');" :name="`${variable}`" :value="`${value}`">

            <input :tabindex=tabindex :disabled="disabled" @input="this.value = $event.target.value; $emit('update:modelValue', cAsNumber);"
                v-else-if="type == 'date'" type="date" :value="`${new Date().toISOString().split('T')[0]}`">

            <input :tabindex=tabindex :disabled="disabled" @input="$emit('update:modelValue', $event.target.value)"
                v-else-if="(typeof value !== undefined)" type="text" placeholder="..." :name="`${variable}`"
                :value="`${value}`"
                oninput="this.value = this.value.replaceAll('\u0022', '').replaceAll('\'', '').replaceAll('`', '')">

            <input :tabindex=tabindex :disabled="disabled" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)" v-else type="text" placeholder="..."
                :name="`${variable}`"
                oninput="this.value = this.value.replaceAll('\u0022', '').replaceAll('\'', '').replaceAll('`', '')">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            languages: [
                'Deutsch',
                'Italienisch',
                'Englisch',
                'Französisch',
                'Russisch',
                'Ladinisch',
                'Spanisch',
                'Latein',
            ]
        }
    },

    props: [
        'text', 'variable', 'disabled', 'number', 'value', 'tabindex', 'type'
    ],

    emits: [
        'update:modelValue'
    ],

    methods: {
        search(event) {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.languages = [...this.languages];
                } else {
                    this.languages = this.languages.filter((language) => {
                        return language.toLowerCase().startsWith(event.query.toLowerCase());
                    });
                }
            }, 250);
        }
    }
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
    background: transparent;
}

div.input-field-field:hover {
    background: #F5F5F5;
    border-width: 2px;
}

div.input-field-field:has(input:focus) {
    background: #F5F5F5;
    border-width: 2px;
}
</style>