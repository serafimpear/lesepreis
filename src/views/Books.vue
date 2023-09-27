<template>
    <main id="main-books">
        <div class="books-list-section">
            <div class="books-section-header">
                <h1>Bücher</h1>
                <Button class="add-book" type="add" text="Buch hinzuf&uuml;gen" @click="newBook()" />
            </div>
            <SearchBar placeholder="Suche Bücher..." v-model="searchBook" />
            <div class="books-list ui-table">
                <div class="table-row table-header-row">
                    <div class="table-cell" @click="booksSortBy = 'title'; booksSortAscending = !booksSortAscending;">Titel
                        <SortIcon />
                    </div>
                    <div class="table-cell" @click="booksSortBy = 'author'; booksSortAscending = !booksSortAscending;">
                        Autor:in
                        <SortIcon />
                    </div>
                    <div class="table-cell" @click="booksSortBy = 'language'; booksSortAscending = !booksSortAscending;">
                        Sprache
                        <SortIcon />
                    </div>
                    <div class="table-cell" @click="booksSortBy = 'points'; booksSortAscending = !booksSortAscending;">Lose
                        <SortIcon />
                    </div>
                    <div class="table-cell" @click="booksSortBy = 'isbn'; booksSortAscending = !booksSortAscending;">ISBN
                        <SortIcon />
                    </div>
                </div>
                <div class="table-data">
                    <div class="table-row" v-for="book in filteredBooksList" @click="selectBook(book)">
                        <div class="table-cell">{{ book.title }}</div>
                        <div class="table-cell">{{ book.author }}</div>
                        <div class="table-cell">{{ book.language }}</div>
                        <div class="table-cell">{{ book.points }}</div>
                        <div class="table-cell">{{ book.isbn }}</div>
                    </div>
                </div>
            </div>
            <div class="books-list-section-footer">
                <!-- <Button class="add-book" type="add" text="Buch hinzuf&uuml;gen" @click="newBook()" /> -->
            </div>
        </div>

        <div class="vertical-line"></div>

        <div class="book-information-section">
            <div v-if="showBookInfo == true" class="content">
                <div class="book-header-title">
                    <h1>Buch</h1>
                    <IconButton @click="closeBook()" type="no" />
                </div>
                <div class="book-information">
                    <InputField text="ISBN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" variable="" :value=currentBook.isbn v-model="currentBook.isbn" @input="searchBookWEB" />
                    <InputField text="Autor&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" v-model="currentBook.author" variable="" :value=currentBook.author />
                    <InputField v-model="currentBook.title" text="Titel&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" variable="" :value=currentBook.title />
                    <InputField class="language-input" v-model="currentBook.language" text="Sprache&nbsp;" variable="" :value=currentBook.language />
                    <InputField class="points-input" v-model="currentBook.points" text="Lose&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" variable="" number="positivnumber" :value=currentBook.points />
                    <div>
                        <div class="book-search-status">
                            <span v-if="isLoading">Suche nach Informationen...
                                <LoadingIcon />
                            </span>
                            <span v-else-if="noResults">Keine Ergebnisse</span>
                            <span v-else-if="noResults != true && isLoading != true">&nbsp;</span>
                        </div>
                        <div v-if="bookResults.length > 0" style="font-size: 18px;font-style: normal;font-weight: 300;">
                            Mögliche Bücher</div>
                        <div v-if="bookResults.length > 0" style="font-size: 12px;font-style: italic;font-weight: 300;">
                            Kicken Sie auf ein Ergebnis, um
                            die Daten automatisch auszufüllen</div>
                    </div>
                </div>
                <div class="book-search">
                    <div class="book-result" v-for="result in bookResults" @click="selectResultBook(result)">
                        <div class="book-result-cover">
                            <img :src="result.thumbnailURL">
                        </div>
                        <div class="book-result-author">{{ result.author }}</div>
                        <div class="book-result-title">“{{ result.title }}”</div><br>
                        <div class="book-result-language">{{ result.language }}</div>
                    </div>
                </div>
                <div class="delete-save-bar">
                    <Button type="delete" text="Löschen" color="red" @click="deleteBook()" />
                    <Button type="yes" text="Speichern" color="green" @click="saveBook()" />
                </div>
            </div>
            <div v-else id="no_book_selected">Klicken Sie auf ein Buch,<br>
                um seine Informationen zu bearbeiten</div>
        </div>
        <Modal v-show="modalVisible" :title="modalTitle" :subtitle="modalSubtitle" :textCancel="modalButtonTextCancel"
            :textOK="modalButtonTextOK" @close="handleModalClose" :type="modalType"> {{ modalContent }} </Modal>
    </main>
