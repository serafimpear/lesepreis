const { ipcRenderer }  = require('electron')
const ipc = ipcRenderer
console.log('s')

document.getElementById('closeButton').addEventListener('click', () => {
    ipc.send('closeApp')
    console.log('d')
})

document.getElementById('maximizeRestoreButton').addEventListener('click', () => {
    ipc.send('maximizeRestoreApp')
    console.log('d')
})

document.getElementById('minimizeButton').addEventListener('click', () => {
    ipc.send('minimizeApp')
    console.log('d')
})

document.getElementById('devToolsButton').addEventListener('click', () => {
    ipc.send('devTools')
    console.log('d')
})