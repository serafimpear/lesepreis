const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const electron = require('electron');
const path = require('path')
const Store = require('./src/assets/Store');
const { studentFile, bookFile } = require('./src/assets/data.js');
const sqlite3 = require('sqlite3');
const userDataPath = (electron.app || electron.remote.app).getPath('userData');

const students_database = new sqlite3.Database(userDataPath + '/students_database.db');
const books_database = new sqlite3.Database(userDataPath + '/books_database.db');
const reset_database = new sqlite3.Database(userDataPath + '/reset_database.db');

students_database.serialize(() => {
    students_database.run("CREATE TABLE IF NOT EXISTS students (uid INTEGER PRIMARY KEY,name TEXT,surname TEXT,class TEXT,points INTEGER,readed_books INTEGER,passed BOOLEAN,multiplied BOOLEAN,books TEXT)");
});
books_database.serialize(() => {
    books_database.run("CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY,title TEXT,author TEXT,language TEXT,foreign_language BOOLEAN,points INTEGER,isbn TEXT)");
});
reset_database.serialize(() => {
    reset_database.run("CREATE TABLE IF NOT EXISTS reset (id INTEGER PRIMARY KEY,timestamp INTEGER,message TEXT,command TEXT, database TEXT)");
});

const ipc = ipcMain
function loadFromJsonToSQLite() {
    num = studentFile.get('amountOfStudents');
    for (let i = 0; i < 0; i++) {
        data = studentFile.get(i);
        students_database.serialize(() => {
            students_database.run('INSERT INTO students (name, surname, class, points, readed_books, passed, multiplied, books) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    data.name,
                    data.surname,
                    data.class,
                    data.points,
                    data.readed_books,
                    data.passed ? 1 : 0,
                    data.multiplied ? 1 : 0,
                    JSON.stringify(data.books)
                ])
        });
    }
    num = bookFile.get('amountOfBooks');
    for (let i = 0; i < 0; i++) {
        data = bookFile.get(i);
        books_database.serialize(() => {
            books_database.run('INSERT INTO books (title,author,language, foreign_language, points, isbn) VALUES (?, ?, ?, ?, ?, ?)',
                [
                    data.title,
                    data.author,
                    data.language,
                    data.foreign_language,
                    data.points,
                    data.isbn
                ])
        });
    }
}

function createWindow() {
    //loadFromJsonToSQLite(); // run once to load data from json to the database!
    const { screen } = require('electron'); 
    var dimensions = screen.getPrimaryDisplay().size;
    const isSmallScreen = false;
    if (dimensions.width < 1700 || dimensions.height < 800) { const isSmallScreen = true; console.log('small'); } else { console.log('big'); }

    const win = new BrowserWindow({
        show: false,
        minWidth: 1090,
        minHeight: 650,
        width: 700,
        height: 400,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            zoomFactor: isSmallScreen ? 0.75 : 1.0, // if screen is small, use 75% scale level for the app
            // bug: the zoomFactor is cached:
            // https://github.com/electron/electron/issues/10572
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.maximize();
    win.removeMenu(); // remove menu bar at top (file - edit etc...)
    win.show();
    win.loadFile('dist/index.html');

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
        students_database.all('SELECT * FROM students', [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach(row => {
                booksParsed = JSON.parse(row.books);
                row.books = booksParsed;
                students.push(row);
            });
            win.webContents.send('students', students);
        });
    })
    ipc.on("addStudent", (event, dataReceived) => {
        data = JSON.parse(dataReceived);
        if (data.uid == -1) {
            students_database.serialize(() => {
                students_database.run('INSERT INTO students (name, surname, class, points, readed_books, passed, multiplied, books) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        data.name,
                        data.surname,
                        data.class,
                        data.points,
                        data.readed_books,
                        data.passed ? 1 : 0,
                        data.multiplied ? 1 : 0,
                        JSON.stringify(data.books)
                    ])
            });
        } else {
            students_database.serialize(() => {
                students_database.run(`UPDATE students SET name = ?, surname = ?, class = ?, points = ?, readed_books = ?, passed = ?, multiplied = ?, books = ? WHERE uid = ?`,
                    [
                        data.name,
                        data.surname,
                        data.class,
                        data.points,
                        data.readed_books,
                        data.passed ? 1 : 0,
                        data.multiplied ? 1 : 0,
                        JSON.stringify(data.books),
                        data.uid
                    ])
            });
        }

    })
    ipc.on("deleteStudent", (event, dataReceived) => {
        data = JSON.parse(dataReceived);
        students_database.serialize(() => {
            students_database.run(`DELETE FROM students WHERE uid = ?`,
                [
                    data.uid
                ])
        });

    })

    ipc.on('getBooks', () => {
        const books = [];
        books_database.all('SELECT * FROM books', [], (err, rows) => {
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
            books_database.serialize(() => {
                books_database.run('INSERT INTO books (title,author,language, foreign_language, points, isbn) VALUES (?, ?, ?, ?, ?, ?)',
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
            books_database.serialize(() => {
                books_database.run(`UPDATE books SET title = ?, author = ?, language = ?, foreign_language = ?, points = ?, isbn = ? WHERE id = ?`,
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
        books_database.serialize(() => {
            books_database.run(`DELETE FROM books WHERE id = ?`,
                [
                    data.id
                ])
        });
    })
    ipc.on("reset", (event, dataReceived) => {
        // just give how many steps you want to go back as argument?
        // right now it's a list of all the reset steps
        data = JSON.parse(dataReceived);
        for (let i = 0; i < data.length; i++) {
            if (data[i].database == "books") {
                books_database.serialize(() => {
                    books_database.run(data[i].command)
                });
                reset_database.serialize(() => {
                    reset_database.run(`DELETE FROM reset WHERE id = ?`, [data[i].id])
                })
            } else if (data[i].database == "students") {
                students_database.serialize(() => {
                    students_database.run(data[i].command)
                });
                reset_database.serialize(() => {
                    reset_database.run(`DELETE FROM reset WHERE id = ?`, [data[i].id])
                })
            }
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
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

