<template>
    <transition name="fade">
        <div class="multiplywindow-background">
            <div class="multiplywindow-window">
                <div class="multiplywindow-title">Bücher multiplizieren
                    <div class="italic-small">Wählen Sie 2 Bücher aus: ein deutsches und eines in einer anderen Sprache
                    </div>
                </div>
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
                    </div>
                    <div class="table-data">
                        <template v-for="cbook in student.books">
                            <div :class="{ 'table-row': true, 'highlighted': selectedBooks.includes(cbook.id) }"
                                v-if="cbook.passed" @click="selectBook(cbook)">
                                <div class="table-cell">{{ books.find(book => book.id === cbook.id).title }}</div>
                                <div class="table-cell">{{ books.find(book => book.id === cbook.id).author }}</div>
                                <div class="table-cell">{{ books.find(book => book.id === cbook.id).language }}</div>
                                <div class="table-cell">{{ books.find(book => book.id === cbook.id).points }}</div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="multiplywindow-buttons">
                    <div v-if="multiplicationPoints" class="multiplication-points-display">Punkte beim Multiplizieren:&nbsp;
                        <span class="font-weight: 300;">{{ multiplicationPoints }}</span>
                    </div>
                    <Button text="Abbrechen" @click="close(false)" />
                    <Button v-if="selectedBooks.length == 2" text="Multiplizieren"
                        @click="this.$emit('multiplyBooks', selectedBooks);" />
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
            selectedBooks: [],
            multiplicationPoints: 0
        }
    },

    components: {
        Button,
        SearchBar,
    },

    props: ['books', 'student'],

    methods: {
        close(result) {
            this.$emit("close", result);
        },

        selectBook: function (cbook) {
            if (!this.selectedBooks.includes(cbook.id)) {

                if (this.selectedBooks.length < 2) {
                    let book_content = this.books.find(book_c => book_c.id == cbook.id);
                    if (this.selectedBooks.length == 0 || ((book_content.language.toUpperCase() == "DEUTSCH") !== ((this.books.find(book => book.id == this.selectedBooks[0])).language.toUpperCase() == "DEUTSCH"))) {
                        this.selectedBooks.push(cbook.id);
                    }
                    // if it is possible to select (if not (e.g. 2nd book is german), do not highlight it):
                }
            } else {
                // if already selected, remove the highlight
                this.selectedBooks.splice(this.selectedBooks.indexOf(cbook.id), 1);
            }
            if (this.selectedBooks.length == 2) {
                // calculate points
                this.multiplicationPoints = this.books.find(book => book.id === this.selectedBooks[0]).points * this.books.find(book => book.id === this.selectedBooks[1]).points;
            } else {
                this.multiplicationPoints = 0;
            }
        }
    },
}
</script>

<style>
.multiplywindow-background {
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

.multiplywindow-window {
    width: 60em;
    height: 70vh;
    border-radius: 12px;
    box-shadow: 0 0 80px 15px #0003;
    padding: 2.5em;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 55px 1fr 40px;
    gap: 28px;
    background: white;
}

.multiplywindow-window .multiplywindow-title {
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
}

.multiplywindow-window .multiplywindow-buttons button {
    margin-left: unset;
}

.multiplywindow-window .multiplywindow-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    column-gap: 17px;
}

.multiplywindow-window .table-row.highlighted {
    background: #7b98c7 !important;
}

.multiplication-points-display {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    margin-right: auto;
}
</style>