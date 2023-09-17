const { app, BrowserWindow, ipcMain } = require('electron')
const electron = require('electron');
if (require('electron-squirrel-startup')) app.quit();
const path = require('path')
const sqlite3 = require('sqlite3');
const userDataPath = (electron.app || electron.remote.app).getPath('userData');

const gotTheLock = app.requestSingleInstanceLock() // dont allow 2 lesepreis windows

let myWindow = null
if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (myWindow) {
            if (myWindow.isMinimized()) myWindow.restore()
            myWindow.focus()
        }
    })
}

const database = new sqlite3.Database(userDataPath + `/schuljahr_${2023}.db`);

database.serialize(() => {
    database.run("CREATE TABLE IF NOT EXISTS students (uid INTEGER PRIMARY KEY,name TEXT,surname TEXT,class TEXT,points INTEGER,readed_books INTEGER, failed_books INTEGER,passed BOOLEAN,multiplied_book_1 INTEGER, multiplied_book_2 INTEGER,books TEXT,date_multiplied INTEGER)");
    database.run("CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY,title TEXT,author TEXT,language TEXT,foreign_language BOOLEAN,points INTEGER,isbn TEXT)");
    database.run("CREATE TABLE IF NOT EXISTS reset (id INTEGER PRIMARY KEY,timestamp INTEGER,message TEXT,command TEXT)");
});

const ipc = ipcMain

