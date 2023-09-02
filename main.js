const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const Store = require('./src/assets/Store');
const { studentFile, bookFile } = require('./src/assets/data.js');

const ipc = ipcMain

function createWindow() {
    const { screen } = require('electron')
    var dimensions = screen.getPrimaryDisplay().size;
    const isSmallScreen = false;
    if (dimensions.width < 1700 || dimensions.height < 800) { const isSmallScreen = true; console.log('small'); } else { console.log('big'); }

    const win = new BrowserWindow({
        show: false,
        minWidth: 1070,
        minHeight: 700,
        width: 700,
        height: 400,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            zoomFactor: isSmallScreen ? 0.8 : 1.0, // if screen is small, use 80% scale level for the app
            // bug: the zoomFactor is cached:
            // https://github.com/electron/electron/issues/10572
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.webContents.openDevTools();

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

    ipc.on('getStudents', () => {
        const students = [];
        num = studentFile.get('amountOfStudents');
        for (let i = 0; i < num; i++) {
            students.push(studentFile.get(i));
        }
        win.webContents.send('students', students);
    })
    ipc.on("addStudent", (event, dataReceived) => {
        data = JSON.parse(dataReceived);
        if (data.uid == -1) {
            data.uid = studentFile.get('amountOfStudents');
            studentFile.set('amountOfStudents', studentFile.get('amountOfStudents') + 1);
        }
        studentFile.set(data.uid, data);
    })
    ipc.on("deleteStudent", (event, dataReceived) => {
        data = JSON.parse(dataReceived);
        size = studentFile.get('amountOfStudents');
        lastItem = studentFile.get(size - 1);
        lastItem.uid = data.uid;
        studentFile.set(data.uid, lastItem);
        studentFile.set('amountOfStudents', size - 1);
        // man muss no die id in students updaten!
    })

    ipc.on('getBooks', () => {
        const books = [];
        num = bookFile.get('amountOfBooks');
        for (let i = 0; i < num; i++) {
            books.push(bookFile.get(i));
        }
        win.webContents.send('books', books);
    })
    ipc.on("addBook", (event, dataReceived) => {
        data = JSON.parse(dataReceived);
        if (data.id == -1) {
            data.id = bookFile.get('amountOfBooks');
            bookFile.set('amountOfBooks', bookFile.get('amountOfBooks') + 1);
        }
        bookFile.set(data.id, data);
    })
    ipc.on("deleteBook", (event, dataReceived) => {
        data = JSON.parse(dataReceived);
        size = bookFile.get('amountOfBooks');
        lastItem = bookFile.get(size - 1);
        prevId = lastItem.id;
        lastItem.id = data.id;
        bookFile.set(lastitem.id, lastItem);
        bookFile.set('amountOfBooks', size - 1);
        // man muss no die id in students updaten (wegen swap)!
        const students = [];
        num = studentFile.get('amountOfStudents');
        for (let i = 0; i < num; i++) {
            students.push(studentFile.get(i));
        }
        let changedFlag = false;
        for (let i = 0; i < num; i++) {
            for (let j = 0; j < students[i].books.length; j++) {
                if (students[i].books[j].id == prefId) {
                    students[i].books[j].id = lastItem.id;
                    changedFlag = true;
                }
            }
            if (changedFlag) {
                studentFile.set(i, students[i]);
                changedFlag = false;
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

