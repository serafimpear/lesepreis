<template>
    <div class="books-list-section">
        <h1>Bücher</h1>
        <SearchBar v-model="searchBook" placeholder="Suche Bücher..." />
            <div class="books-list ui-table">
                <div class="table-row table-header-row">
                    <div class="table-cell">Titel<SortIcon /></div>
                    <div class="table-cell">Autor:in<SortIcon /></div>
                    <div class="table-cell">Sprache<SortIcon /></div>
                    <div class="table-cell">Lose<SortIcon /></div>
                    <div class="table-cell">IBAN<SortIcon /></div>
                </div>
                <div class="table-row" v-for="book in filteredBooksList" @click="">
                    <div class="table-cell">{{ book.title }}</div>
                    <div class="table-cell">{{ book.author }}</div>
                    <div class="table-cell">{{ book.language }}</div>
                    <div class="table-cell">{{ book.points }}</div>
                    <div class="table-cell">{{ book.iban }}</div>
                </div>
            </div>
        <div class="books-list-section-footer">
            <Button type="add" text="Buch hinzuf&uuml;gen" />
        </div>
    </div>
</template>

<style>
.books-list-section {
    padding: 30px;
    display: grid;
    grid-template-rows: 68px 40px 1fr 40px;
    gap: 20px;
    width: 100%;
}

div.books-list div.table-row {
    grid-template-columns: 1fr 1fr 5em 3em 10em;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

<script>
import SearchBar from "@/components/SearchBar.vue"
import Button from "@/components/Button.vue"
import SortIcon from "@/components/SortIcon.vue"
import { students, books } from '@/assets/data.js';


export default {
    components: {
        SearchBar,
        Button,
        SortIcon
    },

    data() {
        return {
            students: students,
            books: books,
            searchBook: '',
        }
    },

    methods: { },

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