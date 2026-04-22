/**
 * VITARIS II LAUNCHER - UI Binder
 */

const remote = require('@electron/remote')
const currentWindow = remote.getCurrentWindow()

// ── Frame buttons ───────────────────────────────────────────────────────────
document.getElementById('frameButton_minimize').addEventListener('click', () => currentWindow.minimize())
document.getElementById('frameButton_maximize').addEventListener('click', () => {
    currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize()
})
document.getElementById('frameButton_close').addEventListener('click', () => currentWindow.close())

if (process.platform === 'darwin') {
    document.getElementById('frameContentDarwin').style.display = 'flex'
    document.getElementById('frameContentWin').style.display    = 'none'
    document.getElementById('frameButtonDarwin_close').addEventListener('click', () => currentWindow.close())
    document.getElementById('frameButtonDarwin_minimize').addEventListener('click', () => currentWindow.minimize())
    document.getElementById('frameButtonDarwin_maximize').addEventListener('click', () => {
        currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize()
    })
}

// ── Welcome ─────────────────────────────────────────────────────────────────
document.getElementById('welcomeButton').addEventListener('click', () => switchView(VIEWS.LOGIN))

// ── Login: Microsoft ────────────────────────────────────────────────────────
document.getElementById('loginMicrosoftButton').addEventListener('click', () => {
    switchView(VIEWS.WAITING)
    const { ipcRenderer } = require('electron')
    ipcRenderer.send('MSFTOpenLogin', VIEWS.LANDING, VIEWS.LOGIN)

    ipcRenderer.once('MSFTReplyLogin', (event, type, data, view) => {
        if (type === 'success') {
            // Mostrar landing primero
            switchView(VIEWS.LANDING)
            // Intentar cargar avatar con el código de auth
            if (data && data.code) {
                fetchMinecraftProfile(data.code)
            }
        } else {
            switchView(view || VIEWS.LOGIN)
        }
    })
})

async function fetchMinecraftProfile(authCode) {
    try {
        // Intercambiar código por token
        const tokenRes = await fetch('https://login.microsoftonline.com/consumers/oauth2/v2.0/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: '0b9981b0-be10-41f2-a994-a586a22486f6',
                code: authCode,
                grant_type: 'authorization_code',
                redirect_uri: 'https://login.microsoftonline.com/common/oauth2/nativeclient',
                scope: 'XboxLive.signin offline_access'
            })
        })
        const tokenData = await tokenRes.json()
        if (tokenData.access_token) {
            await loadMicrosoftAccount(tokenData)
        }
    } catch(err) {
        console.error('Error obteniendo token:', err)
    }
}

// ── Cargar cuenta Microsoft ─────────────────────────────────────────────────
async function loadMicrosoftAccount(authData) {
    try {
        // Obtener access token de Xbox Live
        const xblRes = await fetch('https://user.auth.xboxlive.com/user/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                Properties: {
                    AuthMethod: 'RPS',
                    SiteName: 'user.auth.xboxlive.com',
                    RpsTicket: `d=${authData.access_token}`
                },
                RelyingParty: 'http://auth.xboxlive.com',
                TokenType: 'JWT'
            })
        })
        const xblData = await xblRes.json()
        const xblToken = xblData.Token
        const userHash = xblData.DisplayClaims.xui[0].uhs

        // Obtener token XSTS
        const xstsRes = await fetch('https://xsts.auth.xboxlive.com/xsts/authorize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                Properties: { SandboxId: 'RETAIL', UserTokens: [xblToken] },
                RelyingParty: 'rp://api.minecraftservices.com/',
                TokenType: 'JWT'
            })
        })
        const xstsData = await xstsRes.json()
        const xstsToken = xstsData.Token

        // Obtener token de Minecraft
        const mcRes = await fetch('https://api.minecraftservices.com/authentication/login_with_xbox', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identityToken: `XBL3.0 x=${userHash};${xstsToken}` })
        })
        const mcData = await mcRes.json()
        const mcToken = mcData.access_token

        // Obtener perfil de Minecraft
        const profileRes = await fetch('https://api.minecraftservices.com/minecraft/profile', {
            headers: { 'Authorization': `Bearer ${mcToken}` }
        })
        const profile = await profileRes.json()

        // Actualizar UI con datos reales
        if (profile.name) {
            document.getElementById('playerName').textContent = profile.name
            document.getElementById('playerType').textContent = 'Microsoft'
            const avatarUrl = `https://crafatar.com/avatars/${profile.id}?size=36&overlay`
            document.getElementById('playerAvatar').src = avatarUrl
            document.getElementById('playerAvatar').onerror = () => {
                document.getElementById('playerAvatar').src = `https://crafatar.com/avatars/steve?size=36`
            }
        }

    } catch (err) {
        console.error('Error cargando cuenta Microsoft:', err)
        document.getElementById('playerName').textContent = 'Jugador'
        document.getElementById('playerType').textContent = 'Microsoft'
    }
}

// ── Settings ────────────────────────────────────────────────────────────────
document.getElementById('settingsBack').addEventListener('click', () => switchView(VIEWS.LANDING))
document.getElementById('settingsNavButton').addEventListener('click', () => switchView(VIEWS.SETTINGS))

// ── Player switch ───────────────────────────────────────────────────────────
document.getElementById('playerSwitchButton').addEventListener('click', () => {
    showOverlay('Cambiar cuenta', '¿Deseas cerrar sesión y cambiar de cuenta?',
        () => switchView(VIEWS.LOGIN), null)
})

// ── Settings autor link ─────────────────────────────────────────────────────
document.getElementById('settingsAuthorLink').addEventListener('click', () => {
    const { shell } = require('electron')
    shell.openExternal('https://github.com/NET-Jason')
})

// ── Toggles ─────────────────────────────────────────────────────────────────
initToggle('closeLauncherToggle', false, (val) => console.log('Cerrar launcher:', val))
initToggle('prereleaseToggle', false, (val) => console.log('Prereleases:', val))

// ── INIT ────────────────────────────────────────────────────────────────────
setTimeout(() => {
    hideLoadingScreen()
    switchView(VIEWS.WELCOME)
}, 1500)