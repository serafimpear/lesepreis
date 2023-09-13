<template>
    <transition name="fade">
        <div class="addbookwindow-background">
            <div class="addbookwindow-window">
                <div class="addbook-window-title">
                    <div class="addbook-window-title-title">Bücher verwalten</div>
                    <Button text="Nicht gelesen" />
                    <Button text="Gelesen" />
                </div>
                <SearchBar placeholder="Suche Bücher..." v-model="searchBook" />
                <div class="books-list-add-unread ui-table">
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
                    </div>
                    <div class="table-data">
                        <template v-for="currentBook in books" >
                            <div class="table-row" v-if="!currentStudent.books.some(book => book.id === currentBook.id)" @click="selectedBook = currentBook">
                                <div class="table-cell">{{ currentBook.title }}</div>
                                <div class="table-cell">{{ currentBook.author }}</div>
                                <div class="table-cell">{{ currentBook.language }}</div>
                                <div class="table-cell">{{ currentBook.points }}</div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="addbookwindow-buttons">
                    <div class="addbook-window-passed-radio-box">
                        <div class="addbook-window-passed-radio-box-title">Prüfung</div>
                        <RadioInput text="bestanden" color="green" @click="bookPassed = true" />
                        <RadioInput text="nicht bestanden" color="red" @click="bookPassed = false" />
                    </div>
                    <Button text="Abbrechen" @click="close(false)" />
                    <Button text="Hinzufügen" @click="selectBook" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Button from "@/components/Button.vue"
import SearchBar from "@/components/SearchBar.vue"
import RadioInput from "@/components/RadioInput.vue"

export default {
    data() {
        return {
            searchBook: '',
            bookPassed: false,
            selectedBook: undefined
        }
    },

    components: {
        Button,
        SearchBar,
        RadioInput
    },

    props: ['books', 'currentStudent'],

    methods: {
        close(result) {
            this.$emit("close", result);
        },

        selectBook() {
            this.$emit("selectBook", [this.selectedBook.id, this.bookPassed]);
            console.log('bookid: ' + bookid)
        },
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
    gap: 1.7em;
    background: white;
}

.addbookwindow-window .addbook-window-title-title {
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
}

.addbookwindow-window .addbookwindow-buttons button {
    margin-left: unset;
}

.addbookwindow-window .addbookwindow-buttons {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
    column-gap: 1em;
}

.addbook-window-passed-radio-box {
    margin-right: auto;
    display: flex;
    flex-direction: row;
    column-gap: 1em;
}

.addbook-window-title {
    display: flex;
    column-gap: 1em;
}

.addbook-window-title-title {
    margin-right: auto;
}

.ui-table.books-list-add-unread .table-row {
    grid-template-columns: 1fr 1fr 5em 3em;
}

.addbook-window-passed-radio-box-title {
    font-size: 1em;
    font-style: normal;
    font-weight: 600;
}
</style>