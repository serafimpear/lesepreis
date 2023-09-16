const { ipcRenderer }  = require('electron')
const ipc = ipcRenderer
const isDev = require('electron-is-dev')

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

if (isDev) document.getElementById('devToolsButton').addEventListener('click', () => {
    ipc.send('devTools')
    console.log('d')
})