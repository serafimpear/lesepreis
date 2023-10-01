<template>
    <main>
        <div class="manage-section">
            <h1>Daten exportieren</h1>
            <!-- <div style="font-size: 16px; font-style: normal; font-weight: 300;">Hier können Sie Daten vom
                Programm verwalten, z.B. Ranglisten exportieren</div><br> -->
            <div class="ui-infobox">
                <div style="font-size: 16px;"><b>Hinweis:</b> die Rangliste wird als HTML-Datei gespeichert.<br>
                    <b>In Zukunft wird diese Funktion durch einen PDF-Export ersetzt</b>
                </div>
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
        <div>&nbsp;</div>
        <div class="statistics-section" v-if="isDev">
            <h1>Statistik</h1>
            <div class="statistics-block">
                <b>Insgesamt Schüler:</b> {{ this.statistics.totalStudents }}
                <p class="indented">
                    Qualifiziert: {{ this.statistics.qualifiedStudents }} <br>
                </p>

                <b>Insgesamt Bücher:</b> {{ 1 }}
                <p class="indented">
                    Deutsche: {{ 1 }} <br>
                    Italienische: {{ 1 }} <br>
                    Englische: {{ 1 }} <br>
                    Französische: {{ 1 }} <br>
                    Russische: {{ 1 }}
                </p>
                <p class="indented">
                    <b>Gelesen:</b> {{ 1 }}
                </p>

                <b>Insgesamt haben Teilnehmer:</b>
                <p class="indented">
                    {{ this.statistics.readBooks }} Mal Bücher gelesen<br>
                    {{ this.statistics.multiplied }} Mal multipliziert
                </p>
            </div>
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
const isDev = require('electron-is-dev')

export default {
    mixins: [modalFunctions, pdfTemplate],

    components: {
        Button, Modal
    },

    data() {
        return {
            students: ipcRenderer.sendSync('getStudentsSorted'),
            isDev: isDev,
            statistics: {},
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
    mounted: function() {
        this.statistics = {
            totalStudents: 0,
            qualifiedStudents: 0,
            multiplied: 0,
            readBooks: 0,
        }
        this.students.forEach((student) => {
            this.statistics.totalStudents++;
            if(student.multiplied_books.length == 2) {
                this.statistics.multiplied++;
            }
            if(student.books.length >= 3) {
                this.statistics.qualifiedStudents++;
            }
            this.statistics.readBooks += student.books.length;
        });
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
</style>