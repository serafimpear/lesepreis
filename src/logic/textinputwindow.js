export const textinputFunctions = {
    data() {
        return {
            textinputwindowVisible: false,
            textinputwindowTitle: "Text eingeben",
            textinputwindowContent: "Bitte geben Sie den Text",
            textinputwindowButtonTextCancel: "Abbrechen",
            textinputwindowButtonTextOK: "Bestätigen", // if empty, no 'OK' button
            resultString: undefined,
        };
    },
    methods: {
        opentextinputwindow() {
            this.textinputwindowVisible = true;
            return new Promise((resolve, reject) => {
                this.textinputwindowResolve = resolve;
                this.textinputwindowReject = reject;
            });
        },
        guiTextInput({ title = "Text eingeben", content = "Bitte geben Sie den Text", okButton = "Bestätigen", noButton = "Abbrechen" }, functionYES, functionNO) {
            this.textinputwindowTitle = title;
            this.textinputwindowButtonTextCancel = noButton;
            this.textinputwindowButtonTextOK = okButton;
            this.textinputwindowContent = content
            this.opentextinputwindow()
                .then((result) => {
                    functionYES(result);
                }).catch(err => {
                    functionNO();
                })
        },
        handleTextinputwindowClose(result) {
            this.textinputwindowVisible = false; // Close the textinputwindow
            if (typeof result == 'string' && result != '') {
                this.resultString = result;
                this.textinputwindowResolve(true); // Resolve the Promise when confirmed
            } else {
                this.textinputwindowReject(false); // Reject the Promise when canceled
            }
        },
    },
};