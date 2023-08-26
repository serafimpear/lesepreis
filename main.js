const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
    const { screen } = require('electron')
    var dimensions = screen.getPrimaryDisplay().size;
    const isSmallScreen = false;
    if (dimensions.width < 1700 || dimensions.height < 800) { const isSmallScreen = true; console.log('small'); } else { console.log('big'); }
    const process = require('process');
    console.log(process.env.APPDATA + "\\"+ app.getName() + "\\Cache");

    const win = new BrowserWindow({
        show: false,
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            zoomFactor: isSmallScreen ? 0.8 : 1.0
        }
    });

    win.maximize();
    win.removeMenu();
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