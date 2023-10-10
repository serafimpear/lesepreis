<template>
    <div :class="`input-field ${disabled}`">
        <div class="input-field-text">{{ text }}</div>
        <div :class="`input-field-field ui-styled ${number}`">
            <input :tabindex="tabindex" :disabled="disabled" v-model="selectedDate" type="date" />
        </div>
    </div>
</template>

<script>
export default {
    props: ['text', 'disabled', 'tabindex'],

    data() {
        return {
            selectedDate: new Date().toISOString().split('T')[0],
        };
    },

    watch: {
        selectedDate(newDate) {
            this.$emit('update:modelValue', new Date(newDate).getTime());
        },
    },
    
    emits: ['update:modelValue'],
};
</script>

<style></style>