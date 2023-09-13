<template>
    <label :class="['container', color + '-container']">{{ text }}
        <input :id=inputid type="radio" name="radio" :checked=checked>
        <span :class="['checkmark', color + '-checkmark']"></span>
    </label>
</template>

<script>
export default {
    data() {
        return {

        }
    },

    props: ['text', 'color', 'inputid', 'checked'],
}
</script>

<style scoped>
.container {
    display: block;
    position: relative;
    padding-left: 1.5em;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: 1em;
    font-style: normal;
    font-weight: 300
}

.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer
}

.checkmark {
    position: absolute;
    bottom: 0.13em;
    left: 0;
    height: 1em;
    width: 1em;
    background-color: transparent;
    border-radius: 50%;
}

.red-checkmark {
    border: 1px solid #C30000;
}

.green-checkmark {
    border: 1px solid #008A05;
}

.green-container {
    color: #008A05;
}

.red-container {
    color: #C30000;
}

.container:hover input~.checkmark {
    background-color: #eee
}

.container input:checked~.checkmark {
    background-color: transparent
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none
}

.container input:checked~.checkmark:after {
    display: block
}

.container .checkmark:after {
    top: 3px;
    left: 3px;
    height: 64%;
    width: 63%;
    border-radius: 50%;
}

.container .checkmark.red-checkmark:after {
    background: red;
}

.container .checkmark.green-checkmark:after {
    background: #008A05;
}
</style>