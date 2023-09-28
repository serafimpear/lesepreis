<template>
    <main>
        <div class="manage-section">
            <h1>Daten exportieren</h1>
            <!-- <div style="font-size: 16px; font-style: normal; font-weight: 300;">Hier können Sie Daten vom
                Programm verwalten, z.B. Ranglisten exportieren</div><br> -->
            <div class="ui-infobox">
                <div style="font-size: 16px;"><b>Hinweis:</b> die Rangliste wird als HTML-Datei gespeichert.<br>
                <b>In Zukunft wird diese Funktion durch einen PDF-Export ersetzt</b></div>
            </div>
            <div class="text-button">
                <div>HTML-Rangliste der Schüler (Top 25)</div>
                <Button text="Speichern"
                    @click="createStudentsLeaderboard(saveFile('Rangliste der Schüler speichern', `Rangliste der Schüler ${(new Date()).toLocaleDateString('de-DE')}`))" />
            </div>
            <!-- <div>
            <h3>Rangliste der Bücher</h3>
            <Button style="margin: 25px" text="Herunterladen"
                @click="createBooksLeaderboard(saveFile('Rangliste der Bücher speichern', `Rangliste der Bücher ${(new Date()).toLocaleDateString('de-DE')}`))" />
        </div> -->
        </div>
        <div class="statistics-section">
            <h1>Statistik</h1>
        </div>
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
import pdfTemplate from '@/assets/pdfExport/pdfExport.js'
var Handlebars = require("handlebars");

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
        compilePDF: function (document, options, pathToSave) {
            Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
                switch (operator) {
                    case "==":
                        return v1 == v2 ? options.fn(this) : options.inverse(this);
                    case "===":
                        return v1 === v2 ? options.fn(this) : options.inverse(this);
                    case "!=":
                        return v1 != v2 ? options.fn(this) : options.inverse(this);
                    case "!==":
                        return v1 !== v2 ? options.fn(this) : options.inverse(this);
                    case "<":
                        return v1 < v2 ? options.fn(this) : options.inverse(this);
                    case "<=":
                        return v1 <= v2 ? options.fn(this) : options.inverse(this);
                    case ">":
                        return v1 > v2 ? options.fn(this) : options.inverse(this);
                    case ">=":
                        return v1 >= v2 ? options.fn(this) : options.inverse(this);
                    case "&&":
                        return v1 && v2 ? options.fn(this) : options.inverse(this);
                    case "||":
                        return v1 || v2 ? options.fn(this) : options.inverse(this);
                    default:
                        return options.inverse(this);
                }
            });

            return new Promise((resolve, reject) => {
                if (!document || !document.html || !document.data) {
                    reject(new Error("Some, or all, options are missing."));
                }
                // Compiles a template
                var html = Handlebars.compile(document.html)(document.data);

                fs.writeFile(pathToSave, html, (err) => {
                    if (err) {
                        console.error('Error saving HTML file:', err);
                    } else {
                        console.log('HTML file saved successfully!');
                    }
                });

                return;
                (async () => {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.setContent(html, { waitUntil: 'domcontentloaded' });
                    // await page.addStyleTag({content: '.body{background: red}'})
                    await page.addStyleTag({
                        content: `body {
                            background: red !important;
                        }`,
                    });
                    console.log(page);
                    await page.emulateMediaType('screen');
                    await page.pdf({
                        path: pathToSave,
                        format: 'A4',
                        margin: {
                            top: "20px",
                            left: "20px",
                            right: "20px",
                            bottom: "20px"
                        }
                    });
                    await browser.close();
                })();
            });

        },

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
                width: "210mm",
                height: "297mm",
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
                type: '',
            }
            if (this.compilePDF(doc, options, pathToSave)) {
                ipcRenderer.send("openFile", pathToSave);
            }
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

<style>
.text-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 1em;
    margin: 1em 0;
    font-size: 18px;
}</style>