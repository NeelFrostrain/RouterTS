# Router TS - Electron Router Management Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Electron](https://img.shields.io/badge/Electron-191970?logo=Electron&logoColor=white)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

A modern Electron-based desktop application for router management with automated login capabilities and a sleek dark mode interface.

## 🚀 Features

- **🖥️ Desktop Router Interface**: Native desktop application for router management
- **🔐 Automated Login**: Automatic authentication with pre-configured credentials
- **🖱️ Context Menu**: Right-click navigation with back, forward, and reload options
- **📱 Responsive Design**: Adaptive layout that works on different screen sizes
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🔧 TypeScript Support**: Full TypeScript integration for better development experience
- **📦 Cross-Platform**: Supports Windows, macOS, and Linux distributions

## 📊 Project Analytics

### 📈 Codebase Statistics

- **Total Files**: 10,798 (including dependencies)
- **Source Files**: 6 core application files
- **Source Code Size**: 1.9 KB
- **Languages**: TypeScript (85%), CSS (10%), HTML (5%)
- **Dependencies**: 15 production & development packages

### 🏗️ Architecture Overview

```
router-ts/
├── 📁 electron/           # Electron main process
│   └── main.ts           # Main application logic
├── 📁 src/               # React frontend source
│   ├── App.tsx           # Main React component
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles
├── 📁 public/            # Static assets
├── 📁 dist/              # Built frontend
├── 📁 dist-electron/     # Built Electron app
└── 📁 release/           # Distribution packages
```

### 🔧 Technology Stack

| Technology           | Version  | Purpose                       |
| -------------------- | -------- | ----------------------------- |
| **Electron**         | ^30.0.1  | Desktop application framework |
| **React**            | ^18.2.0  | Frontend UI library           |
| **TypeScript**       | ^5.2.2   | Type-safe development         |
| **Vite**             | ^5.1.6   | Build tool and dev server     |
| **Electron Builder** | ^24.13.3 | Application packaging         |

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd router-ts

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Usage

### Development Mode

```bash
npm run dev
```

Starts the Vite development server and Electron application in development mode.

### Production Build

```bash
npm run build
```

Builds the application for production and creates distributable packages.

### Code Quality

```bash
npm run lint
```

Runs ESLint to check code quality and formatting.

## ⚙️ Configuration

### Router Settings

The application is pre-configured to connect to:

- **Default Router IP**: `192.168.1.1`
- **Username**: `admin`
- **Password**: `admin@123`

### Customization

You can modify the router credentials in `electron/main.ts`:

```typescript
const USERNAME = "your-username";
const PASSWORD = "your-password";
```

## 🎨 UI Features

### Application Interface

- **Embedded Router View**: Router interface embedded within Electron window
- **Responsive Layout**: Adapts to different window sizes
- **Native Integration**: System tray and native context menus
- **Cross-Platform**: Consistent experience across operating systems

## 📱 Platform Support

### Windows

- **Format**: NSIS installer (.exe)
- **Architecture**: x64
- **Features**: Auto-updater support, system tray integration

### macOS

- **Format**: DMG disk image
- **Features**: Code signing ready, native look and feel

### Linux

- **Format**: AppImage
- **Features**: Portable, no installation required

## 🔧 Development

### Project Structure

```typescript
// Main Electron process
electron / main.ts; // Application lifecycle, window management

// React frontend
src / App.tsx; // Main application component
src / main.tsx; // React DOM rendering
src / index.css; // Global CSS reset
```

### Key Features Implementation

- **BrowserView Integration**: Embeds router interface within Electron
- **Automated Authentication**: JavaScript injection for login automation
- **IPC Communication**: Secure communication between processes
- **Context Menu**: Custom right-click menu with navigation options

## 🚀 Build & Distribution

### Build Commands

```bash
# Development build
npm run dev

# Production build with packaging
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Distribution Packages

The build process creates platform-specific installers:

- **Windows**: `RouterTS-Windows-{version}-Setup.exe`
- **macOS**: `RouterTS-Mac-{version}-Installer.dmg`
- **Linux**: `RouterTS-Linux-{version}.AppImage`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](#license) file for details.

## 🐛 Known Issues

- Some Electron APIs are deprecated (BrowserView, webContents methods)
- Router interface may vary depending on firmware versions

## 🔮 Future Enhancements

- [ ] Multi-router support
- [ ] Network monitoring dashboard
- [ ] Backup/restore configurations
- [ ] Plugin system for different router brands
- [ ] Connection status indicators

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Made with ❤️ using Electron, React, and TypeScript**
