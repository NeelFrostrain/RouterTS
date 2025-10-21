import {
  app,
  BrowserView,
  BrowserWindow,
  ipcMain,
  Menu,
  nativeImage,
  Tray,
} from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

const isWin = process.platform === "win32";
const isMac = process.platform === "darwin";

const windowIcon = isWin
  ? path.join(__dirname, "../release", "Icon.ico")
  : isMac
  ? path.join(process.env.VITE_PUBLIC, "Icon.icns")
  : path.join(process.env.VITE_PUBLIC, "Icon.png");

// Tray icon (PNG recommended)
const trayIcon = path.join(__dirname, "../release", "Icon.ico");

// --- Types ---
interface SendResize {
  x: number;
  y: number;
  width: number;
  height: number;
}

// --- Globals ---
let window: BrowserWindow | null = null;
let routerView: BrowserView | null = null;

const USERNAME = "admin";
const PASSWORD = "admin@123";

function createWindow() {
  window = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: windowIcon,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  window.setMenu(null);
  window.webContents.session.clearCache();
  new Tray(nativeImage.createFromPath(trayIcon));
  window.setIcon(nativeImage.createFromPath(windowIcon));

  // Load your React app
  if (VITE_DEV_SERVER_URL) {
    window.loadURL(VITE_DEV_SERVER_URL);
  } else {
    window.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  window.on("closed", () => {
    routerView = null;
    window = null;
  });

  // Create a BrowserView (the router)
  routerView = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  window.setBrowserView(routerView);
  routerView.webContents.loadURL("http://192.168.1.1/");

  // Add this inside your createWindow() after routerView creation
  routerView.webContents.on("context-menu", () => {
    const menu = Menu.buildFromTemplate([
      {
        label: "Copy",
        accelerator: "Ctrl+C",
        click: () => routerView?.webContents.copy(),
      },
      { type: "separator" },
      {
        label: "Back",
        enabled: routerView?.webContents.canGoBack() ?? false,
        click: () => routerView?.webContents.goBack(),
      },
      {
        label: "Forward",
        enabled: routerView?.webContents.canGoForward() ?? false,
        click: () => routerView?.webContents.goForward(),
      },
      { type: "separator" },
      {
        label: "Reload",
        accelerator: "Ctrl+R",
        click: () => routerView?.webContents.reload(),
      },
      { type: "separator" },
    ]);

    menu.popup({ window: window! });
  });

  routerView.webContents.on("did-finish-load", () => {
    const url = routerView?.webContents.getURL() || "";

    if (url.endsWith("login_en.asp")) {
      routerView?.webContents.executeJavaScript(`
      (function() {
        const u = document.querySelector('#username');
        const p = document.querySelector('#psd');
        const v = document.querySelector('#verification_code');

        if(u) u.value = "${USERNAME}";
        if(p) p.value = "${PASSWORD}";
        if(v) v.value = document.querySelector('#check_code')?.value || "";

        if(typeof on_submit === 'function') on_submit();
      })();
    `);
      // console.log("Auto-login executed");
    }
  });

  // Open the DevTools panel immediately
  // routerView.webContents.openDevTools({ mode: "detach" });

  // IPC listener for resizing
  ipcMain.on("send-resize", (_, data: SendResize) => {
    if (routerView && window) {
      routerView.setBounds({
        x: data.x,
        y: data.y,
        width: data.width,
        height: data.height,
      });
    }
  });
}

// Disable GPU
app.disableHardwareAcceleration();
app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendSwitch("disable-software-rasterizer");

app.whenReady().then(createWindow);

app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") {
    if (routerView) {
      try {
        await routerView.webContents.loadURL(
          "http://192.168.1.1/boaform/admin/formLogout.asp"
        );
        // console.log("Logged out from router");
      } catch (err) {
        // console.error("Logout failed:", err);
      }
    }

    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
