<template>
    <div id="titleBarContainer">
        <div id="titleBar">
            <!-- <div v-on:mouseover="showHistoryPopup = true;" v-on:mouseleave="showHistoryPopup = false;">
                <button id="returnButton">
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="29" height="29" rx="9" fill="#3F3F3F" />
                        <path
                            d="M5 12.7483L17 12.7483C20.3137 12.7483 23 15.4346 23 18.7483L23 22M5 12.7483L10.4 7M5 12.7483L10.4 18.5646"
                            stroke="#D9D9D9" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </button>
                <HistoryPopup v-if="showHistoryPopup == true" />
            </div> -->
            <div id="app-title-draggable-bar">
                <div id="app-title">Lesepreis Verwaltung {{ version }}</div>
            </div>
            <button v-if="isDev" id="devToolsButton">
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="29" height="29" rx="9" fill="#3F3F3F" />
                    <path d="M19 10L23 15L19 20" stroke="#D9D9D9" stroke-width="2" stroke-linecap="round" />
                    <path d="M11 10L7 15L11 20" stroke="#D9D9D9" stroke-width="2" stroke-linecap="round" />
                </svg>
            </button>
            <button id="minimizeButton">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="29" height="29" rx="9" fill="#3F3F3F" />
                    <path d="M8 15H22" stroke="#D9D9D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
            <button id="maximizeRestoreButton">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="29" height="29" rx="9" fill="#3F3F3F" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7 9C5.89543 9 5 9.89543 5 11V23C5 24.1046 5.89543 25 7 25H19C20.1046 25 21 24.1046 21 23V11C21 9.89543 20.1046 9 19 9H7ZM8 11C7.44772 11 7 11.4477 7 12V22C7 22.5523 7.44772 23 8 23H18C18.5523 23 19 22.5523 19 22V12C19 11.4477 18.5523 11 18 11H8Z"
                        fill="#D9D9D9" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M9 7C9 5.89543 9.89539 5 11 5H23C24.1046 5 25 5.89543 25 7V19C25 20.1046 24.1046 21 23 21H22V19C22.5522 19 23 18.5523 23 18V8C23 7.44772 22.5522 7 22 7H12C11.4478 7 11 7.44772 11 8H9V7Z"
                        fill="#D9D9D9" />
                </svg>
            </button>
            <button id="closeButton">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M9.5 0.5C4.52942 0.5 0.5 4.52944 0.5 9.5V20.5C0.5 25.4706 4.52942 29.5 9.5 29.5H20.5C25.4706 29.5 29.5 25.4706 29.5 20.5V9.5C29.5 4.52944 25.4706 0.5 20.5 0.5H9.5ZM21.7072 21.7071C21.3167 22.0976 20.6835 22.0976 20.293 21.7071L15 16.4142L9.70715 21.7071C9.31665 22.0976 8.68347 22.0976 8.29297 21.7071C7.90234 21.3166 7.90234 20.6834 8.29297 20.2929L13.5858 15L8.29297 9.70711C7.90234 9.31658 7.90234 8.68342 8.29297 8.29289C8.68347 7.90237 9.31665 7.90237 9.70715 8.29289L15 13.5858L20.293 8.29289C20.6835 7.90237 21.3167 7.90237 21.7072 8.29289C22.0977 8.68342 22.0977 9.31658 21.7072 9.70711L16.4142 15L21.7072 20.2929C22.0977 20.6834 22.0977 21.3166 21.7072 21.7071Z"
                        fill="#D9D9D9" />
                </svg>

            </button>
        </div>
    </div>
</template>

<script>
const isDev = require('electron-is-dev')
import HistoryPopup from '@/components/HistoryPopup.vue'

export default {
    components: {
        HistoryPopup
    },

    data() {
        return {
            showHistoryPopup: false,
            version: process.env.VITE_APP_VERSION,
            isDev: isDev
        }
    }
}


</script>

<style>
div#app {
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template-rows: 44px 1fr;
}

div#root {
    height: 100%;
    overflow: hidden;
}

div#titleBarContainer {
    width: 100%;
    height: 44px;
    background-color: #3F3F3F;
    /* position: fixed; <-- breaks the layout */
    top: 0;
    z-index: 1;
}

div#titleBar {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 4px;
    justify-content: flex-end;
}

div#titleBar:after,
div#titleBar:before {
    content: "";
}

div#app-title-draggable-bar {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    -webkit-app-region: drag;
}

div#app-title {
    font-family: 'Open Sans';
    font-size: 20px;
    color: #D9D9D9;
    margin-right: auto;
    -webkit-user-select: none;
    user-select: none;
    text-align: center;
    position: fixed;
    left: calc(50% - 115px);
}

div#titleBar button {
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    height: 37px;
    width: 37px;
    border-radius: 9px;
    background-color: #3F3F3F;
    display: flex;
    justify-content: center;
    align-items: center;
}

div#titleBar button#closeButton,
div#titleBar button#maximizeRestoreButton {
    margin-left: 7px;
}

div#titleBar button:hover {
    filter: brightness(2);
}

div#titleBar svg {
    height: 26px;
    width: 26px;
}
</style>
