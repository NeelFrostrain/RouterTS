import { app, BrowserWindow, Tray, nativeImage, BrowserView, Menu, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
const isWin = process.platform === "win32";
const isMac = process.platform === "darwin";
const windowIcon = isWin ? path.join(__dirname, "../release", "Icon.ico") : isMac ? path.join(process.env.VITE_PUBLIC, "Icon.icns") : path.join(process.env.VITE_PUBLIC, "Icon.png");
const trayIcon = path.join(__dirname, "../release", "Icon.ico");
let window = null;
let routerView = null;
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
      contextIsolation: true
    }
  });
  window.setMenu(null);
  window.webContents.session.clearCache();
  new Tray(nativeImage.createFromPath(trayIcon));
  window.setIcon(nativeImage.createFromPath(windowIcon));
  if (VITE_DEV_SERVER_URL) {
    window.loadURL(VITE_DEV_SERVER_URL);
  } else {
    window.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  window.on("closed", () => {
    routerView = null;
    window = null;
  });
  routerView = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  window.setBrowserView(routerView);
  routerView.webContents.loadURL("http://192.168.1.1/");
  routerView.webContents.on("context-menu", () => {
    const menu = Menu.buildFromTemplate([
      {
        label: "Copy",
        accelerator: "Ctrl+C",
        click: () => routerView == null ? void 0 : routerView.webContents.copy()
      },
      { type: "separator" },
      {
        label: "Back",
        enabled: (routerView == null ? void 0 : routerView.webContents.canGoBack()) ?? false,
        click: () => routerView == null ? void 0 : routerView.webContents.goBack()
      },
      {
        label: "Forward",
        enabled: (routerView == null ? void 0 : routerView.webContents.canGoForward()) ?? false,
        click: () => routerView == null ? void 0 : routerView.webContents.goForward()
      },
      { type: "separator" },
      {
        label: "Reload",
        accelerator: "Ctrl+R",
        click: () => routerView == null ? void 0 : routerView.webContents.reload()
      },
      { type: "separator" }
    ]);
    menu.popup({ window });
  });
  routerView.webContents.on("did-finish-load", () => {
    const url = (routerView == null ? void 0 : routerView.webContents.getURL()) || "";
    if (url.endsWith("login_en.asp")) {
      routerView == null ? void 0 : routerView.webContents.executeJavaScript(`
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
    }
  });
  ipcMain.on("send-resize", (_, data) => {
    if (routerView && window) {
      routerView.setBounds({
        x: data.x,
        y: data.y,
        width: data.width,
        height: data.height
      });
    }
  });
}
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
      } catch (err) {
      }
    }
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
