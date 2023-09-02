<template>
    <main id="main-books">
        <div class="books-list-section">
            <h1>Bücher</h1>
            <SearchBar placeholder="Suche Bücher..." v-model="searchBook" />
            <div class="books-list ui-table">
                <div class="table-row table-header-row">
                    <div class="table-cell">Titel
                        <SortIcon />
                    </div>
                    <div class="table-cell">Autor:in
                        <SortIcon />
                    </div>
                    <div class="table-cell">Sprache
                        <SortIcon />
                    </div>
                    <div class="table-cell">Lose
                        <SortIcon />
                    </div>
                    <div class="table-cell">ISBN
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
                            number="number" :value=currentBook.points />
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
.books-list-section {
    display: grid;
    grid-template-rows: 68px 40px 1fr 40px;
    gap: 20px;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

div.books-list div.table-row {
    grid-template-columns: 1fr 1fr 5em 3em 10em;
    text-overflow: ellipsis;
    white-space: nowrap;
}

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

export default {
    components: {
        SearchBar,
        Button,
        SortIcon,
        InputField,
        LoadingIcon,
        IconButton
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
            this.currentBook = this.deepClone(book);
            this.bookResults = [];
            this.showBookInfo = true;
            console.log('Book selcted ' + this.currentBook);
        },

        closeBook: function (book) {
            this.currentBook = undefined;
            this.bookResults = [];
            this.showBookInfo = false;
            console.log('Book closed ' + this.currentBook);
        },

        saveBook: function () {
            console.log(this.currentBook.title + ' saved');

            ipcRenderer.send("addBook", JSON.stringify(this.currentBook));
            if (this.currentBook.id == -1) {
                this.currentBook.id = this.books.length;
                this.books.push(this.currentBook);
            }
            this.currentBook = undefined;
            this.bookResults = [];
            this.showBookInfo = false;

            this.updateBooksRemote();
            
        },

        deleteBook: function () {
            if (this.currentBook.id == -1) {
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
                alert(`Sie können das Buch "${this.currentBook.title}" nicht löschen!\nDieses Buch haben ${readCount} Schüler gelesen. Um es zu löschen, entfernen sie bei jedem Schüler dieses aus der liste der gelesenen Bücher!`);
                return;
            }
            console.log(this.currentBook.title + ' deleted');

            ipcRenderer.send("deleteBook", JSON.stringify(this.currentBook));

            this.updateBooksRemote();
            this.updateStudentsRemote();
            this.currentBook = undefined;
            this.bookResults = [];
            this.showBookInfo = false;
        },

        newBook: function () {
            console.log('open new book');
            this.bookResults = [];
            this.currentBook = {
                id: -1,
                title: "",
                author: "",
                language: "",
                foreign_language: false,
                points: 0,
                isbn: "",
            },
                this.showBookInfo = true;
            this.isNew = true;

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
        }
    },

    beforeMount() {
        this.updateStudentsRemote();
        this.updateBooksRemote();
    },

    computed: {
        filteredBooksList() {
            var s = this.searchBook.toLowerCase();
            return this.books.filter(book => {
                return (book.title.toLowerCase().includes(s) || book.author.toLowerCase().includes(s) || book.language.toLowerCase().includes(s) || book.isbn.toLowerCase().includes(s))
            })
        }
    }
}
</script>