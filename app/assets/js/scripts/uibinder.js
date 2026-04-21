 /**
 * VITARIS II LAUNCHER - UI Binder
 * Conecta los elementos de la UI con sus acciones
 */

document.addEventListener('DOMContentLoaded', () => {

    // ── Frame: botones de ventana ───────────────────────────────────────────
    const remote = require('@electron/remote')
    const currentWindow = remote.getCurrentWindow()

    const btnMinimize = document.getElementById('frameButton_minimize')
    const btnMaximize = document.getElementById('frameButton_maximize')
    const btnClose    = document.getElementById('frameButton_close')

    if (btnMinimize) btnMinimize.addEventListener('click', () => currentWindow.minimize())
    if (btnMaximize) btnMaximize.addEventListener('click', () => {
        if (currentWindow.isMaximized()) {
            currentWindow.unmaximize()
        } else {
            currentWindow.maximize()
        }
    })
    if (btnClose) btnClose.addEventListener('click', () => currentWindow.close())

    // Darwin buttons
    const btnDarwinClose    = document.getElementById('frameButtonDarwin_close')
    const btnDarwinMinimize = document.getElementById('frameButtonDarwin_minimize')
    const btnDarwinMaximize = document.getElementById('frameButtonDarwin_maximize')

    if (btnDarwinClose)    btnDarwinClose.addEventListener('click', () => currentWindow.close())
    if (btnDarwinMinimize) btnDarwinMinimize.addEventListener('click', () => currentWindow.minimize())
    if (btnDarwinMaximize) btnDarwinMaximize.addEventListener('click', () => {
        if (currentWindow.isMaximized()) {
            currentWindow.unmaximize()
        } else {
            currentWindow.maximize()
        }
    })

    // Mostrar frame correcto según plataforma
    const frameDarwin = document.getElementById('frameContentDarwin')
    const frameWin    = document.getElementById('frameContentWin')
    if (process.platform === 'darwin') {
        if (frameDarwin) frameDarwin.style.display = 'flex'
        if (frameWin)    frameWin.style.display    = 'none'
    }

    // ── Welcome: botón comenzar ─────────────────────────────────────────────
    const welcomeBtn = document.getElementById('welcomeButton')
    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', () => {
            switchView(VIEWS.LOGIN)
        })
    }

    // ── Login: botón Microsoft ──────────────────────────────────────────────
    const msftBtn = document.getElementById('loginMicrosoftButton')
    if (msftBtn) {
        msftBtn.addEventListener('click', () => {
            switchView(VIEWS.WAITING)
            const { ipcRenderer } = require('electron')
            ipcRenderer.send(MSFT_OPCODE.OPEN_LOGIN, VIEWS.LANDING, VIEWS.LOGIN)
        })
    }

    // ── Settings: botón volver ──────────────────────────────────────────────
    const settingsBack = document.getElementById('settingsBack')
    if (settingsBack) {
        settingsBack.addEventListener('click', () => {
            switchView(VIEWS.LANDING)
        })
    }

    // ── Landing: botón settings ─────────────────────────────────────────────
    const settingsNav = document.getElementById('settingsNavButton')
    if (settingsNav) {
        settingsNav.addEventListener('click', () => {
            switchView(VIEWS.SETTINGS)
        })
    }

    // ── Landing: botón cambiar cuenta ───────────────────────────────────────
    const switchBtn = document.getElementById('playerSwitchButton')
    if (switchBtn) {
        switchBtn.addEventListener('click', () => {
            showOverlay(
                'Cambiar cuenta',
                '¿Deseas cerrar sesión y cambiar de cuenta?',
                () => switchView(VIEWS.LOGIN),
                null
            )
        })
    }

    // ── Settings: botón browse Java ─────────────────────────────────────────
    const javaPathBrowse = document.getElementById('javaPathBrowse')
    if (javaPathBrowse) {
        javaPathBrowse.addEventListener('click', async () => {
            const { dialog } = remote
            const result = await dialog.showOpenDialog(currentWindow, {
                title: 'Seleccionar ejecutable de Java',
                properties: ['openFile'],
                filters: [{ name: 'Java', extensions: ['exe', ''] }]
            })
            if (!result.canceled && result.filePaths.length > 0) {
                document.getElementById('javaPath').value = result.filePaths[0]
            }
        })
    }

    // ── Settings: toggles ───────────────────────────────────────────────────
    initToggle('closeLauncherToggle', false, (val) => {
        console.log('Cerrar launcher al jugar:', val)
    })
    initToggle('prereleaseToggle', false, (val) => {
        console.log('Prereleases:', val)
    })

    // ── Settings: link autor ────────────────────────────────────────────────
    const authorLink = document.getElementById('settingsAuthorLink')
    if (authorLink) {
        authorLink.addEventListener('click', () => {
            const { shell } = require('electron')
            shell.openExternal('https://github.com/NET-Jason')
        })
    }

    // ── Inicializar: mostrar pantalla de bienvenida ─────────────────────────
    setTimeout(() => {
        hideLoadingScreen()
        switchView(VIEWS.WELCOME)
    }, 1500)

})
