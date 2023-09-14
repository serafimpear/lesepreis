export const modalFunctions = {
    data() {
        return {
            modalVisible: false,
            modalTitle: "Achtung!",
            modalSubtitle: "etwas löschen",
            modalContent: "meow!",
            modalButtonTextCancel: "Abbrechen",
            modalButtonTextOK: "Bestätigen", // if empty, no 'OK' button
            modalType: 'alert'
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
        ask({ type = 'alert', subtitle = "etwas löschen", content = "meow!", okButton = "Bestätigen", noButton = "Abbrechen"}, functionYES, functionNO) {
            switch (type) {
                case 'warning':
                    this.modalTitle = 'Achtung!';
                    this.modalType = type;
                    this.modalSubtitle = subtitle;
                    this.modalButtonTextOK = okButton;
                    this.modalButtonTextCancel = noButton;
                    break;
            
                default:
                    // alert
                    this.modalTitle = subtitle;
                    this.modalSubtitle = '';
                    this.modalButtonTextCancel = noButton;
                    this.modalButtonTextOK = false;
                    break;
            }
            this.modalContent = content
            this.openModal()
                .then((result) => {
                    functionYES();
                }).catch(err => {
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