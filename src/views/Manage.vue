
<template>
    <div>
        <h3>Rangliste der Schüler</h3>
        <Button style="margin: 25px" text="Herunterladen"
            @click="createStudentsLeaderboard(saveFile('Rangliste der Schüler speichern', `Rangliste der Schüler ${(new Date()).toLocaleDateString('de-DE')}`))" />
    </div>
    <div>
        <h3>Rangliste der Bücher</h3>
        <Button style="margin: 25px" text="Herunterladen"
            @click="createBooksLeaderboard(saveFile('Rangliste der Bücher speichern', `Rangliste der Bücher ${(new Date()).toLocaleDateString('de-DE')}`))" />
    </div>

    <Modal v-show="modalVisible" :title="modalTitle" :subtitle="modalSubtitle" :textCancel="modalButtonTextCancel"
        :textOK="modalButtonTextOK" @close="handleModalClose" :type="modalType"> {{ modalContent }} </Modal>
</template>

<script>
const pdf = require('pdf-creator-node');
const fs = require('fs');
const { ipcRenderer } = require('electron')
import Button from '@/components/Button.vue'
import Modal from "@/components/Modal.vue"
import { modalFunctions } from "@/logic/modal.js"
import pdfTemplate from '@/assets/pdfExport/pdfExport.js'

export default {
    mixins: [modalFunctions, pdfTemplate],

    components: {
        Button, Modal
    },

    data() {
        return {
            students: ipcRenderer.sendSync('getStudentsSorted'),
        }
    },

    methods: {
        createStudentsLeaderboard: function (pathToSave) {
            if (!pathToSave) return;
            let users = [];
            let sum = 0;
            this.students.forEach(student => {
                sum += student.points;
            });
            for (let i = 0; i < Math.min(25, this.students.length); i++) {
                this.students[i].rank = i;
                users.push(this.students[i]);
            }

            var options = {
                format: "A4",
                orientation: "portrait",
                border: "5mm",
            };
            const doc = {
                html: this.pdfTemplate, // <-- changed, now with 'import'
                data: {
                    users: users,
                    sum: sum,
                    date: (new Date()).toLocaleDateString('de-DE'),
                    year: "2023/24"
                },
                path: pathToSave,
                type: '',
            }
            pdf.create(doc, options).then((res) => {
                ipcRenderer.send("openFile", pathToSave);
            }).catch((error) => {
                 throw (error);
            });
        },

        createBooksLeaderboard: function (pathToSave) {
            if (!pathToSave) return;
            // save...
        },

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
        }
    },
}



</script>

<style scoped>
    div {
        margin: 30px;
    }
</style>