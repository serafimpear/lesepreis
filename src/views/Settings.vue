<template>
    <main>
        <div class="manage-section">
            <h1>Einstellungen</h1>
            <InputField v-model="googleAPIKey" text="Google API Key"
                        :value="googleAPIKey" />
            <Button style="margin-left:auto;margin-top:10px" type="yes" text="Speichern" color="green" @click="setAPIKey()" />
        </div>
        <div>&nbsp;</div>
        <div></div>
    </main>
    <Modal v-show="modalVisible" :title="modalTitle" :subtitle="modalSubtitle" :textCancel="modalButtonTextCancel"
        :textOK="modalButtonTextOK" @close="handleModalClose" :type="modalType"> {{ modalContent }} </Modal>
</template>

<script>
const { ipcRenderer } = require('electron')
const fs = require('fs');
import Button from '@/components/Button.vue'
import Modal from "@/components/Modal.vue"
import { modalFunctions } from "@/logic/modal.js"
import StudentsPdfTemplate from '@/assets/pdfExport/StudentsPdfExport.js'
import BooksPdfTemplate from '@/assets/pdfExport/BooksPdfExport.js'
import InputField from "@/components/InputField.vue"
var Handlebars = require("handlebars");
const isDev = require('electron-is-dev')

export default {
    mixins: [modalFunctions, StudentsPdfTemplate, BooksPdfTemplate],

    components: {
        Button, Modal, InputField
    },

    data() {
        return {
            isDev: isDev,
            statistics: {},
            version: process.env.VITE_APP_VERSION,
            googleAPIKey: ipcRenderer.sendSync('getApiKey'),
        }
    },

    methods: {
        setAPIKey: function() {
            ipcRenderer.send('setApiKey', this.googleAPIKey);
        },
    }
}

</script>

<style>
.text-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 1em;
    margin: 1em 0;
    font-size: 18px;
}

.statistics-block {
    font-size: 18px;
}

.export-inline-icon {
    height: 1.8em;
    vertical-align: -0.5em;
}
</style>