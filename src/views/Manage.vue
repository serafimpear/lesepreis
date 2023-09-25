<template>
    <Button style="margin: 10px" text="mongoDB" @click="downloadPdf" />
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
                students: ipcRenderer.sendSync('getStudentsSorted', { num: 50 }),
            }
        },

        methods: {
            downloadPdf: function() {
                let users = [];
                let sum = 0;
                this.students.forEach(student => {
                    sum += student.points;
                });
                for(let i = 0; i < Math.min(50, this.students.length); i++) {
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

<style scoped></style>