<template>
    <main>
        <div class="manage-section">
            <h1>Ranglisten drucken</h1>
            <!-- <div style="font-size: 16px; font-style: normal; font-weight: 300;">Hier können Sie Daten vom
                Programm verwalten, z.B. Ranglisten exportieren</div><br> -->
            <div class="ui-infobox">
                <div style="font-size: 16px;"><b>Hinweis:</b> die Rangliste wird als HTML-Datei gespeichert.<br>
                    <b>In Zukunft wird diese Funktion durch einen PDF-Export ersetzt</b>
                </div>
            </div>
            <div class="text-button">
                <div>Rangliste der Schüler <img class="export-inline-icon" src="@/assets/svgs/icon-people-group.svg">
                </div>
                <Button text="Exportieren"
                    @click="createStudentsLeaderboard(saveFile('Rangliste der Schüler speichern', `Rangliste der Schüler ${(new Date()).toLocaleDateString('de-DE')}`))" />
            </div>
            <div class="text-button">
                <div>Rangliste der Bücher <img class="export-inline-icon" src="@/assets/svgs/icon-books.svg"></div>
                <Button text="Exportieren"
                    @click="createBooksLeaderboard(saveFile('Rangliste der Bücher speichern', `Rangliste der Bücher ${(new Date()).toLocaleDateString('de-DE')}`))" />
            </div>
            <br>
            <h1>Daten exportieren</h1>
            <div class="text-button">
                <div>Ungelesene Bücher exportieren</div>
                <Button type="export" text="Exportieren" @click="exportUnreadBooks()" />
            </div>

            <h1>Daten importieren</h1>
            <div class="text-button">
                <div>Ungelesene Bücher importieren</div>
                <Button type="import" text="Importieren" @click="importUnreadBooks()" />
            </div>
            <!-- <div>
            <h3>Rangliste der Bücher</h3>
            <Button style="margin: 25px" text="Herunterladen"
                @click="createBooksLeaderboard(saveFile('Rangliste der Bücher speichern', `Rangliste der Bücher ${(new Date()).toLocaleDateString('de-DE')}`))" />
        </div> -->
        </div>
        <div class="vertical-line">&nbsp;</div>
        <div class="statistics-section">
            <h1>Statistik</h1>
            <div class="statistics-block">
                <b>Insgesamt Schüler:</b> <span class="fw-400">{{ this.statistics.totalStudents }}</span>
                <p class="indented">
                    Qualifiziert: <span class="fw-400">{{ this.statistics.qualifiedStudents }}</span> <br>
                </p>

                <b>Insgesamt Bücher:</b> <span class="fw-400">{{ this.statistics.books }}</span>
                <p class="indented">
                    Deutsche: <span class="fw-400">{{ this.statistics.germanBooks }}</span> <br>
                    Italienische: <span class="fw-400">{{ this.statistics.italianBooks }}</span> <br>
                    Englische: <span class="fw-400">{{ this.statistics.englishBooks }}</span> <br>
                    Französische: <span class="fw-400">{{ this.statistics.frenchBooks }}</span> <br>
                    Russische: <span class="fw-400">{{ this.statistics.russianBooks }}</span>
                </p>
                <!--p class="indented">
                    <b>Gelesen:</b> {{ 1 }}
                </p-->

                <b>Insgesamt haben Teilnehmer:</b>
                <p class="indented">
                    <span class="fw-400">{{ this.statistics.readBooks }}</span> Mal Bücher gelesen<br>
                    <span class="fw-400">{{ this.statistics.multiplied }}</span> Mal multipliziert
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
import StudentsPdfTemplate from '@/assets/pdfExport/StudentsPdfExport.js'
import BooksPdfTemplate from '@/assets/pdfExport/BooksPdfExport.js'
var Handlebars = require("handlebars");
const isDev = require('electron-is-dev')
const schoolYear = localStorage.getItem('schoolYear')

