<template>
    <main id="main-books">
        <div class="books-list-section">
            <h1>Bücher</h1>
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
                <Button type="add" text="Buch hinzuf&uuml;gen" @click="newBook()" />
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
                    <InputField v-model="currentBook.title" text="Titel&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                        variable="" :value=currentBook.title />
                    <InputField text="Autor&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" v-model="currentBook.author" variable=""
                        :value=currentBook.author />
                    <div class="book-language-points">
                        <InputField class="language-input" v-model="currentBook.language" text="Sprache" variable=""
                            :value=currentBook.language />
                        <InputField class="points-input" v-model="currentBook.points" text="Lose" variable=""
                            number="positivnumber" :value=currentBook.points />
                    </div>
                    <InputField text="ISBN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" variable="" :value=currentBook.isbn
                        v-model="currentBook.isbn" @input="searchBookWEB" />
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
            this.currentBook.title = this.currentBook.title.trim();
            this.currentBook.author = this.currentBook.author.trim();
            this.currentBook.language = this.currentBook.language.trim();
            this.currentBook.isbn = this.currentBook.isbn.trim();
            this.currentBook.points = parseInt(this.currentBook.points);
            if (this.currentBook.title == "" || this.currentBook.author == "" || this.currentBook.language == "" || this.currentBook.points == 0) {
                this.ask({
                    type: 'alert',
                    subtitle: 'Buch speichern',
                    content: `Bitte füllen Sie alle Felder aus vor dem Speichern!`,
                }, () => { }, () => { });
                return false;
            }

            ipcRenderer.send("addBook", JSON.stringify(this.currentBook));

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

                ipcRenderer.send("deleteBook", JSON.stringify(this.currentBook));

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
                foreign_language: false,
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
                                thumbnailURL: bookInfo.imageLinks && bookInfo.imageLinks.thumbnail ? bookInfo.imageLinks.thumbnail : '/src/assets/blankCover.svg',
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
