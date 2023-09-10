<template>
    <transition name="modal-fade">
        <div class="modal-background">
            <div class="modal-window" role="dialog">
                <div class="modal-title">
                    <div class="modal-icon">
                        <img src="@/assets/svgs/icon-warning.svg">
                    </div>
                    <div class="modal-title-title">{{ title }}</div>
                    <div class="modal-subtitle">{{ subtitle }}</div>
                </div>
                <div class="modal-content">
                    <slot></slot>
                </div>
                <div class="modal-buttons">
                    <Button :text=textCancel @click="close(false)" />
                    <Button v-if="textOK != false" :text=textOK color="red" @click="close(true)" />
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

    props: ['title', 'subtitle', 'content', 'textCancel', 'textOK'],

    methods: {
        close(result) {
            this.$emit("close", result); // Emit the "close" event with the result
        },
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
    color: #d90000;
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

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity .3s ease;
}
</style>