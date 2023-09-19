<template>manage</template>

<script>
    const pdf = require('pdf-creator-node');
    const fs = require('fs');
    const { ipcRenderer } = require('electron')

    export default {
        data() {
            return {
                students: ipcRenderer.sendSync('getStudentsSorted', { num: 50 }),
            }
        },

        methods: {
            downloadPdf: function() {
                let users = [];
                for(let i = 0; i < Math.min(50, this.students.length); i++) {
                    users.push(this.students[i]);
                }

                const html = fs.readFileSync('src/assets/pdfExport/pdfExport.html', 'utf-8');
                var options = {
                    format: "A3",
                    orientation: "portrait",
                    border: "10mm",               
                };
                const doc = {
                    html: html,
                    data: {
                        users: users,
                    },
                    path: './output.pdf',
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

        mounted: function mounted() {
            this.downloadPdf();
        }
    }

    

</script>

<style scoped></style>