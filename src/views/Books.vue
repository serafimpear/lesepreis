<template>
    <main id="main-books">
        <div class="books-list-section">
            <h1>Bücher</h1>
            <SearchBar v-model="searchBook" placeholder="Suche Bücher..." />
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
                    <div class="table-cell">IBAN
                        <SortIcon />
                    </div>
                </div>
                <div class="table-data">
                    <div class="table-row" v-for="book in filteredBooksList" @click="selectBook(book)">
                        <div class="table-cell">{{ book.title }}</div>
                        <div class="table-cell">{{ book.author }}</div>
                        <div class="table-cell">{{ book.language }}</div>
                        <div class="table-cell">{{ book.points }}</div>
                        <div class="table-cell">{{ book.iban }}</div>
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
                    <Button type="yes" text="Speichern und schließen" @click="saveBook()" />
                </div>
                <div class="book-information">
                    <InputField text="Titel&nbsp;&nbsp;&nbsp;" variable="" :value=currentBook.title />
                    <InputField text="Autor" variable="" :value=currentBook.author />
                    <InputField text="Sprache" variable="" :value=currentBook.language />
                    <InputField text="Lose&nbsp;&nbsp;&nbsp;" variable="" number="number" :value=currentBook.points />
                    <InputField text="IBAN" variable="" :value=currentBook.iban />
                </div>
            </div>
            <div v-else id="no_book_selected">Klicken Sie auf ein Buch,<br>
                um dessen Informationen zu bearbeiten</div>
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
import SearchBar from "@/components/SearchBar.vue"
import Button from "@/components/Button.vue"
import SortIcon from "@/components/SortIcon.vue"
import InputField from "@/components/InputField.vue"
import { students, books } from '@/assets/data.js';


export default {
    components: {
        SearchBar,
        Button,
        SortIcon,
        InputField
    },

    data() {
        return {
            students: students,
            books: books,
            searchBook: '',
            currentBook: undefined,
            showBookInfo: false
        }
    },

    methods: {
        selectBook: function (book) {
            this.currentBook = book;
            this.showBookInfo = true;
            console.log('Book selcted ' + this.currentBook);
        },

        saveBook: function () {
            console.log(this.currentBook.title + ' saved');
            this.currentBook = undefined;
            this.showBookInfo = false;
        },

        newBook: function () {
            console.log('open new book');
            this.currentBook = {
                id: 1,
                title: "",
                author: "",
                language: "",
                foreign_language: false,
                points: 0,
                iban: "",
            },
                this.showBookInfo = true;
        }
    },

    computed: {
        filteredBooksList() {
            var s = this.searchBook.toLowerCase();
            return this.books.filter(book => {
                return (book.title.toLowerCase().includes(s) || book.author.toLowerCase().includes(s) || book.language.toLowerCase().includes(s) || book.iban.toLowerCase().includes(s))
            })
        }
    }
}
</script>