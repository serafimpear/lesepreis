const contextBridge = require('electron').contextBridge;


window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
})
contextBridge.exposeInMainWorld('bridge', {
    getSettings: () => ipcRenderer.invoke('getSettings')
})