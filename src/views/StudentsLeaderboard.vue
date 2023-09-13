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
                                    src="@/assets/svgs/icon-yes.svg" class="table-icon"></div>
                            <div v-else class="table-cell" title="Schüler NICHT qualifiziert"><img
                                    src="@/assets/svgs/icon-no.svg" class="table-icon"></div>
                            <div v-if="student.multiplied" class="table-cell" title="Schüler hat multipliziert"><img
                                    src="@/assets/svgs/icon-yes.svg" class="table-icon"></div>
                            <div v-else class="table-cell" title="Schüler hat noch NICHT multipliziert"><img
                                    src="@/assets/svgs/icon-no.svg" class="table-icon"></div>
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
                <Button tabindex="2" type="add" text="Sch&uuml;ler hinzuf&uuml;gen" @click="newStudent()" />
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
                        <InputField v-model="currentStudent.readed_books" text="Gelesene Bücher"
                            :value=currentStudent.readed_books disabled="disabled" number="number" />
                        <InputFieldTrueFalse text="Schüler qualifiziert" :value="currentStudent.passed ? 'ja' : 'nein'" :img=currentStudent.passed />
                        <Button text="Verwalten" @click="readBookWindowVisible = true" />
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
                <div v-if="currentStudent.multiplied" class="multiplication">
                    <div class="multiplication-header">
                        <InputFieldTrueFalse text="Multiplikation" value="durchgeführt" img="true" />
                        <InputField text="Punkte" :value=currentStudent.multiplied_points disabled="disabled"
                            number="number" />
                        <InputField text="Datum" variable=""
                            :value="`${new Date(currentStudent.date_multiplied).toLocaleDateString('de-DE')}`"
                            disabled="disabled" />
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
                        <InputFieldTrueFalse text="Multiplikation" value="noch nicht durchgeführt" img="false" />
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
        <ReadBookWindow v-show="readBookWindowVisible" @close="readBookWindowVisible = false" :currentStudent=currentStudent
            :books=books @selectBook="addBookToStudent" />
        <MultiplyWindow v-show="multiplyWindowVisible" @close="multiplyWindowVisible = false" :student=currentStudent
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
        MultiplyWindow
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
        }
    },

    methods: {
        deepClone: function (e) { if (null == e || "object" != typeof e) return e; if (Array.isArray(e)) return e.map(e => this.deepClone(e)); const t = {}; for (let r in e) e.hasOwnProperty(r) && (t[r] = this.deepClone(e[r])); return t },

        updateBooksRemote: function () {
            ipcRenderer.send("getBooks");
            ipcRenderer.on("books", (event, dataReceived) => {
                this.books = dataReceived;
            })
        },

        updateStudentsRemote: function () {
            ipcRenderer.send("getStudents");
            ipcRenderer.on("students", (event, dataReceived) => {
                this.students = dataReceived;
            })
        },

        selectStudent: function (student) {
            this.currentStudent = this.deepClone(student);
            this.showStudentInfo = true;
            console.log('User selcted with id ' + this.currentStudent.uid);console.log(this.currentStudent);
        },

        saveStudent: function () {
            this.currentStudent.name = this.currentStudent.name.trim();
            this.currentStudent.surname = this.currentStudent.surname.trim();
            this.currentStudent.class = this.currentStudent.class.trim();
            if (this.currentStudent.name == "" || this.currentStudent.surname == "" || this.currentStudent.class == "") {
                this.ask({
                    type: 'alert',
                    subtitle: 'Student speichern',
                    content: `Bitte füllen Sie alle Felder aus vor dem Speichern!`,
                });
                return;
            }
            console.log(this.currentStudent.name + ' saved');
            ipcRenderer.send("addStudent", JSON.stringify(this.currentStudent));

            this.currentStudent = undefined;
            this.showStudentInfo = false;
            this.updateStudentsRemote();
        },

        newStudent: function () {
            console.log('open new student');
            this.currentStudent = {
                uid: -1,
                name: "",
                surname: "",
                class: "",
                points: 0,
                readed_books: 0,
                passed: false,
                multiplied: false,
                books: [],
            },
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
                console.log('delete student' + this.currentStudent);
                ipcRenderer.send("deleteStudent", JSON.stringify(this.currentStudent));

                this.updateStudentsRemote();

                this.currentStudent = undefined;
                this.showStudentInfo = false;
            }, () => {
                console.log('student not deleted because modal false');
            });
        },

        closeStudent: function () {
            console.log(this.currentStudent + ' closed');
            this.currentStudent = undefined;
            this.showStudentInfo = false;
        },

        addBookToStudent: function ([book, passed]) {
            this.readBookWindowVisible = false;
            this.currentStudent.books.push({ id: book.id, date_added: Date.now(), passed: passed, was_multiplied: false });
            this.saveStudent();
        },

        multiplyBooks: function([ book1, book2 ]) {
            console.log([ book1, book2 ]);
            this.multiplyWindowVisible = false;
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
            console.log(this.currentStudent);
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
        }
    },

    beforeMount() {
        this.updateBooksRemote();
        this.updateStudentsRemote();
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
