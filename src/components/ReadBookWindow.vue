<template>
    <transition name="fade">
        <div class="addbookwindow-background">
            <div class="addbookwindow-window">
                <div class="addbookwindow-title">Buch hinzufügen</div>
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
                <div class="addbookwindow-buttons">
                    <Button text="Abbrechen" @click="close(false)" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Button from "@/components/Button.vue"
import SearchBar from "@/components/SearchBar.vue"

export default {
    data() {
        return {
            searchBook: '',
        }
    },

    components: {
        Button,
        SearchBar,
    },

    props: ['books'],

    methods: {
        close(result) {
            this.$emit("close", result);
        },

        selectBook(book) {
            this.$emit("selectBook", book);
        },
    },
    
    computed: {
        filteredBooksList() {
            console.log(this.books)
            var s = this.searchBook.toLowerCase();
            return this.books.filter(book => {
                return (book.title.toLowerCase().includes(s) || book.author.toLowerCase().includes(s) || book.language.toLowerCase().includes(s) || book.isbn.toLowerCase().includes(s))
            })
        }
    }
}
</script>

<style>
.addbookwindow-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #0003;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
}

.addbookwindow-window {
    width: 60em;
    height: 70vh;
    border-radius: 12px;
    box-shadow: 0 0 80px 15px #0003;
    padding: 2.5em;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 33px 40px 1fr 40px;
    gap: 28px;
    background: white;
}

.addbookwindow-window .addbookwindow-title {
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
}

.addbookwindow-window .addbookwindow-buttons button {
    margin-left: unset;
}

.addbookwindow-window .addbookwindow-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    column-gap: 17px;
}

.addbookwindow-fade-enter,
.addbookwindow-fade-leave-to {
    opacity: 0;
}

.addbookwindow-fade-enter-active,
.addbookwindow-fade-leave-active {
    transition: opacity .3s ease;
}
</style>