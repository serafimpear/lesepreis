<template>
    <transition name="fade">
        <div class="addbookwindow-background">
            <div class="addbookwindow-window">
                <div class="addbook-window-title">
                    <div class="addbook-window-title-title">Bücher verwalten</div>
                    <Button text="Nicht gelesen" :tclass="currentView != 'read_books' ? '' :'diselected-button'" @click="changeCurrentView('not_read_books')" />
                    <Button text="Gelesen" :tclass="currentView != 'read_books' ? 'diselected-button' : ''" @click="changeCurrentView('read_books'); searchBookFromNotRead = ''" />
                    <IconButton @click="close(false)" type="no" />
                </div>
                <SearchBar v-bind:disabled="currentView == 'read_books'" :style="'opacity:' + (currentView != 'read_books' ? '1' : '0.5') + '; ' + 'pointer-events:' + (currentView != 'read_books' ? 'all' : 'none') + ';'" v-model="searchBookFromNotRead" tabindex="1" placeholder="Buch suchen..." />
                <div class="books-list-add-unread ui-table" v-if="currentView == 'not_read_books'">
                    <div class="table-row table-header-row">
                        <div class="table-cell">Titel
                            <SortIcon @click="booksSortBy = 'title'" />
                        </div>
                        <div class="table-cell">Autor:in
                            <SortIcon @click="booksSortBy = 'autor'" />
                        </div>
                        <div class="table-cell">Sprache
                            <SortIcon @click="booksSortBy = 'language'" />
                        </div>
                        <div class="table-cell">Lose
                            <SortIcon @click="booksSortBy = 'points'" />
                        </div>
                    </div>
                    <div class="table-data">
                        <template v-for="currentBook in filteredBooksFromNotRead">
                            <div :class="{ 'table-row': true, 'highlighted': selectedBook?.id === currentBook.id }"
                                v-if="!studentBooks.has(currentBook.id)"
                                @click="if (selectedBook?.id == currentBook.id) { selectedBook = null; } else { selectedBook = currentBook; } bookPassed = undefined" >
                                <div class="table-cell">{{ currentBook.title }}</div>
                                <div class="table-cell">{{ currentBook.author }}</div>
                                <div class="table-cell">{{ currentBook.language }}</div>
                                <div class="table-cell">{{ currentBook.points }}</div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="books-list-add-read ui-table" v-if="currentView == 'read_books'">
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
                        <template v-for="student_book in studentBooks.values()">
                            <div :class="{ 'table-row': true, 'highlighted': selectedBook?.id == student_book.book_id }"
                                @click="if (selectedBook?.id == student_book.book_id) { selectedBook = null; } else { selectedBook = books.get(student_book.book_id); } bookPassed = undefined ">
                                <div v-if="student_book.passed" class="table-cell" title="Prüfung bestanden"><img
                                        src="@/assets/svgs/icon-yes.svg" class="table-icon"></div>
                                <div v-else class="table-cell" title="Prüfung NICHT bestanden"><img
                                        src="@/assets/svgs/icon-no.svg" class="table-icon">
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.get(student_book.book_id).title }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.get(student_book.book_id).author }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.get(student_book.book_id).language }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ new
                                                Date(student_book.date_added).toLocaleDateString("de-DE") }}</div>
                                </div>
                                <div class="table-cell">
                                    <div class="table-cell-centered-content">{{ books.get(student_book.book_id).points }}</div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="addbookwindow-buttons">
                    <div class="addbook-window-passed-radio-box"
                        v-if="(selectedBook !== null) && (currentView == 'not_read_books')">
                        <div class="addbook-window-passed-radio-box-title">Prüfung</div>
                        <RadioInput inputid="radio_aw_1" text="bestanden" color="green" @click="bookPassed = true" />
                        <RadioInput inputid="radio_aw_2" text="nicht bestanden" color="red" @click="bookPassed = false" />
                    </div>
                    <div class="addbook-window-passed-radio-box"
                        v-if="(selectedBook !== null) && (currentView == 'read_books')">
                        <div class="addbook-window-passed-radio-box-title">Prüfung</div>
                        <RadioInput inputid="radio_aw_1" text="bestanden" color="green" @click="bookPassed = true"
                            :checked="studentBooks.get(selectedBook.id).passed" />
                        <RadioInput inputid="radio_aw_2" text="nicht bestanden" color="red" @click="bookPassed = false"
                            :checked="!studentBooks.get(selectedBook.id).passed" />
                    </div>
                    <DateInputField class="addbook-window-date-picker" v-if="selectedBook !== null && currentView == 'not_read_books'" v-model="date_added" text="Datum" />
                    <!-- <Button text="Abbrechen" @click="close(false)" /> -->
                    <Button
                        v-if="(typeof bookPassed == 'boolean' && selectedBook !== null) && currentView == 'not_read_books'"
                        text="Hinzufügen" @click="selectBook" color="green" />
                    <Button v-if="selectedBook !== null && currentView == 'read_books'" text="Entfernen"
                        @click="removeBook" color="red" tclass="remove-button" />
                    <Button v-if="(selectedBook !== null && currentView == 'read_books') && ((selectedBook.passed != bookPassed) && typeof bookPassed == 'boolean')"
                        text="Änderungen speichern" @click="updateBook" color="green" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Button from "@/components/Button.vue"