function createWindow() {
    const { screen } = require('electron');
    var dimensions = screen.getPrimaryDisplay().size;
    const isSmallScreen = false;
    if (dimensions.width < 1700 || dimensions.height < 800) { const isSmallScreen = true; console.log('small'); } else { console.log('big'); }

    var splash = new BrowserWindow({
        width: 600,
        height: 374,
        transparent: true,
        frame: false,
        alwaysOnTop: true
    });

    splash.loadFile('welcome.html');
    splash.center();

    const win = new BrowserWindow({
        show: false,
        minWidth: 1080,
        minHeight: 650,
        width: 700,
        height: 400,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            zoomFactor: isSmallScreen ? 0.7 : 1.0, // if screen is small, use 75% scale level for the app
            // bug: the zoomFactor is cached:
            // https://github.com/electron/electron/issues/10572
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.removeMenu(); // remove menu bar at top (file - edit etc...)

    win.loadFile('dist/index.html');

    setTimeout(function () {
        splash.close();
        win.show();
        win.maximize();
    }, 5000);

    ipc.on('closeApp', () => {
        win.close()
    })

    ipc.on('maximizeRestoreApp', () => {
        if (win.isMaximized()) {
            win.restore();
        } else {
            win.maximize();
        }
    })

    ipc.on('minimizeApp', () => {
        win.minimize()
    })

    ipc.on('devTools', () => {
        win.webContents.openDevTools();
    })

    ipc.on('getStudents', () => {
        var students = [];
        database.all('SELECT * FROM students', [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach(row => {
                booksParsed = JSON.parse(row.books);
                row.books = booksParsed;
                if (row.multiplied_book_1 == -1 || row.multiplied_book_2 == -1) {
                    row.multiplied_books = [];
                } else {
                    row.multiplied_books = [row.multiplied_book_1, row.multiplied_book_2];
                }
                students.push(row);
            });
            win.webContents.send('students', students);
        });
    })
    ipc.on("addStudent", (event, dataReceived) => {
        data = JSON.parse(dataReceived);
        let mul1 = -1;
        let mul2 = -1;
        if (data.multiplied_books.length != 0) {
            mul1 = data.multiplied_books[0];
            mul2 = data.multiplied_books[1];
        }
        if (data.uid == -1) {
            database.serialize(() => {
                database.run('INSERT INTO students (name, surname, class, points, readed_books, failed_books, passed, multiplied_book_1, multiplied_book_2, books, date_multiplied) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        data.name,
                        data.surname,
                        data.class,
                        data.points,
                        data.readed_books,
                        data.failed_books,
                        data.passed,
                        mul1,
                        mul2,
                        JSON.stringify(data.books),
                        data.date_multiplied
                    ])
                database.run('INSERT INTO reset (timestamp,message,command) VALUES (?, ?, ?)',
                    [
                        Date.now(),
                        `Schüler ${data.name} ${data.surname} hinzugefügt`,
                        `DELETE FROM students WHERE name = \"${data.name}\" AND surname = \"${data.surname}\" AND class = \"${data.class}\" AND points = ${data.points} AND readed_books = ${data.readed_books} AND failed_books = ${data.failed_books} AND passed = ${data.passed} AND multiplied_book_1 = ${mul1} AND multiplied_book_2 = ${mul2} AND books = \"${JSON.stringify(data.books)}\" AND date_multiplied = ${data.date_multiplied}`
                    ])
            });
        } else {
            database.all(`SELECT * FROM students WHERE uid = ${data.uid}`, [], (err, rows) => {
                if (err) {
                    throw err;
                }
                rows.forEach(row => {
                    database.serialize(() => {
                        database.run('INSERT INTO reset (timestamp,message,command) VALUES (?, ?, ?)',
                            [
                                Date.now(),
                                `Schüler ${row.name} ${row.surname} gespeichert`,
                                `UPDATE students SET name = \"${row.name}\" AND surname = \"${row.surname}\" AND class = \"${row.class}\" AND points = ${row.points} AND readed_books = ${row.readed_books} AND failed_books = ${row.failed_books} AND passed = ${row.passed} AND multiplied_book_1 = ${row.multiplied_book_1} AND multiplied_book_2 = ${row.multiplied_book_2} AND books = \"${row.books}\" AND date_multiplied = ${row.date_multiplied} WHERE uid = ${row.uid}`
                            ])
                    });
                });
            });
            database.serialize(() => {
                database.run(`UPDATE students SET name = ?, surname = ?, class = ?, points = ?, readed_books = ?, failed_books = ?, passed = ?, multiplied_book_1 = ?, multiplied_book_2 = ?, books = ?, date_multiplied = ? WHERE uid = ?`,
                    [
                        data.name,
                        data.surname,
                        data.class,
                        data.points,
                        data.readed_books,
                        data.failed_books,
                        data.passed,
                        mul1,
                        mul2,
                        JSON.stringify(data.books),
                        data.date_multiplied,
                        data.uid
                    ])

            });
        }

    })
    ipc.on("deleteStudent", (event, dataReceived) => {
        data = JSON.parse(dataReceived);
        database.all(`SELECT * FROM students WHERE uid = ${data.uid}`, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach(row => {
                database.serialize(() => {
                    database.run('INSERT INTO reset (timestamp,message,command) VALUES (?, ?, ?)',
                        [
                            Date.now(),
                            `Schüler ${row.name} ${row.surname} gelöscht`,
                            `UPDATE students SET name = \"${row.name}\" AND surname = \"${row.surname}\" AND class = \"${row.class}\" AND points = ${row.points} AND readed_books = ${row.readed_books} AND failed_books = ${row.failed_books} AND passed = ${row.passed} AND multiplied_book_1 ${row.multiplied_book_1} AND books = \"${row.books}\" AND date_multiplied = ${row.date_multiplied} WHERE uid = ${row.uid}`
                        ])
                });
            });
        });
        database.serialize(() => {
            database.run(`DELETE FROM students WHERE uid = ?`,
                [
                    data.uid
                ])
        });

    })

    ipc.on('getBooks', () => {
        const books = [];
        database.all('SELECT * FROM books', [], (err, rows) => {
            // console.log(rows);
            if (err) {
                throw err;
            }
            rows.forEach(row => {
                books.push(row);
                //console.log("students ", students, students.push(row));
            });
            win.webContents.send('books', books);
        });

    })
    ipc.on("addBook", (event, dataReceived) => {

        data = JSON.parse(dataReceived);
        if (data.id == -1) {
            database.serialize(() => {
                database.run('INSERT INTO books (title,author,language, foreign_language, points, isbn) VALUES (?, ?, ?, ?, ?, ?)',
                    [
                        data.title,
                        data.author,
                        data.language,
                        data.foreign_language,
                        data.points,
                        data.isbn
                    ])
            });
        } else {
            database.serialize(() => {
                database.run(`UPDATE books SET title = ?, author = ?, language = ?, foreign_language = ?, points = ?, isbn = ? WHERE id = ?`,
                    [
                        data.title,
                        data.author,
                        data.language,
                        data.foreign_language,
                        data.points,
                        data.isbn,
                        data.id
                    ])
            });
        }
    })
    ipc.on("deleteBook", (event, dataReceived) => {
        data = JSON.parse(dataReceived);
        database.serialize(() => {
            database.run(`DELETE FROM books WHERE id = ?`,
                [
                    data.id
                ])
        });
    })
    ipc.on("getResetHistory", (event, dataReceived) => {
        
        const resetHistory = [];
        database.all('SELECT * FROM reset', [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach(row => {
                resetHistory.push(row);
            });
            console.log(resetHistory);
            win.webContents.send('resetHistory', resetHistory);
        });
    })
    ipc.on("reset", (event, dataReceived) => {
        // just give how many steps you want to go back as argument?
        // right now it's a list of all the reset steps
        data = JSON.parse(dataReceived);
        for (let i = 0; i < data.length; i++) {
            database.serialize(() => {
                database.run(data[i].command)
                database.run(`DELETE FROM reset WHERE id = ?`, [data[i].id])
            });
        }
    })

}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

app.on('window-all-closed', () => {
    app.quit();
});

require('update-electron-app')({
    repo: 'serafimpear/lesepreis'
})