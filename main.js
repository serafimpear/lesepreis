const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')
const electron = require('electron');
if (require('electron-squirrel-startup')) app.quit();
const path = require('path');
const os = require('os');
const fs = require('fs');
const sqlite3 = require('sqlite3');
const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const gotTheLock = app.requestSingleInstanceLock() // dont allow 2 lesepreis windows

var database;

// // if dont exist, create a file 'settings.ini' in the userDataPath, hence copy 'dist/assets/default.ini' to 'settings.ini'
// if (!fs.existsSync(userDataPath + '/settings.ini')) {
//     fs.copyFileSync('dist/assets/default.ini', userDataPath + '/settings.ini');
// }

//if dont exist, create a file 'settings.ini' in the userDataPath, and set the default apikey
if (!fs.existsSync(userDataPath + '/settings.ini')) {
    fs.writeFileSync(userDataPath + '/settings.ini', 'apikey=AIzaSyA81ig_LA7piHwhiYhJ0pHkqhZGMq9gdcQ');
}

function databaseAll(query) {
    return new Promise((resolve, reject) => {
        database.all(query, function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function databaseRun(query) {
    return new Promise((resolve, reject) => {
        database.run(query, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function databaseRunParams(query, params) {
    return new Promise((resolve, reject) => {
        database.run(query, params, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function databaseGet(query) {
    return new Promise((resolve, reject) => {
        database.get(query, function(err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}
async function getLastInsertRowId() {
    return new Promise((resolve, reject) => {
        database.get("SELECT last_insert_rowid() as id", function(err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row['id']);
            }
        });
    });
}

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

const ipc = ipcMain;

function createWindow() {
    const { screen } = require('electron');
    var dimensions = screen.getPrimaryDisplay().size;
    const isSmallScreen = false;
    if (dimensions.width < 1700 || dimensions.height < 800) {
        const isSmallScreen = true;
        console.log('small');
    } else { console.log('big'); }

    var splash = new BrowserWindow({
        width: 600,
        height: 374,
        resizable: false,
        transparent: true,
        frame: false
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

    setTimeout(function() {
        splash.close();
        win.maximize();
        win.show();
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

    ipc.on('getListOfSchoolYears', (event, dataReceived) => {
        // const schoolYears = [];
        // const files = fs.readdirSync(userDataPath);
        // files.forEach(file => {
        //     if (file.includes('schuljahr_')) {
        //         schoolYears.push(file.split('_')[1].split('.')[0]);
        //     }
        // });
        // event.returnValue = schoolYears;
        const schoolYears = [];
        const files = fs.readdirSync(userDataPath);
        files.forEach(file => {
            if (file.startsWith('schuljahr_')) {
                const schoolYear = file.replace('schuljahr_', '').replace('.db', '');
                schoolYears.push(schoolYear);
            }
        });
        event.returnValue = schoolYears;

    })

    ipc.on('login', (event, dataReceived) => {
        // dataReceived is the name of the school year
        database = new sqlite3.Database(userDataPath + `/schuljahr_${dataReceived}.db`);

        database.on('trace', (sql) => {
            console.log('Query:', sql);
        });

        database.serialize(async() => {
            try {
                let isNewSchema = await databaseGet("SELECT name FROM sqlite_master WHERE type='table' AND name='student_books'");
                // check if we use the new schema
                if (!isNewSchema) {
                    let isMigrationNeeded = await databaseGet("SELECT name FROM sqlite_master WHERE type='table' AND name='students'");

                    // if new / empty db, initialize it
                    if (!isMigrationNeeded) {
                        await initializeDB();
                        event.returnValue = true;
                        return;
                    }

                    // if it uses the old schema, it will be updated
                    if (!fs.existsSync(userDataPath + '/backup')) {
                        fs.mkdirSync(userDataPath + '/backup');
                    }

                    fs.copyFileSync(userDataPath + `/schuljahr_${dataReceived}.db`, userDataPath + `/backup/schuljahr_${dataReceived}_${Date.now()}.db`);

                    let studentsBackup = await databaseAll("SELECT * FROM students");
                    console.log('----------', studentsBackup)

                    await databaseRun("DROP TABLE IF EXISTS students");

                    await initializeDB();

                    for (let student of studentsBackup) {
                        if (!student.multiplied_books) {
                            student.multiplied_books = [-1, -1];
                        }
                        await databaseRunParams(`INSERT INTO students (
                                    name, 
                                    surname, 
                                    class, 
                                    multiplied_book_1, 
                                    multiplied_book_2, 
                                    date_multiplied
                                    ) VALUES (?, ?, ?, ?, ?, ?)`, [
                            student.name,
                            student.surname,
                            student.class,
                            student.multiplied_books[0],
                            student.multiplied_books[1],
                            student.date_multiplied
                        ]);
                        let books = JSON.parse(student.books);
                        for (let book of books) {
                            await database.run(`INSERT INTO student_books (uid, book_id, passed) VALUES (?, ?, ?)`, [
                                student.uid,
                                book.id,
                                book.passed
                            ]);
                        };
                    };
                }
                event.returnValue = true;
            } catch (err) {
                console.error('&&&&&&&&&&&&&&&&&', err);
                event.returnValue = false;
            }
        });
    });

    ipc.on('getStudents', (event, args) => {
        database.all('SELECT * FROM students', [], (err, rows) => {
            if (err) {
                throw err;
            }
            event.returnValue = rows;
        });
    });
    ipc.on('getStudentBooks', (event, args) => {
        database.all('SELECT * FROM student_books', [], (err, rows) => {
            if (err) {
                throw err;
            }
            event.returnValue = rows;
        });
    });


    ipc.on('DBQuery', (event, args) => {
        database.all(args, [], (err, rows) => {
            if (err) {
                console.error(err);
                throw err;
            }
            event.returnValue = rows;
        });
    })


    ipc.on("upsertStudent", async(event, dataReceived) => {
        data = JSON.parse(dataReceived);
        if (data.uid == null) {
            try {
                await databaseRunParams(`INSERT INTO students (` +
                    `name, ` +
                    `surname, ` +
                    `class, ` +
                    `multiplied_book_1, ` +
                    `multiplied_book_2, ` +
                    `date_multiplied` +
                    `) VALUES (?, ?, ?, ?, ?, ?)`, [
                        data.name,
                        data.surname,
                        data.class,
                        data.multiplied_book_1,
                        data.multiplied_book_2,
                        data.date_multiplied
                    ]);

                console.log('_____________________', await getLastInsertRowId())
                event.returnValue = await getLastInsertRowId();
            } catch (err) {
                console.error(err);
            }

            // database.run('INSERT INTO reset (timestamp, message, command) VALUES (?, ?, ?)', [
            //     Date.now(),
            //     `Schüler \"${data.name} ${data.surname}\" hinzugefügt`,
            //     `DELETE FROM students WHERE name = \"${data.name}\"` +
            //     `AND surname = \"${data.surname}\"` +
            //     `AND class = \"${data.class}\"` +
            //     `AND multiplied_book_1 = ${mul1} ` +
            //     `AND multiplied_book_2 = ${mul2} ` +
            //     `AND date_multiplied = ${data.date_multiplied}`
            // ])
        } else {
            // database.all(`SELECT * FROM students WHERE uid = ${data.uid}`, [], (err, rows) => {
            //     if (err) {
            //         throw err;
            //     }
            // rows.forEach(row => {
            //     database.serialize(() => {
            //         database.run('INSERT INTO reset (timestamp,message,command) VALUES (?, ?, ?)', [
            //             Date.now(),
            //             `Schüler ${data.name} ${data.surname} geändert und gespeichert`,
            //             `UPDATE students SET name = \"${row.name}\",` +
            //             `surname = \"${row.surname}\",` +
            //             `class = \"${row.class}\",` +
            //             `multiplied_book_1 = ${row.multiplied_book_1},` +
            //             `multiplied_book_2 = ${row.multiplied_book_2},` +
            //             `date_multiplied = ${row.date_multiplied} ` +
            //             `WHERE uid = ${row.uid}`
            //         ])
            //     });
            // });
            database.run(`UPDATE students ` +
                `SET name = ?, ` +
                `surname = ?, ` +
                `class = ?, ` +
                `multiplied_book_1 = ?, ` +
                `multiplied_book_2 = ?, ` +
                `date_multiplied = ?` +
                ` WHERE uid = ?`, [
                    data.name,
                    data.surname,
                    data.class,
                    data.multiplied_book_1,
                    data.multiplied_book_2,
                    data.date_multiplied,
                    data.uid
                ])
            event.returnValue = "done2";
            // });
        }
    });
    ipc.on("deleteStudent", (event, dataReceived) => {
        // data = JSON.parse(dataReceived);
        // database.all(`SELECT * FROM students WHERE uid = ${data.uid}`, [], (err, rows) => {
        //     if (err) {
        //         throw err;
        //     }
        // database.serialize(() => {
        //     rows.forEach(row => {
        //         database.run('INSERT INTO reset (timestamp,message,command) VALUES (?, ?, ?)', [
        //             Date.now(),
        //             `Schüler "${data.name} ${data.surname}" gelöscht`,
        //             // `UPDATE students SET name = \"${row.name}\", surname = \"${row.surname}\", class = \"${row.class}\", points = ${row.points}, readed_books = ${row.readed_books}, failed_books = ${row.failed_books}, passed = ${row.passed}, multiplied_book_1 = ${row.multiplied_book_1}, multiplied_book_2 = ${row.multiplied_book_1}, books = '${JSON.stringify(row.books)}', date_multiplied = ${row.date_multiplied} WHERE uid = ${row.uid}`
        //             `INSERT INTO students (uid, ` +
        //             `name, ` +
        //             `surname, ` +
        //             `class, ` +
        //             `multiplied_book_1, ` +
        //             `multiplied_book_2, ` +
        //             `date_multiplied) VALUES (` +
        //             `${row.uid}, ` +
        //             `\"${row.name}\", ` +
        //             `\"${row.surname}\", ` +
        //             `\"${row.class}\", ` +
        //             `${row.multiplied_book_1}, ` +
        //             `${row.multiplied_book_2}, ` +
        //             `${row.date_multiplied})`,
        //         ])
        //     });
        // });
        // database.all('SELECT * FROM reset', [], (err, rows) => {
        //     if (err) {
        //         throw err;
        //     }
        //     if (rows.length > 15) {
        //         database.run('DELETE FROM reset WHERE id = (SELECT MIN(id) FROM reset)');
        //     }
        // });

        database.serialize(() => {
            database.run(`DELETE FROM students WHERE uid = ?`, [
                dataReceived
            ], (err) => {
                if (err) {
                    console.error("Error deleting student:", err.message);
                    event.returnValue = 'error';
                } else {
                    event.returnValue = 'done3';
                }
            });
        });
        // });
    });
    ipc.on('getBooks', (event, args) => {
        database.all('SELECT * FROM books', [], (err, rows) => {
            if (err) {
                throw err;
            }
            event.returnValue = rows;
        });
    })
    ipc.on("upsertBook", (event, dataReceived) => {
        data = JSON.parse(dataReceived);
        if (data.id == null) {
            database.serialize(async() => {
                try {
                    await databaseRunParams('INSERT INTO books (title,author,language, points, isbn) VALUES (?, ?, ?, ?, ?)', [
                        data.title,
                        data.author,
                        data.language,
                        data.points,
                        data.isbn
                    ]);

                    console.log('_____________________', this.lastID)
                    event.returnValue = await getLastInsertRowId();
                } catch (err) {
                    console.error(err);
                }
                // database.run('INSERT INTO reset (timestamp,message,command) VALUES (?, ?, ?)', [
                //     Date.now(),
                //     `Buch \"${data.title}\" hinzugefügt`,
                //     `DELETE FROM books WHERE title = \"${data.title}\" AND author = \"${data.author}\" AND language = \"${data.language}\" AND points = ${data.points} AND isbn = \"${data.isbn}\"`
                // ])
            });
        } else {
            // database.all(`SELECT * FROM books WHERE id = ${data.id}`, [], (err, rows) => {
            //     if (err) {
            //         throw err;
            //     }
            //     rows.forEach(row => {
            //         database.serialize(() => {
            //             database.run('INSERT INTO reset (timestamp,message,command) VALUES (?, ?, ?)', [
            //                 Date.now(),
            //                 `Buch \"${data.title}\" geändert und gespeichert`,
            //                 `UPDATE books SET title = \"${row.title}\", author = \"${row.author}\", language = \"${row.language}\", points = ${row.points}, isbn = \"${row.isbn}\" WHERE id = ${row.id}`
            //             ])
            //         });
            //     });
            database.serialize(() => {
                database.run(`UPDATE books SET title = ?, author = ?, language = ?, points = ?, isbn = ? WHERE id = ?`, [
                        data.title,
                        data.author,
                        data.language,
                        data.points,
                        data.isbn,
                        data.id
                    ],
                    async(err) => {
                        if (err) {
                            console.error(err.message);
                        } else {
                            event.returnValue = await getLastInsertRowId();
                        }
                    });
            });
            // });

        }
    })
    ipc.on("deleteBook", (event, dataReceived) => {
        data = JSON.parse(dataReceived);
        // database.all(`SELECT * FROM books WHERE id = ${data.id}`, [], (err, rows) => {
        //     if (err) {
        //         throw err;
        //     }
        // rows.forEach(row => {
        //     database.serialize(() => {
        //         database.run('INSERT INTO reset (timestamp,message,command) VALUES (?, ?, ?)', [
        //             Date.now(),
        //             `Buch ${row.title} von ${row.author} gelöscht`,
        //             // `UPDATE books SET title = \"${row.title}\", author = \"${row.author}\", language = \"${row.language}\", points = ${row.points}, isbn = \"${row.isbn}\" WHERE id = ${row.id}`
        //             `INSERT INTO books (id, title, author, language, points, isbn) VALUES (${row.id}, \"${row.title}\", \"${row.author}\", \"${row.language}\", ${row.points}, \"${row.isbn}\")`
        //         ])
        //     });
        // });

        database.serialize(() => {
            database.run("PRAGMA foreign_keys = ON", (er1r) => {
                database.run(`DELETE FROM books WHERE id = ?`, [data.id], function(err) {
                    if (err) {
                        console.error("Error deleting books:", err.message);
                        event.returnValue = 'error';
                    } else {
                        event.returnValue = 'done6';
                    }
                });
            });

        });
        // });
    })

    // ipc.on("getResetHistory", (event, dataReceived) => {
    //     const resetHistory = [];
    //     database.all('SELECT * FROM reset ORDER BY id DESC LIMIT 5', [], (err, rows) => {
    //         if (err) {
    //             throw err;
    //         }
    //         rows.forEach(row => {
    //             resetHistory.push(row);
    //         });
    //         console.log(resetHistory)
    //         event.returnValue = resetHistory;
    //     });
    // })

    // ipc.on("reset", (event, dataReceived) => {
    //     // just give how many steps you want to go back as argument?
    //     // right now it's a list of all the reset steps
    //     // <-- thanks David i'll give you the list with all steps to do
    //     data = JSON.parse(dataReceived);
    //     for (let i = 0; i < data.length; i++) {
    //         database.serialize(() => {
    //             console.log("\nTO RESET DO: " + data[i].command + "\n");
    //             database.run(data[i].command.replaceAll('\u005c', ''));
    //             database.run(`DELETE FROM reset WHERE id = ?`, [data[i].id]);
    //         });
    //     }
    //     win.webContents.send('updateDataRemote');
    // })

    ipc.on("openSaveDialog", (event, dataReceived) => {
        dialog.showSaveDialog({
            title: dataReceived.title,
            defaultPath: path.join(app.getPath('documents'), dataReceived.name),
            filters: [
                { name: 'HTML Files', extensions: ['html'] },
                { name: 'All Files', extensions: ['*'] },
            ],
        }).then((result) => {
            event.returnValue = result;
        }).catch((err) => {
            event.returnValue = false;
        });
    });

    ipc.on("openSaveDialogDB", (event, dataReceived) => {
        dialog.showSaveDialog({
            title: dataReceived.title,
            defaultPath: path.join(app.getPath('documents'), dataReceived.name),
            filters: [
                { name: 'Lesepreis Schuljahr-Datenbank', extensions: ['db'] },
                { name: 'All Files', extensions: ['*'] },
            ],
        }).then((result) => {
            event.returnValue = result;
        }).catch((err) => {
            event.returnValue = false;
        });
    });

    ipc.on("openFileDialog", (event, dataReceived) => {
        dialog.showOpenDialog({
            title: dataReceived.title,
            defaultPath: path.join(app.getPath('documents')),
            filters: [
                { name: 'Lesepreis Schuljahr-Datenbank', extensions: ['db'] }
            ],
            properties: ['openFile']
        }).then((result) => {
            event.returnValue = result;
        }).catch((err) => {
            event.returnValue = false;
        });
    });

    ipc.on("importYear", (event, dataReceived) => {
        try {
            console.log('-----------------', dataReceived, userDataPath + '/' + path.basename(dataReceived));

            // dataReceived is the path to the file like C:\Users\user\Documents\schuljahr_2021.db
            // copy the file to the userDataPath
            //fs.copyFileSync(dataReceived, userDataPath + '/' + path.basename(dataReceived, ".db") + " (Importiert am " + new Date().toLocaleDateString('ru') + ").db");
            // if dataReceived path file starts with schuljahr_ leave as it is, else add schuljahr_ prefix
            fs.copyFileSync(dataReceived, userDataPath + '/' + (path.basename(dataReceived).startsWith('schuljahr_') ? path.basename(dataReceived, ".db") + " (Importiert am " + new Date().toLocaleDateString('ru') + ").db" : 'schuljahr_' + path.basename(dataReceived, ".db") + " (Importiert am " + new Date().toLocaleDateString('ru') + ").db"));


        } catch (err) {
            console.error(err);
            event.returnValue = false;
            return;
        }
        event.returnValue = true;
    });

    // ipcRenderer.sendSync("editYearName", { oldName: year, newName: this.modelValue }); (reminder: filename changes with schuljahr_ prefix)
    ipc.on("editYearName", (event, dataReceived) => {
        try {
            //check if already connected to the database
            if (database) {
                database.close((err) => {
                    if (err) {
                        console.error(err.message);
                    }
                    console.log('Closed the database connection.');
                    fs.renameSync(userDataPath + '/schuljahr_' + dataReceived.oldName + '.db', userDataPath + '/schuljahr_' + dataReceived.newName + '.db');
                });
            } else {
                fs.renameSync(userDataPath + '/schuljahr_' + dataReceived.oldName + '.db', userDataPath + '/schuljahr_' + dataReceived.newName + '.db');
            }

        } catch (err) {
            console.error(err);
            event.returnValue = false;
            return;
        }
        event.returnValue = true;
    });

    ipc.on("deleteYear", (event, dataReceived) => {
        try {
            if (database) {
                database.close((err) => {
                    if (err) {
                        console.error(err.message);
                    }
                    console.log('Closed the database connection.');

                    // dont delete the file, but move it to backup folder (keeping same name) - dataReceived is the name of the school year
                    if (!fs.existsSync(userDataPath + '/backup')) {
                        fs.mkdirSync(userDataPath + '/backup');
                    }

                    fs.renameSync(userDataPath + '/schuljahr_' + dataReceived + '.db', userDataPath + '/backup/schuljahr_' + dataReceived + '_DELETED_ON_' + Date.now() + '.db');
                });
            } else {
                // dont delete the file, but move it to backup folder (keeping same name) - dataReceived is the name of the school year
                if (!fs.existsSync(userDataPath + '/backup')) {
                    fs.mkdirSync(userDataPath + '/backup');
                }

                fs.renameSync(userDataPath + '/schuljahr_' + dataReceived + '.db', userDataPath + '/backup/schuljahr_' + dataReceived + '_DELETED_ON_' + Date.now() + '.db');
            }
        } catch (err) {
            console.error(err);
            event.returnValue = false;
            return;
        }
        event.returnValue = true;
    });

    ipc.on("exportYear", (event, dataReceived) => {
        try {
            fs.copyFileSync(userDataPath + '/schuljahr_' + dataReceived.year + '.db', dataReceived.path);
        } catch (err) {
            console.error(err);
            event.returnValue = false;
            return;
        }
        event.returnValue = true;
    });

    ipc.on("openFile", (event, dataReceived) => {
        shell.openPath(dataReceived);
    });

    ipc.on("getApiKey", (event, dataReceived) => {
        const settings = fs.readFileSync(userDataPath + '/settings.ini', 'utf8');
        const apiKey = settings.split('\n').find(line => line.startsWith('apikey=')).split('=')[1];
        event.returnValue = apiKey;
    });

    ipc.on("setApiKey", (event, dataReceived) => {
        const settings = fs.readFileSync(userDataPath + '/settings.ini', 'utf8');
        const newSettings = settings.split('\n').map(line => {
            if (line.startsWith('apikey=')) {
                return 'apikey=' + dataReceived;
            }
            return line;
        }).join('\n');
        fs.writeFileSync(userDataPath + '/settings.ini', newSettings);
    });

    ipc.on("changeTitleYear", (event, dataReceived) => {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", dataReceived);
        win.webContents.send('updateSchoolYear', dataReceived);
    });

}

async function initializeDB() {
    // Enable foreign key constraints
    await databaseRun("PRAGMA foreign_keys = ON");
    await databaseRun("CREATE TABLE IF NOT EXISTS students (" +
        "uid INTEGER PRIMARY KEY, " +
        "name TEXT, " +
        "surname TEXT, " +
        "class TEXT, " +
        "multiplied_book_1 INTEGER, " +
        "multiplied_book_2 INTEGER, " +
        "date_multiplied INTEGER DEFAULT CURRENT_TIMESTAMP)");
    await databaseRun("CREATE TABLE IF NOT EXISTS books (" +
        "id INTEGER PRIMARY KEY, " +
        "title TEXT, " +
        "author TEXT, " +
        "language TEXT, " +
        "points INTEGER, " +
        "isbn TEXT)");
    await databaseRun("CREATE TABLE IF NOT EXISTS student_books (" +
        "uid INTEGER, " +
        "book_id INTEGER, " +
        "passed BOOLEAN, " +
        "date_added INTEGER DEFAULT CURRENT_TIMESTAMP, " +
        "FOREIGN KEY(uid) REFERENCES students(uid) ON DELETE CASCADE, " +
        "FOREIGN KEY(book_id) REFERENCES books(id) ON DELETE RESTRICT)");
    // database.run("CREATE TABLE IF NOT EXISTS reset (" +
    //     "id INTEGER PRIMARY KEY, " +
    //     "timestamp INTEGER, " +
    //     "message TEXT, " +
    //     "command TEXT)");
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