</template>

<style scoped>
div#no_book_selected {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 100%;
}
</style>

<style>
main#main-books {
    grid-template-columns: 2fr 1px 1fr;
}
</style>

<script>
const { ipcRenderer } = require('electron')

import SearchBar from "@/components/SearchBar.vue"
import Button from "@/components/Button.vue"
import IconButton from "@/components/IconButton.vue"
import SortIcon from "@/components/SortIcon.vue"
import LoadingIcon from "@/components/LoadingIcon.vue"
import InputField from "@/components/InputField.vue"
import axios from 'axios';

import Modal from "@/components/Modal.vue"
import { modalFunctions } from "@/logic/modal.js"

export default {
    mixins: [modalFunctions],

    components: {
        SearchBar,
        Button,
        SortIcon,
        InputField,
        LoadingIcon,
        IconButton,
        Modal
    },

    data() {
        return {
            books: [],
            students: [],
            searchBook: '',
            currentBook: undefined,
            showBookInfo: false,
            isLoading: false,
            bookResults: [],
            noResults: false,
            languageMap: {
                'de': 'Deutsch',
                'it': 'Italienisch',
                'ru': 'Russisch',
                'fr': 'Französisch',
                'la': 'Latein',
                'en': 'Englisch',
                'es': 'Spanisch',
            },
            booksSortBy: 'title',
            booksSortAscending: false,
            currentBookBeforeEdit: undefined
        }
    },

    methods: {
        deepClone: function (e) { if (null == e || "object" != typeof e) return e; if (Array.isArray(e)) return e.map(e => this.deepClone(e)); const t = {}; for (let r in e) e.hasOwnProperty(r) && (t[r] = this.deepClone(e[r])); return t },

        updateBooksRemote: function () {
            this.books = ipcRenderer.sendSync("getBooks");

        },
        updateStudentsRemote: function () {
            this.students = ipcRenderer.sendSync("getStudents");

        },

        selectBook: function (book) {
            this.checkIfBookChangedAndAskIfSaveAndThenDoAndHopeThatItWorks(() => {
                this.currentBookBeforeEdit = this.deepClone(book);
                this.currentBook = this.deepClone(book);
                this.bookResults = [];
                this.showBookInfo = true;
            });
        },

        closeBook: function (book) {
            this.currentBook = undefined;
            this.bookResults = [];
            this.showBookInfo = false;
        },

        saveBook: function (close = true) {
            this.currentBook.title = this.currentBook.title.replace(/['"`]/g, '').trim();
            this.currentBook.author = this.currentBook.author.replace(/['"`]/g, '').trim();
            this.currentBook.language = this.currentBook.language.replace(/['"`]/g, '').trim();
            this.currentBook.isbn = this.currentBook.isbn.replace(/['"`]/g, '').trim();
            this.currentBook.points = parseInt(this.currentBook.points);
            if (this.currentBook.title == "" || this.currentBook.author == "" || this.currentBook.language == "" || this.currentBook.points == 0) {
                this.ask({
                    type: 'alert',
                    subtitle: 'Buch speichern',
                    content: `Bitte füllen Sie alle Felder aus vor dem Speichern!`,
                }, () => { }, () => { });
                return false;
            }

            ipcRenderer.sendSync("addBook", JSON.stringify(this.currentBook));

            if (close) {
                this.currentBook = undefined;
                this.bookResults = [];
                this.showBookInfo = false;
            }
            this.updateBooksRemote();
            return true;
        },

        deleteBook: function () {
            if (this.currentBook.id == -1) {
                this.currentBook = undefined;
                this.bookResults = [];
                this.showBookInfo = false;
                return;
            }

            let readCount = 0;
            for (let i = 0; i < this.students.length; i++) {
                for (let j = 0; j < this.students[i].books.length; j++) {
                    if (this.students[i].books[j].id == this.currentBook.id) {
                        readCount++;
                    }
                }
            }

            if (readCount != 0) {
                this.ask({
                    type: 'alert',
                    // if type == alert
                    // braucht es kein okButton
                    subtitle: 'Sie können das Buch nicht löschen!',
                    content: ` "${this.currentBook.title}" haben ${readCount} Schüler gelesen. Um es zu löschen, entfernen Sie bei jedem Schüler dieses aus der Liste der gelesenen Bücher!`,
                }, () => {
                    // cannot happen
                }, () => {
                });
                return;
            }

            this.ask({
                type: 'warning',
                subtitle: 'Buch löschen',
                content: `Sind Sie sicher, dass sie das Buch “${this.currentBook.title}” entfernen wollen?`,
                okButton: 'Buch löschen'
            }, () => {

                ipcRenderer.sendSync("deleteBook", JSON.stringify(this.currentBook));

                this.updateBooksRemote();
                this.updateStudentsRemote();
                this.currentBook = undefined;
                this.bookResults = [];
                this.showBookInfo = false;
            }, () => {
            });
        },

        newBook: function () {
            this.bookResults = [];
            this.currentBook = {
                id: -1,
                title: "",
                author: "",
                language: "",
                points: 0,
                isbn: "",
            };
            this.showBookInfo = true;
            this.isNew = true;
            this.currentBookBeforeEdit = this.deepClone(this.currentBook);
        },
        searchBookWEB: function () {
            this.bookResults = [];
            if (this.currentBook.isbn.length >= 10) {
                this.isLoading = true;
                axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.currentBook.isbn}&key=AIzaSyA81ig_LA7piHwhiYhJ0pHkqhZGMq9gdcQ`).then(response => {
                    const data = response.data;
                    if (data.totalItems > 0) {
                        for (var resultId = 0; resultId < data.totalItems; resultId++) {
                            const bookInfo = data.items[resultId].volumeInfo;

                            const book = {
                                title: bookInfo.subtitle ? `${bookInfo.title} ${bookInfo.subtitle}` : bookInfo.title,
                                author: bookInfo.authors ? bookInfo.authors.join(', ') : '',
                                thumbnailURL: bookInfo.imageLinks && bookInfo.imageLinks.thumbnail ? bookInfo.imageLinks.thumbnail : 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDE2MCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTAwIDE2MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNFNEQzQkI7fQ0KPC9zdHlsZT4NCjxyZWN0IGNsYXNzPSJzdDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTYwIi8+DQoJCTxwYXRoIGQ9Im0yMC41IDYyLjF2Ni40IDEuMnMwIDAuOCAwIDEuMmMwLjItMC4yIDAuMy0wLjQgMC41LTAuNnMwLjMtMC40IDAuNS0wLjZsMy41LTMuOWgxbC0zLjUgMy44IDMuOCA1LjFoLTFsLTMuNC00LjUtMS40IDEuNXYzaC0wLjh2LTEyLjZoMC44eiIvPg0KCQk8cGF0aCBkPSJtMzEuMiA2NS43YzAuOCAwIDEuNCAwLjIgMS45IDAuNSAwLjUgMC40IDAuOSAwLjggMS4xIDEuNSAwLjMgMC42IDAuNCAxLjMgMC40IDIuMXYwLjZoLTYuNGMwIDEuMiAwLjMgMi4yIDAuOSAyLjggMC42IDAuNyAxLjQgMSAyLjQgMSAwLjYgMCAxIDAgMS40LTAuMXMwLjktMC4yIDEuNC0wLjV2MC44Yy0wLjQgMC4yLTAuOSAwLjMtMS4zIDAuNC0wLjUgMC4yLTEgMC4yLTEuNiAwLjItMC45IDAtMS43LTAuMi0yLjMtMC42cy0xLjEtMC45LTEuNC0xLjYtMC41LTEuNS0wLjUtMi40IDAuMS0xLjcgMC40LTIuNCAwLjctMS4zIDEuMy0xLjcgMS40LTAuNiAyLjMtMC42em0wIDAuOGMtMC45IDAtMS41IDAuMy0yLjEgMC45LTAuNSAwLjYtMC44IDEuNC0wLjkgMi41aDUuNmMwLTAuNy0wLjEtMS4yLTAuMy0xLjdzLTAuNS0wLjktMC44LTEuMmMtMC41LTAuNC0wLjktMC41LTEuNS0wLjV6Ii8+DQoJCTxwYXRoIGQ9Im0zNy41IDYyLjZjMC4yIDAgMC40IDAuMSAwLjUgMC4yczAuMSAwLjMgMC4xIDAuNSAwIDAuNC0wLjEgMC41LTAuMyAwLjItMC41IDAuMi0wLjMtMC4xLTAuNC0wLjItMC4xLTAuMy0wLjEtMC41IDAtMC40IDAuMS0wLjVjMC0wLjEgMC4yLTAuMiAwLjQtMC4yem0wLjQgMy4zdjguOWgtMC45di04LjloMC45eiIvPg0KCQk8cGF0aCBkPSJtNDQuOCA2NS43YzEgMCAxLjggMC4zIDIuMyAwLjhzMC44IDEuMyAwLjggMi41djUuOGgtMC44di01LjhjMC0wLjktMC4yLTEuNS0wLjYtMi0wLjQtMC40LTEtMC42LTEuOC0wLjYtMSAwLTEuNyAwLjMtMi4yIDAuOXMtMC44IDEuNC0wLjggMi42djQuOWgtMC44di04LjloMC43bDAuMSAxLjZjMC4yLTAuMyAwLjQtMC42IDAuNy0wLjlzMC42LTAuNSAxLTAuNmMwLjQtMC4yIDAuOC0wLjMgMS40LTAuM3oiLz4NCgkJPHBhdGggZD0ibTU1LjMgNjIuOGgzLjNjMS41IDAgMi42IDAuMiAzLjMgMC43czEgMS4yIDEgMi4yYzAgMC41LTAuMSAwLjktMC4zIDEuM3MtMC40IDAuNy0wLjggMC45LTAuOCAwLjQtMS4zIDAuNXYwLjFjMC42IDAuMSAxLjEgMC4zIDEuNSAwLjVzMC43IDAuNiAwLjkgMSAwLjMgMC45IDAuMyAxLjRjMCAwLjgtMC4yIDEuNC0wLjUgMS45LTAuNCAwLjUtMC45IDAuOS0xLjUgMS4xcy0xLjQgMC40LTIuMiAwLjRoLTMuN3YtMTJ6bTAuOSA1LjRoMi43YzEuMSAwIDEuOS0wLjIgMi40LTAuNnMwLjgtMSAwLjgtMS43YzAtMC44LTAuMy0xLjQtMC44LTEuN3MtMS40LTAuNS0yLjYtMC41aC0yLjR2NC41em0wIDAuN3Y1LjJoMi44YzEuMSAwIDEuOS0wLjIgMi41LTAuNyAwLjYtMC40IDAuOS0xLjEgMC45LTIgMC0wLjYtMC4xLTEuMS0wLjQtMS40LTAuMy0wLjQtMC43LTAuNi0xLjItMC44cy0xLjItMC4zLTItMC4zaC0yLjZ6Ii8+DQoJCTxwYXRoIGQ9Im02Ni4xIDYyLjZjMC4yIDAgMC40IDAuMSAwLjUgMC4yczAuMSAwLjMgMC4xIDAuNSAwIDAuNC0wLjEgMC41LTAuMyAwLjItMC41IDAuMi0wLjMtMC4xLTAuNC0wLjItMC4xLTAuMy0wLjEtMC41IDAtMC40IDAuMS0wLjUgMC4yLTAuMiAwLjQtMC4yem0wLjQgMy4zdjguOWgtMC44di04LjloMC44eiIvPg0KCQk8cGF0aCBkPSJNNzAuMyw3NC44aC0wLjhWNjIuMWgwLjhWNzQuOHoiLz4NCgkJPHBhdGggZD0ibTc2LjUgNzVjLTEuMiAwLTIuMi0wLjQtMi44LTEuMnMtMS0xLjktMS0zLjQgMC4zLTIuNyAxLTMuNSAxLjYtMS4yIDIuOC0xLjJjMC41IDAgMSAwLjEgMS4zIDAuMiAwLjQgMC4yIDAuNyAwLjQgMSAwLjYgMC4zIDAuMyAwLjUgMC42IDAuNiAwLjloMC4xdi0wLjktMC45LTMuNmgwLjh2MTIuOGgtMC43bC0wLjEtMS42Yy0wLjEgMC4zLTAuNCAwLjYtMC42IDAuOS0wLjMgMC4zLTAuNiAwLjUtMSAwLjctMC40IDAuMS0wLjggMC4yLTEuNCAwLjJ6bTAuMS0wLjdjMS4xIDAgMS44LTAuMyAyLjItMXMwLjctMS42IDAuNy0yLjh2LTAuMWMwLTEuMy0wLjItMi4yLTAuNy0yLjktMC40LTAuNy0xLjItMS0yLjItMXMtMS43IDAuMy0yLjMgMS0wLjggMS43LTAuOCAzYzAgMS4yIDAuMiAyLjIgMC43IDIuOCAwLjYgMC43IDEuNCAxIDIuNCAxeiIvPg0KCQk8cGF0aCBkPSJtMTcuMSA5NS0zLjQtOC45aDAuOWwyLjMgNi4xYzAuMSAwLjQgMC4zIDAuNyAwLjQgMS4xczAuMiAwLjYgMC4zIDAuOWwwLjMtMC45YzAuMS0wLjMgMC4yLTAuNyAwLjQtMS4xbDIuMy02LjFoMC45bC0zLjYgOC45aC0wLjh6Ii8+DQoJCTxwYXRoIGQ9Im0yNi4yIDg1LjljMC44IDAgMS40IDAuMiAxLjkgMC41IDAuNSAwLjQgMC45IDAuOCAxLjEgMS41IDAuMyAwLjYgMC40IDEuMyAwLjQgMi4xdjAuNmgtNi40YzAgMS4yIDAuMyAyLjIgMC45IDIuOCAwLjYgMC43IDEuNCAxIDIuNCAxIDAuNiAwIDEgMCAxLjQtMC4xczAuOS0wLjIgMS40LTAuNXYwLjhjLTAuNSAwLjItMC45IDAuNC0xLjMgMC40LTAuNCAwLjEtMC45IDAuMS0xLjUgMC4xLTAuOSAwLTEuNy0wLjItMi4zLTAuNnMtMS4xLTAuOS0xLjQtMS42LTAuNS0xLjUtMC41LTIuNCAwLjEtMS43IDAuNC0yLjQgMC43LTEuMyAxLjMtMS43YzAuNy0wLjMgMS40LTAuNSAyLjItMC41em0wIDAuN2MtMC45IDAtMS41IDAuMy0yLjEgMC45LTAuNSAwLjYtMC44IDEuNC0wLjkgMi41aDUuNmMwLTAuNy0wLjEtMS4yLTAuMy0xLjdzLTAuNS0wLjktMC44LTEuMmMtMC40LTAuMy0wLjktMC41LTEuNS0wLjV6Ii8+DQoJCTxwYXRoIGQ9Im0zNS42IDg1LjloMC43czAuNCAwLjEgMC42IDAuMWwtMC4xIDAuOGMtMC4yIDAtMC40LTAuMS0wLjUtMC4xaC0wLjZjLTAuNCAwLTAuOCAwLjEtMS4xIDAuMi0wLjMgMC4yLTAuNiAwLjQtMC44IDAuN3MtMC40IDAuNy0wLjUgMS4xLTAuMiAwLjktMC4yIDEuNHY0LjloLTAuOHYtOC45aDAuN2wwLjEgMS43YzAuMS0wLjMgMC4zLTAuNyAwLjYtMC45IDAuMi0wLjMgMC41LTAuNSAwLjktMC43IDAuMi0wLjIgMC42LTAuMyAxLTAuM3oiLz4NCgkJPHBhdGggZD0ibTQyIDg2LjhoLTIuMXY4LjJoLTAuOXYtOC4yaC0xLjd2LTAuNWwxLjctMC4ydi0xYzAtMC43IDAuMS0xLjIgMC4zLTEuNnMwLjUtMC44IDAuOS0xIDAuOS0wLjMgMS41LTAuM2MwLjMgMCAwLjYgMCAwLjggMC4xIDAuMiAwIDAuNSAwLjEgMC43IDAuMmwtMC4yIDAuNmMtMC4yLTAuMS0wLjQtMC4xLTAuNi0wLjItMC4yIDAtMC41LTAuMS0wLjctMC4xLTAuNiAwLTEuMSAwLjItMS40IDAuNS0wLjMgMC40LTAuNCAwLjktMC40IDEuN3YxaDIuMXYwLjh6Ii8+DQoJCTxwYXRoIGQ9Im01MC42IDg2LjF2OC45aC0wLjZsLTAuMS0xLjYtMC42IDAuOWMtMC4zIDAuMy0wLjYgMC41LTEgMC42LTAuNCAwLjItMC45IDAuMi0xLjQgMC4yLTAuNyAwLTEuMy0wLjEtMS43LTAuNC0wLjUtMC4yLTAuOC0wLjYtMS0xLjFzLTAuNC0xLjEtMC40LTEuOHYtNS44aDAuOHY1LjhjMCAwLjkgMC4yIDEuNSAwLjYgMiAwLjQgMC40IDEgMC42IDEuOCAwLjYgMC43IDAgMS4yLTAuMSAxLjctMC40IDAuNC0wLjMgMC44LTAuNiAxLTEuMXMwLjQtMS4yIDAuNC0xLjl2LTQuOWgwLjV6bS01LjUtMi41YzAtMC4yIDAtMC4zIDAuMS0wLjUgMC4xLTAuMSAwLjItMC4yIDAuNC0wLjJzMC4zIDAuMSAwLjQgMC4yIDAuMSAwLjMgMC4xIDAuNSAwIDAuNC0wLjEgMC41LTAuMiAwLjItMC40IDAuMi0wLjMtMC4xLTAuNC0wLjItMC4xLTAuMy0wLjEtMC41em0zLjEgMGMwLTAuMiAwLTAuMyAwLjEtMC41IDAuMS0wLjEgMC4yLTAuMiAwLjQtMC4yczAuMyAwLjEgMC40IDAuMiAwLjEgMC4zIDAuMSAwLjUgMCAwLjQtMC4xIDAuNS0wLjIgMC4yLTAuNCAwLjItMC4zLTAuMS0wLjQtMC4yLTAuMS0wLjMtMC4xLTAuNXoiLz4NCgkJPHBhdGggZD0ibTU2IDk5LjFjLTEuMSAwLTItMC4yLTIuNi0wLjZzLTAuOS0xLTAuOS0xLjhjMC0wLjYgMC4yLTEuMSAwLjYtMS42IDAuNC0wLjQgMC45LTAuNyAxLjUtMC44LTAuMy0wLjEtMC41LTAuMy0wLjYtMC41LTAuMi0wLjItMC4yLTAuNC0wLjItMC43czAuMS0wLjYgMC4zLTAuOSAwLjUtMC41IDAuOS0wLjdjLTAuNS0wLjItMC45LTAuNS0xLjItMC45cy0wLjQtMS0wLjQtMS42IDAuMS0xLjEgMC40LTEuNiAwLjYtMC44IDEuMS0xIDEtMC40IDEuNy0wLjRoMC41IDAuNGMwLjEgMCAwLjMgMC4xIDAuNCAwLjFoMi45djAuNmwtMS44IDAuMWMwLjIgMC4zIDAuNCAwLjYgMC41IDAuOXMwLjIgMC43IDAuMiAxLjFjMCAwLjktMC4zIDEuNi0wLjggMi4xLTAuNiAwLjUtMS4zIDAuOC0yLjMgMC44LTAuMyAwLTAuNSAwLTAuOC0wLjEtMC4zIDAuMi0wLjYgMC40LTAuOCAwLjZzLTAuMyAwLjQtMC4zIDAuN2MwIDAuMiAwLjEgMC4zIDAuMiAwLjUgMC4xIDAuMSAwLjMgMC4yIDAuNSAwLjNzMC41IDAuMSAwLjggMC4xaDEuNmMxIDAgMS43IDAuMiAyLjIgMC42czAuOCAxIDAuOCAxLjdjMCAwLjktMC40IDEuNy0xLjIgMi4yLTEuMSAwLjUtMi4yIDAuOC0zLjYgMC44em0wLTAuN2MwLjggMCAxLjQtMC4xIDItMC4zIDAuNS0wLjIgMC45LTAuNCAxLjItMC44IDAuMy0wLjMgMC40LTAuNyAwLjQtMS4yIDAtMC40LTAuMS0wLjctMC4zLTAuOXMtMC41LTAuNC0wLjgtMC41LTAuOC0wLjEtMS4yLTAuMWgtMS41Yy0wLjUgMC0wLjkgMC4xLTEuMyAwLjJzLTAuNyAwLjMtMC45IDAuNi0wLjMgMC43LTAuMyAxLjFjMCAwLjYgMC4yIDEgMC43IDEuNCAwLjUgMC4zIDEuMSAwLjUgMiAwLjV6bTAuMy03LjRjMC43IDAgMS4zLTAuMiAxLjctMC42czAuNi0wLjkgMC42LTEuNmMwLTAuOC0wLjItMS4zLTAuNi0xLjdzLTEtMC42LTEuNy0wLjYtMS4zIDAuMi0xLjcgMC42LTAuNiAxLTAuNiAxLjcgMC4yIDEuMiAwLjYgMS42IDAuOSAwLjYgMS43IDAuNnoiLz4NCgkJPHBhdGggZD0ibTYzLjIgODIuMnYzLjYgMSAwLjljMC4yLTAuNiAwLjYtMSAxLjEtMS40czEuMi0wLjUgMi0wLjVjMS4yIDAgMi4xIDAuNCAyLjcgMS4yczAuOSAxLjkgMC45IDMuNGMwIDAuOS0wLjEgMS43LTAuNCAyLjRzLTAuNyAxLjItMS4zIDEuNi0xLjMgMC42LTIuMSAwLjYtMS40LTAuMi0xLjktMC41LTAuOC0wLjctMS4xLTEuMmgtMC4xdjEuN2gtMC42di0xMi44aDAuOHptMyA0LjRjLTAuNyAwLTEuMyAwLjItMS43IDAuNXMtMC44IDAuNy0xIDEuMy0wLjMgMS4zLTAuMyAyLjF2MC4xYzAgMS4yIDAuMiAyLjIgMC43IDIuOCAwLjQgMC42IDEuMiAxIDIuMiAxczEuNy0wLjMgMi4zLTFjMC41LTAuNyAwLjgtMS43IDAuOC0yLjkgMC0xLjMtMC4yLTIuMy0wLjctMi45LTAuNi0wLjYtMS40LTEtMi4zLTF6Ii8+DQoJCTxwYXRoIGQ9Im03NS41IDg1LjljMSAwIDEuNyAwLjIgMi4yIDAuN3MwLjcgMS4zIDAuNyAyLjR2NmgtMC42bC0wLjEtMS42Yy0wLjIgMC4zLTAuNCAwLjYtMC43IDAuOXMtMC42IDAuNS0xIDAuNi0wLjkgMC4yLTEuNCAwLjJjLTAuNiAwLTEuMS0wLjEtMS41LTAuM3MtMC43LTAuNS0wLjktMC44Yy0wLjItMC40LTAuMy0wLjgtMC4zLTEuMyAwLTAuOSAwLjQtMS42IDEuMS0yIDAuNy0wLjUgMS44LTAuNyAzLjItMC44bDEuNy0wLjF2LTAuNmMwLTAuOS0wLjItMS42LTAuNS0yLTAuNC0wLjQtMC45LTAuNi0xLjYtMC42LTAuNSAwLTAuOSAwLjEtMS4zIDAuMnMtMC45IDAuMy0xLjMgMC41bC0wLjMtMC43YzAuNC0wLjIgMC45LTAuNCAxLjQtMC41IDAuMS0wLjEgMC42LTAuMiAxLjItMC4yem0yLjEgNC42aC0xLjZjLTEuMSAwLjEtMiAwLjMtMi42IDAuNi0wLjYgMC40LTAuOSAwLjktMC45IDEuNiAwIDAuNiAwLjIgMSAwLjUgMS4zIDAuNCAwLjMgMC44IDAuNCAxLjUgMC40IDEgMCAxLjctMC4zIDIuMi0wLjggMC41LTAuNiAwLjgtMS4zIDAuOC0yLjNsMC4xLTAuOHoiLz4NCgkJPHBhdGggZD0ibTg0LjggODUuOWgwLjdzMC40IDAuMSAwLjYgMC4xbC0wLjEgMC44Yy0wLjIgMC0wLjQtMC4xLTAuNS0wLjFoLTAuNmMtMC40IDAtMC44IDAuMS0xLjEgMC4yLTAuMyAwLjItMC42IDAuNC0wLjggMC43cy0wLjQgMC43LTAuNSAxLjEtMC4yIDAuOS0wLjIgMS40djQuOWgtMC45di04LjloMC42bDAuMSAxLjdjMC4xLTAuMyAwLjMtMC43IDAuNi0wLjkgMC4yLTAuMyAwLjUtMC41IDAuOS0wLjdzMC44LTAuMyAxLjItMC4zeiIvPg0KPC9zdmc+DQo=',
                                language: typeof bookInfo.language !== 'undefined' ? this.languageMap[bookInfo.language] : '',
                            };

                            this.bookResults.push(book);
                        }
                    } else {
                        this.bookResults = [];
                        this.noResults = true;
                        setTimeout(() => {
                            this.noResults = false;
                        }, 2000);
                    }
                })
                    .catch(error => {
                        console.error('Error:', error);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            } else {
                this.bookResults = [];
            }
        },
        selectResultBook: function (result) {
            this.currentBook.title = result.title;
            this.currentBook.author = result.author;
            this.currentBook.language = result.language;
        },
        sortListBy: function (list, criterion, sortAscending) {
            list.sort((a, b) => {
                let elementA, elementB;
                if (criterion === 'title') {
                    elementA = a.title.toLowerCase();
                    elementB = b.title.toLowerCase();
                } else if (criterion === 'author') {
                    elementA = a.author.toLowerCase();
                    elementB = b.author.toLowerCase();
                } else if (criterion === 'language') {
                    elementA = a.language.toLowerCase();
                    elementB = b.language.toLowerCase();
                } else if (criterion === 'points') {
                    elementA = a.points;
                    elementB = b.points;
                } else if (criterion === 'isbn') {
                    elementA = a.isbn.toLowerCase();
                    elementB = b.isbn.toLowerCase();
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

        checkIfBookChangedAndAskIfSaveAndThenDoAndHopeThatItWorks: function (_callback) {
            if (typeof this.currentBook === 'object') {
                if (!this.isBookEqual(this.currentBookBeforeEdit, this.currentBook)) {
                    this.ask({
                        type: 'warning',
                        subtitle: 'Änderungen speichern',
                        content: `Sie haben Informationen des Buchs “${this.currentBook.title}” geändert und nicht gespeichert. Möchten Sie diese aktualisieren?`,
                        okButton: 'Verwerfen',
                        noButton: 'Speichern'
                    }, () => {
                        _callback();
                    }, () => {
                        if (this.saveBook()) _callback();
                    });
                } else {
                    _callback();
                }
            } else {
                _callback();
            }
        },

        isBookEqual: function (book1, book2) {
            let isequal = (book1.title == book2.title && book1.author == book2.author && book1.language == book2.language && book1.points == book2.points && book1.isbn == book2.isbn)
            return isequal
        }
    },

    beforeMount() {
        this.updateStudentsRemote();
        this.updateBooksRemote();
    },

    mounted() {
        var that = this;
        ipcRenderer.on("updateDataRemote", function () {
            that.updateBooksRemote();
        });
    },

    computed: {
        filteredBooksList() {
            var s = this.searchBook.toLowerCase();
            return this.sortListBy(this.books.filter(book => {
                return (book.title.toLowerCase().includes(s) || book.author.toLowerCase().includes(s) || book.language.toLowerCase().includes(s) || book.isbn.toLowerCase().includes(s))
            }), this.booksSortBy, this.booksSortAscending)
        }
    }
}
</script>
