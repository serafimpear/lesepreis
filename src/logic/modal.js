export const modalFunctions = {
    data() {
        return {
            modalVisible: false,
            modalTitle: "Achtung!",
            modalSubtitle: "etwas löschen",
            modalContent: "meow!",
            modalButtonTextCancel: "Abbrechen",
            modalButtonTextOK: "Bestätigen", // if empty, no 'OK' button
        };
    },
    methods: {
        openModal() {
            this.modalVisible = true;
            return new Promise((resolve, reject) => {
                this.modalResolve = resolve;
                this.modalReject = reject;
            });
        },
        ask({ title = modalTitle, subtitle = modalSubtitle, content = modalContent, okButton = modalButtonTextOK}, functionYES, functionNO) {
            this.modalTitle = title
            this.modalSubtitle = subtitle
            this.modalContent = content
            this.modalButtonTextOK = okButton
            this.openModal()
                .then((result) => {
                    console.log("YA!");
                    functionYES();
                }).catch(err => {
                    console.log("NA!");
                    functionNO();
                })
        },
        handleModalClose(result) {
            this.modalVisible = false; // Close the modal
            if (result) {
                this.modalResolve(true); // Resolve the Promise when confirmed
            } else {
                this.modalReject(false); // Reject the Promise when canceled
            }
        },
    },
};