<template>
    <div class="welcome-screen-instance">
        <div class="welcome-controls-box">
            <img class="welcome-controls-box-background-logo" src="@/assets/graphics/logo.svg">
            <div class="welcome-controls">
                <div>
                    <img class="welcome-controls-box-logo" src="@/assets/graphics/logo_text.svg">
                    <p class="wrap">erstellt 2023 für die Schulbibliothek "Martin Benedikter" der Oberschulen
                        Fallmerayer in Brixen</p>
                    <b>Schuljahr auswählen</b>
                    <div class="years-table ui-table">
                        <div class="table-data">
                            <div class="table-row" v-for="year in years">
                                <div class="table-cell" @click="openYear(year)">
                                    <div class="table-cell-centered-content">{{ year }}</div>
                                </div>
                                <div class="table-cell" @click="editYearName(year)">
                                    <img src="@/assets/svgs/edit.svg" class="table-icon">
                                </div>
                                <div class="table-cell" @click="deleteYear(year)">
                                    <img src="@/assets/svgs/trashcan.svg" class="table-icon">
                                </div>
                                <div class="table-cell" @click="exportYear(year)">
                                    <img src="@/assets/svgs/export.svg" class="table-icon">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button class="add-year" tabindex="2" type="add" text="Schuljahr hinzuf&uuml;gen" @click="newYear()" />
            </div>
        </div>
        <div class="bottom-line"></div>
    </div>
    <Modal v-show="modalVisible" :title="modalTitle" :subtitle="modalSubtitle" :textCancel="modalButtonTextCancel"
        :textOK="modalButtonTextOK" @close="handleModalClose" :type="modalType"> {{ modalContent }} </Modal>
</template>

<script>
const { ipcRenderer } = require('electron')
const fs = require('fs');
import Button from '@/components/Button.vue'
import Modal from "@/components/Modal.vue"
import { modalFunctions } from "@/logic/modal.js"
const isDev = require('electron-is-dev')

export default {
    mixins: [modalFunctions],

    components: {
        Button, Modal
    },

    data() {
        return {
            isDev: isDev,
            statistics: {},
            years: ipcRenderer.sendSync("getListOfSchoolYears"),
            version: process.env.VITE_APP_VERSION
        }
    },

    methods: {

        saveFile: function (title, name) {
            let response = ipcRenderer.sendSync("openSaveDialog", { title: title, name: name });
            if (response.filePath) {
                return response.filePath;
            } else if (response.canceled) {
                return false;
            } else {
                this.ask({
                    type: 'alert',
                    subtitle: 'Fehler beim Speichern',
                    content: `Die Datei konnte nicht gespeichert werden. Wenden Sie sich bitte an die Entwickler der App`,
                }, () => { }, () => { });
                return false;
            }
        },

        openYear: function (year) {
            console.log("open year", year);
            ipcRenderer.sendSync("login", year);
            this.$router.push('/students-leaderboard');
        },

        newYear: function () {
            let name = 'NEUER NAME';
            // temporary solution, should be replaced with a modal window
            // text should be filtered for special characters and max length
        },

        editYearName: function (year) {
            let name = 'NEUER NAME';
            // temporary solution, should be replaced with a modal window
            // text should be filtered for special characters and max length
        },

        deleteYear: function (year) {
            this.ask({
                type: 'warning',
                subtitle: 'Schuljahr löschen',
                content: `Sind Sie sicher, dass sie den Schuljahr “${year}” löschen wollen?     ACHTUNG DIESE AKTION KANN NICHT RÜCKGÄNGIG GEMACHT WERDEN!`,
                okButton: 'Löschen',
            }, () => {
                // code to delete year
            }, () => {
                // code if pressed no (leave empty)
            });
        },

        exportYear: function () {
            // save file (use saveFile function)
        }
    },
    mounted: function () { }
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

div.welcome-screen-instance {
    padding: 0;
    height: 100%;
    width: 100%;
    background: url('@/assets/graphics/gradient.png');
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
}

.bottom-line {
    height: 9px;
    width: 100%;
    background: #3F3F3F;
    position: fixed;
    bottom: 0;
    left: 0;
}

.welcome-controls-box {
    display: flex;
    align-items: center;
    height: 50%;
    margin-bottom: 1em;
}

img.welcome-controls-box-background-logo {
    transform: translate(21%, 0);
    height: 80%;
}

img.welcome-controls-box-logo {
    width: 100%;
}

.welcome-controls {
    background: white;
    box-shadow: rgb(0 0 0 / 10%) 0 0 138px;
    border-radius: 12px;
    padding: 50px;
    max-width: 433px;
    z-index: 1;
    transform: translate(-21%, 0);
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 40px;
}

div.ui-table.years-table {
    margin: 1em 0;
    height: unset;
}

div.ui-table.years-table .table-row {
    grid-template-columns: 1fr 21px 21px 21px;
}

.add-year {
    margin-left: auto;
}

@media only screen and (max-width: 1700px) and (max-height: 800px) {
    img.welcome-controls-box-background-logo {
        transform: translate(22%);
        height: 91%;
    }

    .welcome-controls {
        transform: translate(-15%);
    }
}
</style>