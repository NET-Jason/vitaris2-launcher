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

## Requisitos del Sistema

| Componente | Minimo | Recomendado |
|------------|--------|-------------|
| **Sistema Operativo** | Windows 10 / macOS 10.15 / Ubuntu 20.04 | Windows 11 / macOS 12+ / Ubuntu 22.04 |
| **RAM** | 4 GB | 8 GB o mas |
| **Almacenamiento** | 4 GB libres | 8 GB libres |
| **Java** | Java 17 (instalado automaticamente) | Java 17+ |
| **Conexion** | Conexion a internet estable | Banda ancha |

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

```
EVIMERIA-LAUNCHER/
├── app/
│   ├── assets/
│   │   ├── css/          # Estilos
│   │   ├── fonts/        # Fuentes
│   │   ├── images/       # Imagenes y fondos
│   │   ├── js/           # Scripts principales
│   │   │   └── scripts/  # Scripts de UI
│   │   └── lang/         # Archivos de idioma
│   ├── app.ejs           # Plantilla principal
│   ├── frame.ejs         # Marco de ventana
│   ├── landing.ejs       # Pantalla principal
│   ├── login.ejs         # Pantalla de login
│   └── settings.ejs      # Pantalla de configuracion
├── index.js              # Punto de entrada de Electron
├── package.json          # Configuracion del proyecto
└── electron-builder.yml  # Configuracion de compilacion
```

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
