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
                            <div class="no-data" v-if="years.length == 0">Keine Schuljahre vorhanden</div>
                            <div class="table-row" v-for="year in years">
                                <div class="table-cell" @click="openYear(year)">
                                    <div class="table-cell-centered-content">{{ year }}</div>
                                </div>
                                <div class="table-cell icon-cell" @click="editYearName(year)">
                                    <img src="@/assets/svgs/edit.svg" class="table-icon">
                                </div>
                                <div class="table-cell icon-cell" @click="deleteYear(year)">
                                    <img src="@/assets/svgs/trashcan.svg" class="table-icon">
                                </div>
                                <div class="table-cell icon-cell" @click="exportYear(year)">
                                    <img src="@/assets/svgs/export.svg" class="table-icon">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hinweise">
                    <p><b>Hinweise:</b></p>
                    <div class="hinweis">
                        <img src="@/assets/svgs/edit.svg" class="table-icon"><span>Zum Berabeiten vom Namen</span>
                        <img src="@/assets/svgs/trashcan.svg" class="table-icon"><span>Zum Löschen</span>
                        <img src="@/assets/svgs/export.svg" class="table-icon"><span>Zum Exportieren</span>
                    </div>
                </div>
                <div class="button-box">
                    <Button class="import-year" tabindex="3" type="import" text="Jahr importieren"
                        @click="importYear()" />
                    <Button class="add-year" tabindex="2" type="add" text="Jahr erstellen" @click="newYear()" />
                </div>
            </div>
        </div>
        <div class="bottom-text"><b>UI, Logik:</b> Serafim Thaler, 5AN&nbsp;&nbsp;&nbsp;<b>Logik, Datenbanken:</b> David
            Mairhofer, 5AT&nbsp;&nbsp;&nbsp;<span style="opacity: 0.5;"><b>Min. Beitr.:</b> Elias Ebner, 5AN</span></div>
        <div class="bottom-line"></div>
    </div>
    <Modal v-show="modalVisible" :title="modalTitle" :subtitle="modalSubtitle" :textCancel="modalButtonTextCancel"
        :textOK="modalButtonTextOK" @close="handleModalClose" :type="modalType"> {{ modalContent }} </Modal>
    <TextInputWindow v-model="modelValue" text="Nachname" v-show="textinputwindowVisible" :title="textinputwindowTitle"
        :textCancel="textinputwindowButtonTextCancel" :textOK="textinputwindowButtonTextOK"
        @close="handleTextinputwindowClose"> {{ textinputwindowContent }} </TextInputWindow>
</template>

<script>
const { ipcRenderer } = require('electron')
const fs = require('fs');
import Button from '@/components/Button.vue'
import Modal from "@/components/Modal.vue"
import TextInputWindow from "@/components/TextInputWindow.vue"
import { modalFunctions } from "@/logic/modal.js"
import { textinputFunctions } from "@/logic/textinputwindow.js"
const isDev = require('electron-is-dev')

