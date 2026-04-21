 const { contextBridge, ipcRenderer } = require('electron')

// Exponer APIs seguras al renderer si se necesitan en el futuro
window.addEventListener('DOMContentLoaded', () => {
    console.log('Vitaris II Launcher - Preloader iniciado')
})