import SearchBar from "@/components/SearchBar.vue"
import RadioInput from "@/components/RadioInput.vue"
import InputField from "@/components/InputField.vue"
import IconButton from "@/components/IconButton.vue"
import DateInputField from "@/components/DateInputField.vue"

export default {
    data() {
        return {
            searchBook: '',
            bookPassed: undefined,
            selectedBook: null,
            currentView: 'not_read_books',
            searchBookFromNotRead: '',
            date_added: Date.now()
        }
    },

    components: {
        Button,
        SearchBar,
        RadioInput,
        InputField,
        IconButton,
        DateInputField
    },

    props: ['books', 'studentBooks'],

    methods: {
        reset() {
            this.bookPassed = undefined;
            this.selectedBook = null
            try {
            document.getElementById("radio_aw_1").checked = false
            document.getElementById("radio_aw_2").checked = false
            } catch (e) {}
        },

        close(result) {
            this.$emit("close", result);
            this.reset();
        },

        selectBook() {
            this.$emit("selectBook", [this.selectedBook.id, this.bookPassed, this.date_added]);
            this.reset();
        },

        updateBook() {
            this.$emit("updateBook", [this.selectedBook.id, this.bookPassed]);
            this.reset();
        },

        removeBook() {
            this.$emit("removeBook", this.selectedBook.id);
            this.reset();
        },

        changeCurrentView (view) {
            this.currentView = view;
            this.reset();
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
        }
    },

    computed: {
        filteredBooksFromNotRead() {
            var s = this.searchBookFromNotRead.toLowerCase();
            
            return this.sortListBy([...this.books.values()].filter(book => {
                return (book.title.toLowerCase().includes(s) || book.author.toLowerCase().includes(s) || book.language.toLowerCase().includes(s) || book.isbn.toLowerCase().includes(s))
            }), this.booksSortBy, this.booksSortAscending)
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
    grid-template-rows: 33px 2.5em 1fr 40px;
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

.ui-table.books-list-add-read .table-row {
    grid-template-columns: 26px 1fr 1fr 5em 5em 3em;
}

.addbook-window-passed-radio-box-title {
    font-size: 1em;
    font-style: normal;
    font-weight: 600;
}

.addbookwindow-window .table-row.highlighted {
    background: #7b98c7 !important;
}

button.diselected-button {
    border: none;
}

.addbook-window-date-picker {
    margin-right: auto;
    width: 10em;
}

button.remove-button {
    margin-left: auto !important;
}
</style>