export default {
    mixins: [modalFunctions, textinputFunctions],

    components: {
        Button, Modal, TextInputWindow
    },

    data() {
        return {
            isDev: isDev,
            statistics: {},
            years: ipcRenderer.sendSync("getListOfSchoolYears"),
            version: process.env.VITE_APP_VERSION,
            modelValue: ''
        }
    },

    methods: {

        saveFile: function (title, name) {
            let response = ipcRenderer.sendSync("openSaveDialogDB", { title: title, name: name });
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

        openFile: function (title) {
            let response = ipcRenderer.sendSync("openFileDialog", { title: title });
            console.log(response.filePaths[0]);
            if (response.filePaths[0]) {
                return response.filePaths[0];
            } else if (response.canceled) {
                return false;
            } else {
                this.ask({
                    type: 'alert',
                    subtitle: 'Fehler beim Öffnen',
                    content: `Die Datei konnte nicht geöffnet werden. Wenden Sie sich bitte an die Entwickler der App`,
                }, () => { }, () => { });
                return false;
            }
        },

        openYear: function (year) {
            console.log("open year", year);
            if (ipcRenderer.sendSync("login", year)) {
                ipcRenderer.send("changeTitleYear", year)
                this.$router.push('/students-leaderboard');
            }
        },

        newYear: function () {
            this.guiTextInput({
                type: 'input',
                content: `Geben Sie den Namen für das neue Schuljahr ein:`,
                okButton: 'Hinzufügen'
            }, () => {
                // code if entered string
                console.log('Got: ' + this.modelValue);
                // this.modelValue is already filtered for special characters and max length
                if (ipcRenderer.sendSync("login", this.modelValue)) {
                    ipcRenderer.send("changeTitleYear", this.modelValue)
                    this.$router.push('/students-leaderboard');
                }
            }, () => {
                // code if abort
            });
        },

        importYear: function () {
            // open file and save it to the database files folder
            let filepath = this.openFile("Schuljahr importieren");
            console.log('trying to import year', filepath);
            if (filepath) {
                console.log('trying to import year', filepath);
                ipcRenderer.sendSync("importYear", filepath);
                window.history.go()
            }
        },

        editYearName: function (year) {
            this.guiTextInput({
                type: 'input',
                content: `Geben Sie den neuen Namen für das Schuljahr “${year}” ein:`,
                okButton: 'Name ändern'
            }, () => {
                // code if entered string
                console.log('Got: ' + this.modelValue);

                // this.modelValue is already filtered for special characters and max length
                // code to change year name:
                ipcRenderer.sendSync("editYearName", { oldName: year, newName: this.modelValue });
                window.history.go()
            }, () => {
                // code if abort
            });
        },

        deleteYear: function (year) {
            this.ask({
                type: 'warning',
                subtitle: 'Schuljahr löschen',
                content: `Sind Sie sicher, dass Sie das Schuljahr “${year}” löschen wollen?     !!!ACHTUNG DIESE AKTION KANN NICHT RÜCKGÄNGIG GEMACHT WERDEN!!!`,
                okButton: 'Löschen',
            }, () => {
                // code to delete year
                if (ipcRenderer.sendSync("deleteYear", year)) {
                    this.ask({
                        type: 'alert',
                        subtitle: 'Schuljahr gelöscht',
                        content: `Das Schuljahr “${year}” wurde erfolgreich gelöscht`,
                    }, () => { }, () => { });
                    window.history.go()
                } else {
                    this.ask({
                        type: 'alert',
                        subtitle: 'Fehler beim Löschen',
                        content: `Das Schuljahr konnte nicht gelöscht werden. Wenden Sie sich bitte an die Entwickler der App`,
                    }, () => { }, () => { });
                }
            }, () => {
                // code if pressed no (leave empty)
            });
        },

        exportYear: function (year) {
            // save file (use saveFile function)
            let path = this.saveFile("Schuljahr exportieren", `Schuljahr ${year}.db`);
            if (path) {
                ipcRenderer.sendSync("exportYear", { year: year, path: path });
            }
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
    height: 60%;
    margin-bottom: 1em;
}

.button-box {
    display: flex;
    gap: 1em;
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
    max-width: 500px;
    z-index: 1;
    transform: translate(-21%, 0);
    height: 100%;
    display: grid;
    grid-template-rows: 1fr auto 40px;
}

div.ui-table.years-table {
    margin: 1em 0;
    height: unset;
    height: 18vh;
    overflow-y: auto;
}

div.ui-table.years-table .table-row {
    grid-template-columns: 1fr 21px 21px 21px;
}

.import-year {
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

    .welcome-controls-box {
        margin-bottom: 3em;
    }

    .hinweise {
        display: none;
    }

    div.ui-table.years-table {
        height: 26vh;
    }

    html body div.years-table img.table-icon {
        height: 1.1em;
        vertical-align: middle;
    }

    .bottom-text {
        transform: scale(0.9);
    }

    .welcome-controls-box {
        height: 57%;
    }
}

.bottom-text {
    position: absolute;
    bottom: 4em;
}

.hinweis {
    display: grid;
    grid-template-columns: 30px 1fr;
    margin-bottom: 1em;
    gap: 2px 0;
}

.icon-cell:hover {
    transform: scale(1.1);
}
</style>