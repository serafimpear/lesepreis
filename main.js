const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
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

