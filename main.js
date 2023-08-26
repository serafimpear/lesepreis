const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
    const { screen } = require('electron')
    var dimensions = screen.getPrimaryDisplay().size;
    const isSmallScreen = false;
    if (dimensions.width < 1700 || dimensions.height < 800) { const isSmallScreen = true; console.log('small'); } else { console.log('big'); }

    const win = new BrowserWindow({
        show: false,
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            zoomFactor: isSmallScreen ? 0.08 : 1.0 // if screen is small, use 80% scale level for the app
                                                   // bug: the zoomFactor is cached:
                                                   // https://github.com/electron/electron/issues/10572
        }
    });

    win.maximize();
    win.removeMenu(); // remove menu bar at top (file - edit etc...)
    win.show();
    win.loadFile('dist/index.html');
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