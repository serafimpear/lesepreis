<template>
    <main>
        <div class="student-leaderboard-section">
            <h1>Rangliste der Schüler:innen</h1>
            <SearchBar v-model="searchStudent" placeholder="Suche Schüler..." />
            <div style="overflow: hidden;">
                <div class="student-leaderboard ui-table">
                    <div class="table-row table-header-row">
                        <div class="table-cell"><img src="@/assets/svgs/icon-1.svg" class="table-icon"></div>
                        <div class="table-cell"><img src="@/assets/svgs/icon-2.svg" class="table-icon"></div>
                        <div class="table-cell">Vorname
                            <SortIcon />
                        </div>
                        <div class="table-cell">Nachname
                            <SortIcon />
                        </div>
                        <div class="table-cell">Klasse
                            <SortIcon />
                        </div>
                        <div class="table-cell">Lose
                            <SortIcon />
                        </div>
                    </div>
                    <div class="table-data">
                        <div class="table-row" v-for="student in filteredStudentsList" @click="selectStudent(student)">
                            <div v-if="student.passed" class="table-cell" title="Schüler zugelassen"><img
                                    src="@/assets/svgs/icon-yes.svg" class="table-icon"></div>
                            <div v-else class="table-cell" title="Schüler NICHT zugelassen"><img
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
                <Button type="add" text="Sch&uuml;ler hinzuf&uuml;gen" @click="newStudent()" />
            </div>
        </div>
        <div class="vertical-line"></div>
        <div class="student-information-section">
            <div v-if="showStudentInfo == true" class="content">
                <div class="student-header-title">
                    <h1>Student:in</h1>
                    <IconButton @click="closeStudent()" type="no" />
                </div>

                <div class="student-information">
                    <InputField text="Vorname&nbsp;&nbsp;&nbsp;" variable="" :value=currentStudent.name />
                    <InputField text="Klasse" variable="" number="number" :value=currentStudent.class />
                    <InputField text="Nachname" variable="" :value=currentStudent.surname />
                    <InputField text="Lose&nbsp;&nbsp;&nbsp;" variable="" disabled="disabled" number="number"
                        :value=currentStudent.points />
                </div>

                <div class="readed-books">
                    <div class="readed-books-header">
                        <InputField text="Gelesene Bücher" variable="" :value=currentStudent.readed_books
                            disabled="disabled" number="number" />
                        <Button type="add" text="Hinzufügen" />
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
                        <InputField text="Punkte" variable="" :value=currentStudent.multiplied_points disabled="disabled"
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
                        <Button text="Bücher multiplizieren" />
                    </div>
                </div>
                <div class="delete-save-bar">
                    <Button type="delete" text="Löschen" color="red" @click="deleteStudent()" />
                    <Button type="yes" text="Speichern" color="green" @click="saveStudent()" />
                </div>
            </div>
            <div v-else id="no_student_selected">Klicken Sie auf einen Schüler,<br>
                um seine Informationen zu sehen</div>
        </div>
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
import { students, books } from '@/assets/dataOld.js';


export default {
    components: {
        SearchBar,
        Button,
        InputField,
        InputFieldTrueFalse,
        SortIcon,
        IconButton
    },

    data() {
        return {
            students: [],
            books: [],
            currentStudent: undefined,
            searchStudent: '',
            showStudentInfo: false,
            currentStudentLink: undefined
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
            this.currentStudentLink = student;
            this.showStudentInfo = true;
            console.log('User selcted with id ' + this.currentStudent.uid);
        },

        saveStudent: function () {
            this.currentStudentLink = this.currentStudent // weil currentStudentLink a Link zum student selber isch, wird student glei in der liste aktualisiert 

            console.log(this.currentStudent.name + ' saved');
            this.currentStudent = undefined;
            this.showStudentInfo = false;
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
            console.log('delete student' + this.currentStudent);
            this.currentStudent = undefined;
            this.showStudentInfo = false;
        },

        closeStudent: function () {
            console.log(this.currentStudent + ' closed');
            this.currentStudent = undefined;
            this.showStudentInfo = false;
        }
    },
    beforeMount() {
        this.updateBooksRemote();
        this.updateStudentsRemote();
    },

    computed: {
        filteredStudentsList() {
            var s = this.searchStudent.toLowerCase();
            return this.students.filter(student => {
                return (student.name.toLowerCase().includes(s) || student.surname.toLowerCase().includes(s) || student.class.toLowerCase().includes(s) || (student.name.toLowerCase() + ' ' + student.surname.toLowerCase()).includes(s) || (student.surname.toLowerCase() + ' ' + student.name.toLowerCase()).includes(s))
            })
        }
    }
}
</script>