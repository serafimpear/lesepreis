<template>
    <div class="history-popup-container">
        <div class="history-popup">
            <div class="ui-table">
                <div class="table-data">
                    <div class="table-row" v-for="(action, index) in actions" :key="index" :class="{ 'highlight': isHovered(index) }"
                    @mouseover="setHovered(index)" @mouseout="setHovered(-1)" @click="undo(action)">
                        <div class="table-cell">
                            {{ action.text }}
                        </div>
                        <div class="table-cell time-of-change">
                            {{ action.time }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            actions: [
                {
                    'text': 'Buch Goete “Faust” zu den gelesenen Büchern (nicht bestanden) von ‘David Mairhofer’ hinzugefügt',
                    'time': '09:48'
                },
                {
                    'text': 'Buch Franz Kafka “Das Urteil” zu den gelesenen Büchern (bestanden) von ‘David Mairhofer’ hinzugefügt',
                    'time': '09:45'
                },
                {
                    'text': 'Name von Schüler ‘Wolfgang Mairhofer’ auf ‘David Mairhofer’ geändert ',
                    'time': '09:39'
                },
                {
                    'text': 'Schüler ‘Wolfgang Mairhofer’ hinzugefügt',
                    'time': '09:34'
                },
                {
                    'text': 'Buch Goethe “Faust” hinzugefügt',
                    'time': '09:29'
                },
            ],

            hoveredIndex: -1,
        }
    },

    methods: {
        undo: (action) => {
            console.log('undo action ' + action);
        },

        isHovered(index) {
      return index <= this.hoveredIndex;
    },
    setHovered(index) {
      this.hoveredIndex = index;
    },
    }
}
</script>

<style>
.history-popup-container {
    position: fixed;
    top: 39px;
    left: 5px;
    width: 58rem;
    z-index: 1;
    padding-top: 10px;
}

.history-popup {
    border-radius: 9px;
    overflow: hidden;
    box-shadow: 0 0 40px 4px #00000045;
    width: 100%;
}

.history-popup .ui-table .table-row {
    grid-template-columns: auto 2em;
}

.history-popup .ui-table .table-row.highlight {
    background: #fff3ad;
}

.history-popup .time-of-change {
    text-align: right;
    font-size: 12px;
    font-style: italic;
    font-weight: 300;
}
</style>