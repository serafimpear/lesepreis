const Store = require("./Store.js");

const bookFile = new Store({
    configName: 'books',
    defaults: {
        amountOfBooks: 0
    }
});
const studentFile = new Store({
    configName: 'students',
    defaults: {
        amountOfStudents: 0
    }
});

module.exports = { studentFile, bookFile };