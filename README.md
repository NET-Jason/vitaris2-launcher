<div align="center">

<img src="app/assets/images/VitarisLogo.png" alt="Vitaris II Logo" width="120"/>

# Vitaris II Launcher

**El launcher oficial del servidor de Minecraft Vitaris II**

![Version](https://img.shields.io/github/v/release/NET-Jason/vitaris2-launcher?style=for-the-badge&color=7c3aed&label=versión)
![Build](https://img.shields.io/github/actions/workflow/status/NET-Jason/vitaris2-launcher/build.yml?style=for-the-badge&color=7c3aed&label=build)
![License](https://img.shields.io/badge/licencia-UNLICENSED-7c3aed?style=for-the-badge)
![Platform](https://img.shields.io/badge/plataforma-Windows%20%7C%20macOS%20%7C%20Linux-7c3aed?style=for-the-badge)

[⬇️ Descargar](https://github.com/NET-Jason/vitaris2-launcher/releases/latest) · [🐛 Reportar Bug](https://github.com/NET-Jason/vitaris2-launcher/issues) · [💬 Discord](https://discord.gg/JnXmbsv9Eq)

</div>

---

## ✨ Características

- 🚀 **Instalación automática** de mods y configuraciones del servidor
- 🔄 **Auto-actualizaciones** del launcher y del modpack
- 🔐 **Autenticación Microsoft** integrada para cuentas de Minecraft
- 🎨 **Diseño moderno** con fondos del servidor Vitaris II
- ⚙️ **Gestión de Java** configurable (RAM, ruta, argumentos JVM)
- 🖥️ **Multi-plataforma** — Windows, macOS y Linux

---

## 📥 Instalación

### Para jugadores

1. Ve a [**Releases**](https://github.com/NET-Jason/vitaris2-launcher/releases/latest)
2. Descarga el instalador para tu sistema:
   - **Windows** → `Vitaris II Launcher-setup-x.x.x.exe`
   - **macOS** → `Vitaris II Launcher-setup-x.x.x.dmg`
   - **Linux** → `Vitaris II Launcher-x.x.x.AppImage`
3. Instala y ejecuta el launcher
4. Inicia sesión con tu cuenta de Microsoft
5. ¡Haz clic en **JUGAR**!

---

## 🛠️ Desarrollo

### Requisitos

- [Node.js 20.x](https://nodejs.org/)
- npm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/NET-Jason/vitaris2-launcher.git
cd vitaris2-launcher

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start
```

### Build

```bash
# Windows
npm run dist:win

# macOS
npm run dist:mac

# Linux
npm run dist:linux
```

---

## 📁 Estructura del proyecto
vitaris2-launcher/
├── index.js                        # Proceso principal de Electron
├── app/
│   ├── app.ejs                     # Template HTML principal
│   └── assets/
│       ├── css/
│       │   └── launcher.css        # Estilos del launcher
│       ├── images/
│       │   ├── backgrounds/        # Fondos del servidor (0-7.jpg)
│       │   └── VitarisLogo.png     # Logo del servidor
│       └── js/
│           ├── scripts/
│           │   ├── uicore.js       # Funciones base de la UI
│           │   └── uibinder.js     # Eventos y navegación
│           ├── lang/
│           │   └── es_ES.json      # Traducciones
│           ├── ipcconstants.js     # Constantes IPC
│           ├── langloader.js       # Cargador de idiomas
│           └── preloader.js        # Preload script
├── .github/
│   └── workflows/
│       └── build.yml               # CI/CD con GitHub Actions
├── electron-builder.yml            # Configuración de build
└── package.json
---

## 🔧 Configuración

Para habilitar el login con Microsoft necesitas un **Azure Client ID**:

1. Ve a [Azure App Registrations](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)
2. Crea una nueva app con redirect URI: `https://login.microsoftonline.com/common/oauth2/nativeclient`
3. Copia el **Application (client) ID**
4. Pégalo en `app/assets/js/ipcconstants.js`:

```javascript
exports.AZURE_CLIENT_ID = 'tu-client-id-aqui'
```

---

## 🚀 CI/CD

El proyecto usa **GitHub Actions** para compilar automáticamente en los 3 sistemas operativos al crear un nuevo tag:

```bash
git tag v1.x.x
git push origin v1.x.x
```

---

## 👤 Autor

**NET-Jason**

- GitHub: [@NET-Jason](https://github.com/NET-Jason)

---

<div align="center">

**Vitaris II Launcher** — Hecho con ❤️ para la comunidad de Vitaris II

</div>
