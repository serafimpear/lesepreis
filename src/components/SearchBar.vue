<template>
    <div class="search ui-styled">
        <img src="@/assets/svgs/search-icon.svg" class="search-icon">
        <input :tabindex=tabindex @input="$emit('update:modelValue', $event.target.value)" type="text" :placeholder=placeholder class="ui-search-input">
    </div>
</template>

<script>
export default {
  props: ['modelValue', 'placeholder', 'tabindex'],
  emits: ['update:modelValue']
}
</script>

<style>
div.search {
    width: 100%;
    column-gap: 10px;
}

div.search img.search-icon {
    display: inline-block;
}

div.search input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 18px;
    background: transparent;
}

div.search:hover {
    background: #F5F5F5;
    border-width: 2px;
}

div.search:has(input:focus) {
    background: #F5F5F5;
    border-width: 2px;
}
</style>