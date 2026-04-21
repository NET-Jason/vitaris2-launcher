# Vitaris II Launcher

<p align="center">
  <img src="app/assets/images/VitarisLogo.png" alt="Vitaris II Launcher" width="150">
</p>

<p align="center">
  <strong>Launcher oficial del servidor de Minecraft Vitaris II</strong>
</p>

<p align="center">
  <a href="https://github.com/NET-Jason/vitaris2-launcher/releases">
    <img src="https://img.shields.io/github/v/release/NET-Jason/vitaris2-launcher?style=flat-square" alt="Versión">
  </a>
  <img src="https://img.shields.io/badge/licencia-UNLICENSED-red?style=flat-square" alt="Licencia">
  <img src="https://img.shields.io/badge/plataforma-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey?style=flat-square" alt="Plataformas">
  <a href="https://github.com/NET-Jason/vitaris2-launcher/releases">
    <img src="https://img.shields.io/github/downloads/NET-Jason/vitaris2-launcher/total?style=flat-square" alt="Descargas">
  </a>
  <img src="https://img.shields.io/github/actions/workflow/status/NET-Jason/vitaris2-launcher/build.yml?style=flat-square" alt="Build">
</p>

---

## Descripción

Vitaris II Launcher es el launcher oficial del servidor de Minecraft Vitaris II. Permite a los jugadores conectarse fácilmente al servidor gestionando automáticamente la descarga de mods, actualizaciones y configuraciones necesarias para jugar.

## Características

- **Actualizaciones automáticas** - El launcher se actualiza automáticamente cuando hay nuevas versiones disponibles.
- **Gestión de mods** - Descarga e instala automáticamente los mods requeridos por el servidor.
- **Autenticación Microsoft** - Inicio de sesión seguro con tu cuenta de Microsoft/Minecraft.
- **Instalación automática de Java** - Detecta e instala la versión correcta de Java si es necesario.
- **Interfaz moderna** - Diseño oscuro con fondos del servidor Vitaris II.
- **Configuración de RAM** - Ajusta la memoria asignada al juego según tu sistema.
- **Multi-plataforma** - Compatible con Windows, macOS y Linux.

## Requisitos del Sistema

| Componente | Mínimo | Recomendado |
|------------|--------|-------------|
| **Sistema Operativo** | Windows 10 / macOS 10.15 / Ubuntu 20.04 | Windows 11 / macOS 12+ / Ubuntu 22.04 |
| **RAM** | 4 GB | 8 GB o más |
| **Almacenamiento** | 4 GB libres | 8 GB libres |
| **Java** | Java 17 (instalado automáticamente) | Java 17+ |
| **Conexión** | Conexión a internet estable | Banda ancha |

## Instalación

### Descargar

Descarga la última versión desde la [página de releases](https://github.com/NET-Jason/vitaris2-launcher/releases):

- **Windows**: `Vitaris II Launcher-setup-X.X.X.exe`
- **macOS**: `Vitaris II Launcher-setup-X.X.X.dmg`
- **Linux**: `Vitaris II Launcher-X.X.X.AppImage`

### Pasos

1. Descarga el instalador para tu sistema operativo
2. Ejecuta el instalador y sigue las instrucciones
3. Abre Vitaris II Launcher
4. Inicia sesión con tu cuenta de Microsoft
5. Haz clic en **JUGAR**

## Desarrollo

### Requisitos previos

- [Node.js](https://nodejs.org/) v20.x.x
- [Git](https://git-scm.com/)

### Configuración del entorno

```bash
# Clonar el repositorio
git clone https://github.com/NET-Jason/vitaris2-launcher.git

# Entrar al directorio
cd vitaris2-launcher

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
```

### Compilar para distribución

```bash
# Windows
npm run dist:win

# macOS
npm run dist:mac

# Linux
npm run dist:linux
```

## Estructura del Proyecto

vitaris2-launcher/
├── app/
│   ├── assets/
│   │   ├── css/          # Estilos del launcher
│   │   ├── fonts/        # Fuentes (Avenir)
│   │   ├── images/       # Imágenes y fondos del servidor
│   │   └── js/           # Scripts principales
│   │       ├── scripts/  # Scripts de UI (uicore, uibinder)
│   │       └── lang/     # Archivos de idioma
│   └── app.ejs           # Plantilla principal
├── index.js              # Punto de entrada de Electron
├── package.json          # Configuración del proyecto
└── electron-builder.yml  # Configuración de compilación

