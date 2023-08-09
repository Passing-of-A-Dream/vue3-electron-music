const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    onMessage: (callback) => ipcRenderer.on('message', callback),
    onSystemThemeChanged: (callback) => ipcRenderer.on('system-theme-changed', callback),
    getSystemTheme: () => ipcRenderer.invoke('get-system-theme'),
    openDevTools: () => ipcRenderer.invoke('open-dev-tools'),
    onWindowResized: (callback) => ipcRenderer.on('window-resized', callback),
})

contextBridge.exposeInMainWorld("darkMode", {
    toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
    // system: () => ipcRenderer.invoke("dark-mode:system"),
});