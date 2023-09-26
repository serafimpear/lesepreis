<template>
    <div>
        <p class="user-prompt">
            Klicken sie auf den folgenden Knopf, um die Rangliste der Schüler in PDF-Format herunterzuladen:
        </p>
        <Button style="margin: 25px" text="PDF Download" @click="downloadPdf" />
    </div>
</template>

<script>
    const pdf = require('pdf-creator-node');
    const fs = require('fs');
    const { ipcRenderer } = require('electron')
    import Button from '@/components/Button.vue'

    export default {
        components: { Button },

        data() {
            return {
                students: ipcRenderer.sendSync('getStudentsSorted'),
            }
        },

        methods: {
            downloadPdf: function() {
                let users = [];
                let sum = 0;
                this.students.forEach(student => {
                    sum += student.points;
                });
                for(let i = 0; i < Math.min(25, this.students.length); i++) {
                    this.students[i].rank = i;
                    users.push(this.students[i]);
                }

                const html = fs.readFileSync('src/assets/pdfExport/pdfExport.html', 'utf-8');
                var options = {
                    format: "A4",
                    orientation: "portrait",
                    border: "5mm",               
                };
                const doc = {
                    html: html,
                    data: {
                        users: users,
                        sum: sum,
                        date: (new Date()).toLocaleDateString('de-DE'),
                    },
                    path: 'output.pdf',
                    type: '',
                }
                pdf
                    .create(doc, options)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
    }

    

</script>

<style>
    .user-prompt {
        margin: 25px;
    }
</style>