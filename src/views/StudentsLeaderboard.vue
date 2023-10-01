<template>
    <main>
        <div class="student-leaderboard-section">
            <h1>Rangliste der Schüler:innen</h1>
            <SearchBar v-model="searchStudent" tabindex="1" placeholder="Suche Schüler..." />
            <div style="overflow: hidden;">
                <div class="student-leaderboard ui-table">
                    <div class="table-row table-header-row">
                        <div class="table-cell"><img src="@/assets/svgs/icon-1.svg" class="table-icon"></div>
                        <div class="table-cell"><img src="@/assets/svgs/icon-2.svg" class="table-icon"></div>
                        <div class="table-cell"
                            @click="studentsSortBy = 'name'; studentsSortAscending = !studentsSortAscending">Vorname
                            <SortIcon />
                        </div>
                        <div class="table-cell"
                            @click="studentsSortBy = 'surname'; studentsSortAscending = !studentsSortAscending">Nachname
                            <SortIcon />
                        </div>
                        <div class="table-cell"
                            @click="studentsSortBy = 'class'; studentsSortAscending = !studentsSortAscending">Klasse
                            <SortIcon />
                        </div>
                        <div class="table-cell"
                            @click="studentsSortBy = 'points'; studentsSortAscending = !studentsSortAscending">Lose
                            <SortIcon />
                        </div>
                    </div>
                    <div class="table-data">
                        <div class="table-row" v-for="student in filteredStudentsList" @click="selectStudent(student)">
                            <div v-if="student.passed" class="table-cell" title="Schüler qualifiziert"><img
                                    src="@/assets/svgs/icon-yes-green.svg" class="table-icon"></div>
                            <div v-else class="table-cell" title="Schüler NICHT qualifiziert"><img
                                    src="@/assets/svgs/icon-no-red.svg" class="table-icon"></div>
                            <div v-if="student.multiplied_books.length == 2" class="table-cell"
                                title="Schüler hat multipliziert"><img src="@/assets/svgs/icon-yes-green.svg"
                                    class="table-icon"></div>
                            <div v-else class="table-cell" title="Schüler hat noch NICHT multipliziert"><img
                                    src="@/assets/svgs/icon-no-red.svg" class="table-icon"></div>
                            <div class="table-cell">
                                <div class="table-cell-centered-content">{{ student.name }}</div>
                            </div>
                            <div class="table-cell">
                                <div class="table-cell-centered-content">{{ student.surname }}</div>
                            </div>
                            <div class="table-cell">
                                <div class="table-cell-centered-content">{{ student.class }}</div>
                            </div>
                            <div class="table-cell">
                                <div class="table-cell-centered-content">{{ student.points }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="student-leaderboard-section-footer">
                <Button class="add-student" tabindex="2" type="add" text="Sch&uuml;ler hinzuf&uuml;gen"
                    @click="newStudent()" />
            </div>
        </div>
        <div class="vertical-line"></div>
        <div class="student-information-section">
            <div v-if="showStudentInfo == true" class="content">
                <div class="student-header-title">
                    <h1>Schüler:in</h1>
                    <Button type="delete" text="Löschen" color="red" @click="deleteStudent()" />
                    <Button type="yes" text="Speichern" color="green" @click="saveStudent()" />
                    <IconButton @click="closeStudent()" type="no" />
                </div>

                <div class="student-information">
                    <InputField tabindex="3" v-model="currentStudent.name" text="Vorname&nbsp;&nbsp;&nbsp;"
                        :value=currentStudent.name />
                    <InputField tabindex="5" v-model="currentStudent.class" text="Klasse" number="number"
                        :value=currentStudent.class @keyup.enter="saveStudent()" />
                    <InputField tabindex="4" v-model="currentStudent.surname" text="Nachname"
                        :value=currentStudent.surname />
                    <InputField v-model="currentStudent.points" text="Lose&nbsp;&nbsp;&nbsp;" disabled="disabled"
                        number="number" :value=currentStudent.points />
                </div>

                <div class="readed-books">
                    <div class="readed-books-header">


                        <!-- <InputField v-model="currentStudent.readed_books" text="Gelesene Bücher"
                            :value=currentStudent.readed_books disabled="disabled" number="number" /> -->


                        <InputFieldTwoValues text="Gelesene Bücher" :value1=currentStudent.readed_books
                            :value2=currentStudent.failed_books />

                        <InputFieldTrueFalse text="Schüler qualifiziert" :value="currentStudent.passed ? 'ja' : 'nein'"
                            :img=currentStudent.passed />
                        <Button text="Verwalten" @click="showReadBookWindow()" />
                    </div>
                    <div class="student-books ui-table" v-if="currentStudent.books.length > 0">
                        <div class="table-row table-header-row">
                            <div class="table-cell"><img src="@/assets/svgs/icon-1.svg" class="table-icon"></div>
                            <div class="table-cell">Titel
                                <SortIcon />
                            </div>
                            <div class="table-cell">Autor:in
                                <SortIcon />
                            </div>
                            <div class="table-cell">Sprache
                                <SortIcon />
                            </div>
                            <div class="table-cell">Datum
                                <SortIcon />
                            </div>
                            <div class="table-cell">Lose
                                <SortIcon />
                            </div>
                        </div>
                        <div class="table-data">
                            <div class="table-row" v-for="student_book in currentStudent.books">
                                <div v-if="student_book.passed" class="table-cell" title="Prüfung bestanden"><img
                                        src="@/assets/svgs/icon-yes.svg" class="table-icon"></div>
                                <div v-else class="table-cell" title="Prüfung NICHT bestanden"><img
                                        src="@/assets/svgs/icon-no.svg" class="table-icon">
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.find(book => book.id ===
                                        student_book.id).title }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.find(book => book.id ===
                                        student_book.id).author }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.find(book => book.id ===
                                        student_book.id).language }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ new
                                        Date(student_book.date_added).toLocaleDateString("de-DE") }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.find(book => book.id ===
                                        student_book.id).points }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="currentStudent.multiplied_books.length == 2" class="multiplication">
                    <div class="multiplication-header">
                        <InputFieldTrueFalse text="Multiplikation" value="durchgeführt" img="true" />
                        <InputField text="Punkte"
                            :value="books.find(book => book.id === currentStudent.multiplied_books[0]).points * books.find(book => book.id === currentStudent.multiplied_books[1]).points"
                            disabled="disabled" number="number" />
                        <InputField text="Datum"
                            :value="`${new Date(currentStudent.date_multiplied).toLocaleDateString('de-DE')}`"
                            disabled="disabled" />
                        <Button text="Löschen" @click="deleteMultiplication" />
                    </div>
                    <div class="multiplied-books ui-table">
                        <div class="table-row table-header-row">
                            <div class="table-cell">
                                <div class="table-cell-centered-content">Titel</div>
                            </div>
                            <div class="table-cell">
                                <div class="table-cell-centered-content">Autor:in</div>
                            </div>
                            <div class="table-cell">
                                <div class="table-cell-centered-content">Sprache</div>
                            </div>
                            <div class="table-cell">
                                <div class="table-cell-centered-content">Lose</div>
                            </div>
                        </div>
                        <div class="table-data">
                            <div class="table-row" v-for="book_id in currentStudent.multiplied_books">
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.find(book => book.id ===
                                        book_id).title }}
                                    </div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.find(book => book.id ===
                                        book_id).author
                                    }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.find(book => book.id ===
                                        book_id).language
                                    }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.find(book => book.id ===
                                        book_id).points
                                    }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="multiplication-not-done">
                    <div class="multiplication-header">
                        <InputFieldTrueFalse text="Multiplikation" value="nicht durchgeführt" img="false" />
                        <Button text="Bücher multiplizieren" @click="multiplyIfPossible()" />
                    </div>
                </div>
                <!-- <div class="delete-save-bar">
                    <Button type="delete" text="Löschen" color="red" @click="deleteStudent()" />
                    <Button type="yes" text="Speichern" color="green" @click="saveStudent()" />
                </div> -->
            </div>
            <div v-else id="no_student_selected">Klicken Sie auf einen Schüler,<br>
                um seine Informationen zu sehen</div>
        </div>
        <Modal v-show="modalVisible" :title="modalTitle" :subtitle="modalSubtitle" :textCancel="modalButtonTextCancel"
            :textOK="modalButtonTextOK" @close="handleModalClose" :type="modalType"> {{ modalContent }} </Modal>
        <ReadBookWindow v-if="readBookWindowVisible" @close="readBookWindowVisible = false" :currentStudent=currentStudent
            :books=books @selectBook="addBookToStudent" @updateBook="updateBookFromStudent"
            @removeBook="removeBookFromStudent" />
        <MultiplyWindow v-if="multiplyWindowVisible" @close="multiplyWindowVisible = false" :student=currentStudent
            :books=books @multiplyBooks="multiplyBooks" />
    </main>