export default {
    mixins: [modalFunctions, StudentsPdfTemplate, BooksPdfTemplate],

    components: {
        Button, Modal
    },

    data() {
        return {
            students: ipcRenderer.sendSync('DBQuery',
                // `SELECT SUM(b.points) as points,
                // COUNT(b.id) as book_count, 
                // COUNT(CASE WHEN sb.passed = true THEN sb.book_id END) AS passed_count, s.* 
                // FROM students as s 
                // LEFT JOIN student_books as sb ON s.uid = sb.uid 
                // LEFT JOIN books as b ON sb.book_id = b.id
                // GROUP BY s.uid 
                // ORDER BY points DESC;`
`SELECT 
    COUNT(b.id) AS book_count,
    COUNT(CASE WHEN sb.passed = true THEN sb.book_id END) AS passed_count,
    s.*,
    CASE WHEN COUNT(CASE WHEN sb.passed = true THEN sb.book_id END) > 2 THEN TRUE ELSE FALSE END AS passed,
    COALESCE(
        CASE 
            WHEN s.multiplied_book_1 = -1 OR s.multiplied_book_2 = -1 THEN 0 
            ELSE COALESCE(mb1.points, 0) * COALESCE(mb2.points, 0) 
        END + SUM(CASE WHEN sb.passed = true THEN COALESCE(b.points, 0) ELSE 0 END), 
        0
    ) AS points

FROM students AS s
LEFT JOIN books AS mb1 ON s.multiplied_book_1 = mb1.id
LEFT JOIN books AS mb2 ON s.multiplied_book_2 = mb2.id
LEFT JOIN student_books AS sb ON s.uid = sb.uid
LEFT JOIN books AS b ON sb.book_id = b.id
GROUP BY s.uid
ORDER BY points DESC;`
            ),
            books: ipcRenderer.sendSync('DBQuery', 'SELECT b.*, COUNT(sb.uid) as read_count FROM books as b LEFT JOIN student_books as sb on b.id = sb.book_id ' +
                'GROUP BY b.id ORDER BY read_count DESC'),
            isDev: isDev,
            statistics: {},
            version: process.env.VITE_APP_VERSION,
            schoolYear: schoolYear
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

        createStudentsLeaderboard: function (pathToSave, count) {
            if (!pathToSave) return;

            let sum = 0;
            this.students.forEach(student => {
                sum += student.points;
            });

            var options = {
                width: "210mm",
                height: "297mm",
                orientation: "portrait",
                border: "5mm",
            };
            console.log(this.students);
            const doc = {
                html: this.StudentsPdfTemplate, // <-- changed, now with 'import'
                data: {
                    users: this.students,
                    sum: sum,
                    date: (new Date()).toLocaleDateString('de-DE'),
                    year: this.schoolYear,
                    version: "v" + this.version
                },
                type: '',
            }
            if (this.compilePDF(doc, options, pathToSave)) {
                ipcRenderer.send("openFile", pathToSave);
            }
        },

        createBooksLeaderboard: function (pathToSave) {
            if (!pathToSave) return;
            let sum = 0;
            let exportbooks = [];
            this.books.forEach(book => {
                exportbooks.push({ title: book.title, author: book.author, readCount: book.read_count });
                sum += book.read_count;
            });

            exportbooks = exportbooks.slice(0, 25);

            var options = {
                width: "210mm",
                height: "297mm",
                orientation: "portrait",
                border: "5mm",
            };

            const doc = {
                html: this.BooksPdfTemplate, // <-- changed, now with 'import'
                data: {
                    books: exportbooks,
                    sum: sum,
                    date: (new Date()).toLocaleDateString('de-DE'),
                    year: this.schoolYear,
                    version: "v" + this.version
                },
                type: '',
            }
            console.log(doc);
            if (this.compilePDF(doc, options, pathToSave)) {
                ipcRenderer.send("openFile", pathToSave);
            }
        },

        exportUnreadBooks: function () {
            let response = ipcRenderer.sendSync("openSaveDialogDB", { title: 'Ungelesene Bücher exportieren', name: `Ungelesene Bücher ${(new Date()).toLocaleDateString('de-DE')}` });
            if (response.filePath) {
                ipcRenderer.sendSync("exportUnreadBooks", { year: schoolYear, path: response.filePath });
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
        
        importUnreadBooks: function () {
            // open file and save it to the database files folder
            let filepath = this.openFile("Ungelesene Bücher importieren");
            console.log('trying to import unread books', filepath);
            if (filepath) {
                console.log('trying to import unread books', filepath);
                ipcRenderer.sendSync("importUnreadBooks", filepath);
            }
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
        },
    },

    mounted: function () {
        console.log('students', this.students)

        this.statistics = {
            totalStudents: this.students.length,
            qualifiedStudents: 0,
            multiplied: 0,
            readBooks: 0,
            books: this.books.length,
            germanBooks: 0,
            englishBooks: 0,
            russianBooks: 0,
            frenchBooks: 0,
            italianBooks: 0,
        }

        this.students.forEach((student) => {
            if (student.multiplied_book_1 != -1) {
                this.statistics.multiplied++;
            }
            if (student.passed_count >= 3) {
                this.statistics.qualifiedStudents++;
            }
            this.statistics.readBooks += student.book_count;
        });

        this.books.forEach(book => {
            if (book.language.toLowerCase() === 'deutsch') {
                this.statistics.germanBooks++;
            } else if (book.language.toLowerCase() === 'englisch') {
                this.statistics.englishBooks++;
            } else if (book.language.toLowerCase() === 'russisch') {
                this.statistics.russianBooks++;
            } else if (book.language.toLowerCase() === 'französisch') {
                this.statistics.frenchBooks++;
            } else if (book.language.toLowerCase() === 'italienisch') {
                this.statistics.italianBooks++;
            }
        });
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
}

.statistics-block {
    font-size: 18px;
}

.export-inline-icon {
    height: 1.8em;
    vertical-align: -0.5em;
}
</style>