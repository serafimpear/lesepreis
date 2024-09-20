<template>
    <transition name="fade">
        <div class="modal-background">
            <div class="modal-window" role="dialog">
                <div class="modal-title">
                    <div class="modal-icon">
                        <img src="@/assets/svgs/icon-warning-blue.svg">
                    </div>
                    <div class="modal-title-title">{{ title }}</div>
                </div>
                <div class="modal-content">
                    <p>
                        <slot></slot>
                    </p>
                    <!-- <br> -->
                    <div class="input-field-field ui-styled">
                        <input type="text" placeholder="..." id="textinpuwindow-input" v-model="modelValue"
                            @input="onInput"
                            maxlength="50" ref="inputField">
                    </div>
                </div>
                <div class="modal-buttons">
                    <Button text="Abbrechen" @click="close(false)" />
                    <Button v-if="textOK != false && (typeof modelValue == 'string' && modelValue.trim() != '')" :text=textOK
                        color="red" @click="close(modelValue)" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Button from "@/components/Button.vue"

export default {
    components: {
        Button
    },

    props: ['title', 'content', 'textCancel', 'textOK'],

    emits: [
        'update:modelValue'
    ],

    methods: {
        close(result) {
            this.modelValue = '';
            this.$emit("close", result); // Emit the "close" event with the result
        },

        onInput(event) {
            // Directly get the input field reference
            const inputField = this.$refs.inputField;
            const rawValue = inputField.value;

            // Sanitize the value
            const sanitizedValue = rawValue.replace(/[^\w\-. ]/g, '');

            // If the sanitized value is different, update the input and emit the sanitized value
            if (sanitizedValue !== rawValue) {
                inputField.value = sanitizedValue;
            }

            this.$emit('update:modelValue', sanitizedValue);
        }
    },
}
</script>

<style>
.modal-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #0003;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-window {
    width: 37em;
    border-radius: 12px;
    box-shadow: 0 0 80px 15px #0003;
    padding: 2.5em;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 27px 1fr 39px;
    gap: 28px;
    background: white;
}

.modal-window .modal-title {
    display: flex;
    flex-direction: row;
    column-gap: 0.6em;
    align-items: self-end;
}

.modal-window .modal-title .modal-title-title {
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
}

.modal-window .modal-title .modal-title-title.warning {
    color: #d90000;
}

.modal-window .modal-title .modal-title-title.alert {
    color: #005AC3;
}

.modal-window .modal-title .modal-subtitle {
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
}

.modal-window .modal-icon img {
    height: 22px;
    width: auto;
}

.modal-window .modal-content {
    width: 100%;
    overflow: hidden;
    text-wrap: wrap;
    white-space: pre-wrap;
}

.modal-window .modal-content p {
    white-space: pre-wrap;
}

.modal-window .modal-buttons button {
    margin-left: unset;
}

.modal-window .modal-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    column-gap: 17px;
}
</style>