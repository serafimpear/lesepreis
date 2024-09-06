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
                            @click="studentsSortBy = 'surname'; studentsSortAscending = !studentsSortAscending">Nachname
                            <SortIcon />
                        </div>
                        <div class="table-cell"
                            @click="studentsSortBy = 'name'; studentsSortAscending = !studentsSortAscending">Vorname
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
                            <div v-if="student.multiplied_book_1 !== -1" class="table-cell"
                                title="Schüler hat multipliziert"><img src="@/assets/svgs/icon-yes-green.svg"
                                    class="table-icon"></div>
                            <div v-else class="table-cell" title="Schüler hat noch NICHT multipliziert"><img
                                    src="@/assets/svgs/icon-no-red.svg" class="table-icon"></div>
                            <div class="table-cell">
                                <div class="table-cell-centered-content">{{ student.surname }}</div>
                            </div>
                            <div class="table-cell">
                                <div class="table-cell-centered-content">{{ student.name }}</div>
                            </div>
                            <div class="table-cell">
                                <div class="table-cell-centered-content">{{ student.class }}</div>
                            </div>
                            <div class="table-cell">
                                <div class="table-cell-centered-content">{{ student.total_points }}</div>
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
                    <!--<Button type="yes" text="Speichern" color="green" @click="saveStudent()" />-->
                    <IconButton @click="closeStudent()" type="no" />
                </div>

                <div class="student-information">
                    <InputField tabindex="3" v-model="currentStudent.surname" text="Nachname"
                        :value=currentStudent.surname />
                    <InputField tabindex="5" v-model="currentStudent.class" text="Klasse" number="number"
                        :value=currentStudent.class @keyup.enter="saveStudent()" /> 
                    <InputField tabindex="4" v-model="currentStudent.name" text="Vorname&nbsp;&nbsp;&nbsp;"
                        :value=currentStudent.name />
                    <InputField v-model="currentStudent.total_points" text="Lose&nbsp;&nbsp;&nbsp;" disabled="disabled"
                        number="number" :value=currentStudent.total_points />
                </div>

                <div class="readed-books">
                    <div class="readed-books-header">


                        <!-- <InputField v-model="currentStudent.passed_count" text="Gelesene Bücher"
                            :value=currentStudent.passed_count disabled="disabled" number="number" /> -->


                        <InputFieldTwoValues text="Gelesene Bücher" :value1=currentStudent.passed_count
                            :value2=currentStudent.failed_count />

                        <InputFieldTrueFalse text="Schüler qualifiziert" :value="currentStudent.passed ? 'ja' : 'nein'"
                            :img=currentStudent.passed />
                        <Button text="Verwalten" @click="showReadBookWindow()" />
                    </div>
                    <div class="student-books ui-table" v-if="currentStudent.book_count > 0">
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
                            <div class="table-row" v-for="student_book in studentBooks.get(currentStudent.uid).values()">
                                <div v-if="student_book.passed" class="table-cell" title="Prüfung bestanden"><img
                                        src="@/assets/svgs/icon-yes.svg" class="table-icon"></div>
                                <div v-else class="table-cell" title="Prüfung NICHT bestanden"><img
                                        src="@/assets/svgs/icon-no.svg" class="table-icon">
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.get(
                                        student_book.book_id).title }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.get(
                                        student_book.book_id).author }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.get(
                                        student_book.book_id).language }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ new
                                        Date(student_book.date_added).toLocaleDateString("de-DE") }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.get(
                                        student_book.book_id).points }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="currentStudent.multiplied_book_1 !== -1" class="multiplication">
                    <div class="multiplication-header">
                        <InputFieldTrueFalse text="Multiplikation" value="durchgeführt" img="true" />
                        <InputField text="Punkte"
                            :value="books.get(currentStudent.multiplied_book_1).points * books.get(currentStudent.multiplied_book_2).points"
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
                            <div class="table-row" v-for="book_id in [currentStudent.multiplied_book_1, currentStudent.multiplied_book_2]">
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.get(
                                        book_id).title }}
                                    </div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.get(
                                        book_id).author
                                        }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.get(
                                        book_id).language
                                        }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.get(
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
        <ReadBookWindow v-if="readBookWindowVisible" @close="readBookWindowVisible = false"
            :books=books :studentBooks=studentBooks.get(currentStudent.uid) @selectBook="addBookToStudent"
            @updateBook="updateBookFromStudent" @removeBook="removeBookFromStudent" />
        <MultiplyWindow v-if="multiplyWindowVisible" @close="multiplyWindowVisible = false" :student=currentStudent
            :books=books :studentBooks=studentBooks.get(currentStudent.uid) @multiplyBooks="multiplyBooks" />
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
            students: new Map(),
            books: new Map(),
            studentBooks: new Map(),
            currentStudent: undefined,
            searchStudent: '',
            showStudentInfo: false,
            readBookWindowVisible: false,
            multiplyWindowVisible: false,
            studentsSortBy: 'points',
            studentsSortAscending: false,
            // currentStudentBeforeEdit: undefined,
        }
    },

    watch: {
        currentStudent: {
            handler(val) {
                this.saveStudent(false);
            },
            deep: true, // Add this property to watch for changes to nested properties
        },
    },

    methods: {
        deepClone: function (e) { if (null == e || "object" != typeof e) return e; if (Array.isArray(e)) return e.map(e => this.deepClone(e)); const t = {}; for (let r in e) e.hasOwnProperty(r) && (t[r] = this.deepClone(e[r])); return t },

        updateBooksRemote: function () {
            const booksList = ipcRenderer.sendSync("getBooks");
            this.books = new Map(booksList.map(book => [book.id, book]));
        },

        updateStudentBooksRemote: function() {
            this.studentBooks = new Map([...this.students.keys()].map(studentID => [studentID, new Map()]));
            const studentBooksList = ipcRenderer.sendSync("getStudentBooks");
            studentBooksList.forEach(studentBookCombination => {
                this.studentBooks.get(studentBookCombination.uid).set(studentBookCombination.book_id, studentBookCombination);
            });
            console.log(this.studentBooks, this.books);
        },

        updateStudentsRemote: function() {
            const studentsList = ipcRenderer.sendSync('DBQuery', `SELECT 
  SUM(b.points) AS points, 
  COUNT(b.id) AS book_count, 
  COUNT(CASE WHEN sb.passed = true THEN sb.book_id END) AS passed_count, 
  COUNT(CASE WHEN sb.passed = false THEN sb.book_id END) AS failed_count, 
  s.*,
  CASE WHEN COUNT(CASE WHEN sb.passed = true THEN sb.book_id END) > 2 THEN TRUE ELSE FALSE END AS passed,
  SUM(b.points) + COALESCE(mb1.points * mb2.points, 0) AS total_points
FROM 
  students AS s
  LEFT JOIN books AS mb1 ON s.multiplied_book_1 = mb1.id
  LEFT JOIN books AS mb2 ON s.multiplied_book_2 = mb2.id
  LEFT JOIN student_books AS sb ON s.uid = sb.uid
  INNER JOIN books AS b ON sb.book_id = b.id
GROUP BY 
  s.uid
ORDER BY 
  total_points DESC;`);
            this.students = new Map(studentsList.map(student => [student.uid, student]));
            this.updateStudentBooksRemote();
            return true;
        },

        selectStudent: function (student) {
            if (this.currentStudent) {
                this.currentStudent.name = this.currentStudent.name.replace(/['"`]/g, '').trim();
                this.currentStudent.surname = this.currentStudent.surname.replace(/['"`]/g, '').trim();
                this.currentStudent.class = this.currentStudent.class.replace(/['"`]/g, '').trim();
                if (this.currentStudent.name == "" || this.currentStudent.surname == "" || this.currentStudent.class == "") {
                    this.ask({
                        type: 'alert',
                        subtitle: 'Schüler:in speichern',
                        content: `Bitte füllen Sie alle Felder aus!`,
                    }, () => { }, () => { });
                    return;
                }
                // this.saveStudent(false); // not needed because of watcher
            }
            // this.currentStudentBeforeEdit = this.deepClone(student);
            this.currentStudent = this.deepClone(student);
            this.showStudentInfo = true;
        },

        saveStudent: function (close = true) {
            // let possible_match = [...this.students.values()].find(student => student.name.toLowerCase() == this.currentStudent.name.toLowerCase() && student.surname.toLowerCase() == this.currentStudent.surname.toLowerCase() && student.class.toLowerCase() == this.currentStudent.class.toLowerCase());
            // if (possible_match) {
            //     return this.ask({
            //         type: 'alert',
            //         subtitle: 'Duplikat',
            //         noButton: 'Wechseln',
            //         content: `Ein Schüler mit dem Namen "${this.currentStudent.name} ${this.currentStudent.surname}", der die Klasse ${this.currentStudent.class} besucht, existiert bereits!\n\nMöchten Sie zu diesem wechseln?`,
            //     }, () => {
            //         return false;
            //     }, () => {
            //         this.currentStudentBeforeEdit = this.deepClone(possible_match);
            //         this.currentStudent = this.deepClone(possible_match);
            //         this.showStudentInfo = true;
            //         return false;
            //     });
            // }

            ipcRenderer.sendSync("upsertStudent", JSON.stringify(this.currentStudent));
            this.students.set(this.currentStudent.uid, this.deepClone(this.currentStudent));

            if (close) {
                this.closeStudent();
            }

            return true;
        },

        newStudent: function () {
            this.currentStudent = {
                uid: null,
                name: "",
                surname: "",
                class: "",
                points: 0,
                total_points: 0,
                passed_count: 0,
                failed_count: 0,
                book_count: 0,
                multiplied_book_1: -1,
                multiplied_book_2: -1,
                date_multiplied: 0,
            };
            const csuid = ipcRenderer.sendSync("upsertStudent", JSON.stringify(this.currentStudent));

            this.currentStudent.uid = csuid;
            this.students.set(csuid, this.deepClone(this.currentStudent));

            this.studentBooks.set(csuid, new Map());

            // this.currentStudentBeforeEdit = this.deepClone(this.currentStudent);
            this.showStudentInfo = true;
        },

        deleteStudent: function () {
            this.ask({
                type: 'warning',
                subtitle: 'Schüler löschen',
                content: `Sind Sie sicher, dass sie den Schüler “${this.currentStudent.name} ${this.currentStudent.surname}” entfernen wollen?`,
                okButton: 'Schüler löschen'
            }, () => {
                console.log(ipcRenderer.sendSync("deleteStudent", JSON.stringify(this.currentStudent)));
                this.students.delete(this.currentStudent.uid);
                this.studentBooks.delete(this.currentStudent.uid);

                this.closeStudent();
            }, () => {
            });
        },

        closeStudent: function () {
            this.currentStudent = undefined;
            this.showStudentInfo = false;
        },

        addBookToStudent: function ([bookID, passed, date_added]) {
            this.readBookWindowVisible = false;
            this.studentBooks.get(this.currentStudent.uid).set(bookID, {uid: this.currentStudent.uid, book_id: bookID, passed: passed, date_added: date_added})
            this.currentStudent.book_count++;
            if (passed) {
                this.currentStudent.passed_count++;
                this.currentStudent.points += this.books.get(bookID).points;
                this.currentStudent.total_points += this.books.get(bookID).points;
            } else {
                this.currentStudent.failed_count++;
            }

            this.students.set(this.currentStudent.uid, this.currentStudent);
            ipcRenderer.sendSync('DBQuery', `INSERT INTO student_books (uid, book_id, passed, date_added) VALUES (${this.currentStudent.uid}, ${bookID}, ${passed}, ${date_added});`);
        },

        removeBookFromStudent: function (bookID) {
            this.readBookWindowVisible = false;
            if (bookID === this.currentStudent.multiplied_book_1 || bookID === this.currentStudent.multiplied_book_2) {
                this.ask({
                        type: 'alert',
                        subtitle: 'Buch entfernen Fehlgeschlagen',
                        content: `Der Schüler verwendet dieses Buch zum Multiplizieren!`,
                    }, () => { }, () => { });
                return;
            }

            this.ask({
                type: 'warning',
                subtitle: 'Buch entfernen',
                content: `Sind Sie sicher, dass sie das Buch “${this.books.get(bookID).title
                }” von den gelesenen Büchern des Schülers “${this.currentStudent.name} ${this.currentStudent.surname}” entfernen wollen?`,
                okButton: 'Buch entfernen'
            }, () => {
                this.currentStudent.book_count--;
                if (this.studentBooks.get(this.currentStudent.uid).get(bookID).passed) {
                    this.currentStudent.passed_count--;
                    this.currentStudent.points -= this.books.get(bookID).points;
                    this.currentStudent.total_points -= this.books.get(bookID).points;
                } else {
                    this.currentStudent.failed_count--;
                }
                this.students.set(this.currentStudent.uid, this.currentStudent);
                this.studentBooks.get(this.currentStudent.uid).delete(bookID);
                ipcRenderer.sendSync('DBQuery', `DELETE FROM student_books WHERE uid = ${this.currentStudent.uid} AND book_id = ${bookID};`);
            }, () => {
                this.readBookWindowVisible = true;
            });
        },

        updateBookFromStudent: function ([bookToChangeID, passed]) {
            this.readBookWindowVisible = false;
            this.readBookWindowVisible = false;
            if (bookToChangeID === this.currentStudent.multiplied_book_1 || bookToChangeID === this.currentStudent.multiplied_book_2) {
                this.ask({
                        type: 'alert',
                        subtitle: 'Änderung des Bestanden-Status Fehlgeschlagen',
                        content: `Der Schüler verwendet dieses Buch zum Multiplizieren!`,
                    }, () => { }, () => { });
                return;
            }
            if (passed && !this.studentBooks.get(this.currentStudent.uid).get(bookToChangeID).passed) {
                this.currentStudent.passed_count++;
                this.currentStudent.failed_count--;
                this.currentStudent.points += this.books.get(bookToChangeID).points;
                this.currentStudent.total_points += this.books.get(bookToChangeID).points;
            } else if (!passed && this.studentBooks.get(this.currentStudent.uid).get(bookToChangeID).passed) {
                this.currentStudent.passed_count--;
                this.currentStudent.failed_count++;
                this.currentStudent.points -= this.books.get(bookToChangeID).points;
                this.currentStudent.total_points -= this.books.get(bookToChangeID).points;
            }
            this.studentBooks.get(this.currentStudent.uid).get(bookToChangeID).passed = passed;
            ipcRenderer.sendSync('DBQuery', `UPDATE student_books SET passed = ${passed} WHERE uid = ${this.currentStudent.uid} AND book_id = ${bookToChangeID};`);
            // this.currentStudentBeforeEdit = this.deepClone(this.currentStudent);
        },

        multiplyBooks: function ([book1ID, book2ID]) {
            this.multiplyWindowVisible = false;
            if (this.currentStudent.multiplied_book_1 !== -1) {
                this.currentStudent.total_points -= this.books.get(this.currentStudent.multiplied_book_1).points * this.books.get(this.currentStudent.multiplied_book_2).points;
            }
            this.currentStudent.multiplied_book_1 = book1ID;
            this.currentStudent.multiplied_book_2 = book2ID;
            this.currentStudent.total_points += this.books.get(this.currentStudent.multiplied_book_1).points * this.books.get(this.currentStudent.multiplied_book_2).points;

            this.currentStudent.date_multiplied = Date.now();
            // this.saveStudent(false); // not needed because of watcher
            // this.currentStudentBeforeEdit = this.deepClone(this.currentStudent);
        },

        deleteMultiplication: function () {
            if (this.currentStudent.multiplied_book_1 === -1) {
                return;
            }
            this.currentStudent.total_points -= books.get(this.currentStudent.multiplied_book_1).points * books.get(this.currentStudent.multiplied_book_2).points;
            this.currentStudent.multiplied_book_1 = -1;
            this.currentStudent.multiplied_book_2 = -1;
            // this.saveStudent(false); // not needed because of watcher
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
                    elementA = a.total_points;
                    elementB = b.total_points;
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
            if (this.currentStudent.book_count < 2) {
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

        // checkIfStudentChangedAndAskIfSaveAndThenDoAndHopeThatItWorks: function (_callback) {
        //     if (typeof this.currentStudent === 'object') {
        //         if (!this.isStudentEqual(this.currentStudentBeforeEdit, this.currentStudent)) {
        //             this.ask({
        //                 type: 'warning',
        //                 subtitle: 'Änderungen speichern',
        //                 content: `Sie haben Informationen des Schülers “${this.currentStudent.name} ${this.currentStudent.surname}” geändert und nicht gespeichert. Möchten Sie diese aktualisieren?`,
        //                 okButton: 'Verwerfen',
        //                 noButton: 'Speichern'
        //             }, () => {
        //                 _callback();
        //             }, () => {
        //                 if (this.saveStudent()) _callback();
        //             });
        //         } else {
        //             _callback();
        //         }
        //     } else {
        //         _callback();
        //     }
        // },
        isStudentEqual: function (student1, student2) {
            let isequal = (student1.name == student2.name && student1.surname == student2.surname && student1.class == student2.class && student1.points == student2.points && student1.total_points == student2.total_points && student1.passed == student2.passed && student1.passed_count == student2.passed_count)
            return isequal
        },
        showReadBookWindow: function () {
            // if (this.currentStudent.name == "") {
            //     this.ask({
            //         type: 'warning',
            //         subtitle: 'Bücher verwalten',
            //         content: `Sie können nicht die Bücher verwalten, solange Sie den Schüler nicht gespeichert haben. Wollen Sie den Schüler speichern?`,
            //         okButton: 'Abbrechen',
            //         noButton: 'Schüler speichern',
            //     }, () => {

            //     }, () => {
            //         this.saveStudent(false);
            //     });
            // } else {
            this.readBookWindowVisible = true;
            // }
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

            return this.sortListBy([...this.students.values()].filter(student => {
                return (student.name.toLowerCase().includes(s) || student.surname.toLowerCase().includes(s) || student.class.toLowerCase().includes(s) || (student.name.toLowerCase() + ' ' + student.surname.toLowerCase()).includes(s) || (student.surname.toLowerCase() + ' ' + student.name.toLowerCase()).includes(s))
            }), this.studentsSortBy, this.studentsSortAscending);
        }
    }
}
</script>
