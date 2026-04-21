const { contextBridge } = require('electron')
require('@electron/remote/renderer')

window.addEventListener('DOMContentLoaded', () => {
    console.log('Vitaris II Launcher - Preloader iniciado')
})