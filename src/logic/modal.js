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
        ask({ type = this.modalType, subtitle = this.modalSubtitle, content = this.modalContent, okButton = this.modalButtonTextOK}, functionYES, functionNO) {
            switch (type) {
                case 'warning':
                    this.modalTitle = 'Achtung!';
                    this.modalType = type;
                    this.modalSubtitle = subtitle;
                    this.modalButtonTextOK = okButton;
                    break;
            
                default:
                    // alert
                    this.modalTitle = subtitle;
                    this.modalSubtitle = '';
                    this.modalButtonTextOK = false;
                    break;
            }
            this.modalContent = content
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