<template>
    <div class="search ui-styled">
        <img src="@/assets/svgs/search-icon.svg" class="search-icon">
        <input @input="$emit('update:modelValue', $event.target.value)" type="text" :placeholder=placeholder>
    </div>
</template>

<script>
export default {
  props: ['modelValue', 'placeholder'],
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
}
</style>