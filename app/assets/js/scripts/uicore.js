 /**
 * VITARIS II LAUNCHER - UI Core
 * Maneja la navegación entre vistas y funciones base de la UI
 */

// ── Vistas disponibles ──────────────────────────────────────────────────────
const VIEWS = {
    WELCOME       : '#welcomeContainer',
    LOGIN         : '#loginContainer',
    WAITING       : '#waitingContainer',
    LOGIN_OPTIONS : '#loginOptionsContainer',
    LANDING       : '#landingContainer',
    SETTINGS      : '#settingsContainer'
}

// ── Mostrar una vista y ocultar el resto ────────────────────────────────────
function switchView(view) {
    Object.values(VIEWS).forEach(selector => {
        const el = document.querySelector(selector)
        if (el) el.style.display = 'none'
    })
    const target = document.querySelector(view)
    if (target) {
        target.style.display = 'flex'
        target.style.animation = 'fadeIn 0.3s ease'
    }
}

// ── Ocultar pantalla de carga ───────────────────────────────────────────────
function hideLoadingScreen() {
    const loader = document.getElementById('loadingContainer')
    if (!loader) return
    loader.style.transition = 'opacity 0.5s ease'
    loader.style.opacity = '0'
    setTimeout(() => {
        loader.style.display = 'none'
        document.getElementById('main').style.display = 'block'
    }, 500)
}

// ── Overlay de confirmación ─────────────────────────────────────────────────
function showOverlay(title, desc, onConfirm, onCancel) {
    document.getElementById('overlayTitle').textContent = title
    document.getElementById('overlayDesc').textContent  = desc
    document.getElementById('overlayContainer').style.display = 'flex'

    const confirmBtn = document.getElementById('overlayActionConfirm')
    const cancelBtn  = document.getElementById('overlayActionCancel')

    confirmBtn.onclick = () => {
        hideOverlay()
        if (onConfirm) onConfirm()
    }
    cancelBtn.onclick = () => {
        hideOverlay()
        if (onCancel) onCancel()
    }
}

function hideOverlay() {
    document.getElementById('overlayContainer').style.display = 'none'
}

// ── Control de la barra de progreso ────────────────────────────────────────
function setProgress(percent, statusText) {
    const fill   = document.getElementById('progressBarFill')
    const value  = document.getElementById('progressValue')
    const status = document.getElementById('progressStatus')
    const container = document.getElementById('progressContainer')

    if (container) container.style.display = 'flex'
    if (fill)   fill.style.width   = `${Math.min(100, Math.max(0, percent))}%`
    if (value)  value.textContent  = `${Math.round(percent)}%`
    if (status) status.textContent = statusText || ''
}

function hideProgress() {
    const container = document.getElementById('progressContainer')
    if (container) container.style.display = 'none'
}

// ── Estado del servidor ─────────────────────────────────────────────────────
function setServerStatus(online, playerCount) {
    const icon = document.getElementById('serverStatusIcon')
    const text = document.getElementById('serverStatusText')
    if (!icon || !text) return

    if (online) {
        icon.className = 'online'
        text.textContent = playerCount ? `En línea · ${playerCount} jugadores` : 'En línea'
    } else {
        icon.className = 'offline'
        text.textContent = 'Sin conexión'
    }
}

// ── Mostrar error de login ──────────────────────────────────────────────────
function showLoginError(message) {
    const container = document.getElementById('loginErrorContainer')
    const msg       = document.getElementById('loginErrorMessage')
    if (container) container.style.display = 'block'
    if (msg)       msg.textContent = message
}

function hideLoginError() {
    const container = document.getElementById('loginErrorContainer')
    if (container) container.style.display = 'none'
}

// ── Toggle switches en settings ─────────────────────────────────────────────
function initToggle(id, defaultValue, onChange) {
    const toggle = document.getElementById(id)
    if (!toggle) return

    if (defaultValue) toggle.classList.add('active')

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active')
        if (onChange) onChange(toggle.classList.contains('active'))
    })
}

// ── Exportar para uso en otros scripts ─────────────────────────────────────
if (typeof module !== 'undefined') {
    module.exports = {
        VIEWS,
        switchView,
        hideLoadingScreen,
        showOverlay,
        hideOverlay,
        setProgress,
        hideProgress,
        setServerStatus,
        showLoginError,
        hideLoginError,
        initToggle
    }
}