</template>

<style scoped>
div#no_student_selected {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 100%;
}
</style>

<script>
const { ipcRenderer } = require('electron')

import SearchBar from "@/components/SearchBar.vue"
import Button from "@/components/Button.vue"
import InputField from "@/components/InputField.vue"
import InputFieldTrueFalse from "@/components/InputFieldTrueFalse.vue"
import SortIcon from "@/components/SortIcon.vue"
import IconButton from "@/components/IconButton.vue"
import Modal from "@/components/Modal.vue"
import ReadBookWindow from "@/components/ReadBookWindow.vue"
import MultiplyWindow from "@/components/MultiplyWindow.vue"
import InputFieldTwoValues from "@/components/InputFieldTwoValues.vue"
import { modalFunctions } from "@/logic/modal.js"
//import { rollupVersion } from "vite"
// ^ idk wer das importiert hat, aber es führt dazu, dass vite nicht builden kann (error)

export default {
    mixins: [modalFunctions],

    components: {
        SearchBar,
        Button,
        InputField,
        InputFieldTrueFalse,
        SortIcon,
        IconButton,
        Modal,
        ReadBookWindow,
        MultiplyWindow,
        InputFieldTwoValues
    },

    data() {
        return {
            students: [],
            books: [],
            currentStudent: undefined,
            searchStudent: '',
            showStudentInfo: false,
            readBookWindowVisible: false,
            multiplyWindowVisible: false,
            studentsSortBy: 'points',
            studentsSortAscending: false,
            currentStudentBeforeEdit: undefined
        }
    },

    methods: {
        deepClone: function (e) { if (null == e || "object" != typeof e) return e; if (Array.isArray(e)) return e.map(e => this.deepClone(e)); const t = {}; for (let r in e) e.hasOwnProperty(r) && (t[r] = this.deepClone(e[r])); return t },

        updateBooksRemote: function () {
            this.books = ipcRenderer.sendSync("getBooks");
        },

        updateStudentsRemote() {
            this.students = ipcRenderer.sendSync("getStudents");
            return true;
        },

        selectStudent: function (student) {
            this.checkIfStudentChangedAndAskIfSaveAndThenDoAndHopeThatItWorks(() => {
                this.currentStudentBeforeEdit = this.deepClone(student);
                this.currentStudent = this.deepClone(student);
                this.showStudentInfo = true;
            });
        },

        saveStudent: function (close = true) {
            this.currentStudent.name = this.currentStudent.name.replace(/['"`]/g, '').trim();
            this.currentStudent.surname = this.currentStudent.surname.replace(/['"`]/g, '').trim();
            this.currentStudent.class = this.currentStudent.class.replace(/['"`]/g, '').trim();
            if (this.currentStudent.name == "" || this.currentStudent.surname == "" || this.currentStudent.class == "") {
                this.ask({
                    type: 'alert',
                    subtitle: 'Student speichern',
                    content: `Bitte füllen Sie alle Felder aus vor dem Speichern!`,
                }, () => { }, () => { });
                return false;
            }
            let sum = 0;
            let passedCounter = 0;
            let failedCounter = 0;
            this.currentStudent.books.forEach(student_book => {
                let book_content = this.books.find(book => book.id == student_book.id);
                if (student_book.passed) {
                    sum += book_content.points;
                    passedCounter++;
                } else {
                    failedCounter++;
                }
            })

            if (this.currentStudent.multiplied_books.length != 0) {
                let book1 = this.books.find(book => book.id == this.currentStudent.multiplied_books[0]);
                let book2 = this.books.find(book => book.id == this.currentStudent.multiplied_books[1]);
                console.log(this.currentStudent.multiplied_books[0]);
                sum += book1.points * book2.points;
            }

            this.currentStudent.failed_books = failedCounter;
            this.currentStudent.readed_books = passedCounter;
            this.currentStudent.passed = passedCounter > 2;
            this.currentStudent.points = sum;

            var csuid = ipcRenderer.sendSync("addStudent", JSON.stringify(this.currentStudent));

            if (this.updateStudentsRemote() == true) {
                if (this.currentStudent.uid == -1) {
                    console.log(csuid);
                    this.currentStudent = this.deepClone(this.students.find(student => student.uid === csuid));
                    console.log(this.students.find(student => student.uid === csuid));
                    this.currentStudentBeforeEdit = this.deepClone(this.currentStudent);
                }
            }
            console.log(this.currentStudent);

            if (close) {
                this.currentStudent = undefined;
                this.showStudentInfo = false;
            }

            return true;
        },

        newStudent: function () {
            this.currentStudent = {
                uid: -1,
                name: "",
                surname: "",
                class: "",
                points: 0,
                readed_books: 0,
                failed_books: 0,
                passed: false,
                multiplied_books: [],
                date_multiplied: 0,
                books: [],
            },
                this.currentStudentBeforeEdit = this.deepClone(this.currentStudent);
            this.showStudentInfo = true;
        },

        deleteStudent: function () {
            if (this.currentStudent.uid == -1) {
                this.currentStudent = undefined;
                this.showStudentInfo = false;
                return;
            }

            this.ask({
                type: 'warning',
                subtitle: 'Schüler löschen',
                content: `Sind Sie sicher, dass sie den Schüler “${this.currentStudent.name} ${this.currentStudent.surname}” entfernen wollen?`,
                okButton: 'Schüler löschen'
            }, () => {

                console.log(ipcRenderer.sendSync("deleteStudent", JSON.stringify(this.currentStudent)));
                this.updateStudentsRemote();

                this.currentStudent = undefined;
                this.showStudentInfo = false;
            }, () => {
            });
        },

        closeStudent: function () {
            this.currentStudent = undefined;
            this.showStudentInfo = false;
        },

        addBookToStudent: function ([book, passed]) {
            this.readBookWindowVisible = false;
            this.currentStudent.books.push({ id: book, date_added: Date.now(), passed: passed });
            this.saveStudent(false);
        },

        removeBookFromStudent: function (bookID) {
            this.readBookWindowVisible = false;
            this.ask({
                type: 'warning',
                subtitle: 'Buch entfernen',
                content: `Sind Sie sicher, dass sie das Buch “${this.books.find(book => book.id ===
                    bookID).title}” von den gelesenen Büchern des Schülers “${this.currentStudent.name} ${this.currentStudent.surname}” entfernen wollen?`,
                okButton: 'Buch entfernen'
            }, () => {
                this.currentStudent.books = this.currentStudent.books.filter(book => book.id !== bookID)
                this.saveStudent(false);
            }, () => {
                this.readBookWindowVisible = true;
            });
        },

        updateBookFromStudent: function ([bookToChangeID, passed]) {
            this.readBookWindowVisible = false;
            this.currentStudent.books.find(book => book.id === bookToChangeID).passed = passed;
            this.saveStudent(false);
        },

        multiplyBooks: function ([book1, book2]) {
            this.multiplyWindowVisible = false;
            this.currentStudent.multiplied_books[0] = book1;
            this.currentStudent.multiplied_books[1] = book2;
            this.currentStudent.date_multiplied = Date.now();
            this.saveStudent(false);
        },

        deleteMultiplication: function () {
            this.currentStudent.multiplied_books = [];
            this.saveStudent(false);
        },

        sortListBy: function (list, criterion, sortAscending) {
            list.sort((a, b) => {
                let elementA, elementB;
                if (criterion === 'name') {
                    elementA = a.name.toLowerCase();
                    elementB = b.name.toLowerCase();
                } else if (criterion === 'surname') {
                    elementA = a.surname.toLowerCase();
                    elementB = b.surname.toLowerCase();
                } else if (criterion === 'points') {
                    elementA = a.points;
                    elementB = b.points;
                } else if (criterion === 'class') {
                    elementA = a.class.toLowerCase();
                    elementB = b.class.toLowerCase();
                }

                if (elementA < elementB) {
                    return ((sortAscending) ? -1 : 1);
                } else if (elementA > elementB) {
                    return ((sortAscending) ? 1 : -1);
                }
                return 0;
            });
            return list;

        },

        multiplyIfPossible: function () {
            let bookscount = 0;
            if (this.currentStudent.books.length > 0) this.currentStudent.books.forEach((book) => {
                if (book.passed) bookscount += 1;
            });
            if (bookscount < 2) {
                this.ask({
                    type: 'alert',
                    subtitle: 'Sie können nicht multiplizieren',
                    content: `Der Schüler “${this.currentStudent.name} ${this.currentStudent.surname}” hat zu wenige Bücher gelesen (es müssen mindestens 2 gelesene und bestätigte Bücher sein)`,
                    okButton: 'Ja'
                }, () => {
                    passed = true;
                }, () => {

                });
            } else {
                this.multiplyWindowVisible = true;
            }
        },


        checkIfStudentChangedAndAskIfSaveAndThenDoAndHopeThatItWorks: function (_callback) {
            if (typeof this.currentStudent === 'object') {
                if (!this.isStudentEqual(this.currentStudentBeforeEdit, this.currentStudent)) {
                    this.ask({
                        type: 'warning',
                        subtitle: 'Änderungen speichern',
                        content: `Sie haben Informationen des Schülers “${this.currentStudent.name} ${this.currentStudent.surname}” geändert und nicht gespeichert. Möchten Sie diese aktualisieren?`,
                        okButton: 'Verwerfen',
                        noButton: 'Speichern'
                    }, () => {
                        _callback();
                    }, () => {
                        if (this.saveStudent()) _callback();
                    });
                } else {
                    _callback();
                }
            } else {
                _callback();
            }
        },

        isStudentEqual: function (student1, student2) {
            let isequal = (student1.name == student2.name && student1.surname == student2.surname && student1.class == student2.class && student1.points == student2.points && student1.passed == student2.passed && student1.readed_books == student2.readed_books)
            return isequal
        },
        showReadBookWindow: function () {
            if (this.currentStudent.uid == -1) {
                this.ask({
                    type: 'warning',
                    subtitle: 'Bücher verwalten',
                    content: `Sie können nicht die Bücher verwalten, solange Sie den Schüler nicht gespeichert haben. Wollen Sie den Schüler speichern?`,
                    okButton: 'Abbrechen',
                    noButton: 'Schüler speichern',
                }, () => {

                }, () => {
                    this.saveStudent(false);
                });
            } else {
                this.readBookWindowVisible = true;
            }
        }

    },

    beforeMount() {
        this.updateBooksRemote();
        this.updateStudentsRemote();
    },

    mounted: function mounted() {
        var that = this;
        ipcRenderer.on("updateDataRemote", function () {
            that.updateStudentsRemote();
        });
    },

    computed: {
        filteredStudentsList() {
            let s = this.searchStudent.toLowerCase();

            return this.sortListBy(this.students.filter(student => {
                return (student.name.toLowerCase().includes(s) || student.surname.toLowerCase().includes(s) || student.class.toLowerCase().includes(s) || (student.name.toLowerCase() + ' ' + student.surname.toLowerCase()).includes(s) || (student.surname.toLowerCase() + ' ' + student.name.toLowerCase()).includes(s))
            }), this.studentsSortBy, this.studentsSortAscending);
        }
    }
}
</script>
