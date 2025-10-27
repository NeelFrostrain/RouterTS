import { app as s, BrowserWindow as c, Tray as f, nativeImage as r, BrowserView as b, Menu as h, ipcMain as a } from "electron";
import { fileURLToPath as C } from "node:url";
import t from "node:path";
const l = t.dirname(C(import.meta.url));
process.env.APP_ROOT = t.join(l, "..");
const d = process.env.VITE_DEV_SERVER_URL, E = t.join(process.env.APP_ROOT, "dist-electron"), m = t.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = d ? t.join(process.env.APP_ROOT, "public") : m;
const I = process.platform === "win32", R = process.platform === "darwin", p = I ? t.join(l, "../release", "Icon.ico") : R ? t.join(process.env.VITE_PUBLIC, "Icon.icns") : t.join(process.env.VITE_PUBLIC, "Icon.png"), _ = t.join(l, "../release", "Icon.ico");
let o = null, n = null;
const g = "admin", u = "admin@123";
function w() {
  o = new c({
    width: 1200,
    height: 900,
    frame: !1,
    titleBarStyle: "hidden",
    icon: p,
    webPreferences: {
      preload: t.join(l, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), o.setMenu(null), o.webContents.session.clearCache(), new f(r.createFromPath(_)), o.setIcon(r.createFromPath(p)), d ? o.loadURL(d) : o.loadFile(t.join(m, "index.html")), o.on("closed", () => {
    n = null, o = null;
  }), n = new b({
    webPreferences: {
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), o.setBrowserView(n), n.webContents.loadURL("http://192.168.1.1/"), n.webContents.on("context-menu", () => {
    h.buildFromTemplate([
      {
        label: "Copy",
        accelerator: "Ctrl+C",
        click: () => n == null ? void 0 : n.webContents.copy()
      },
      { type: "separator" },
      {
        label: "Back",
        enabled: (n == null ? void 0 : n.webContents.canGoBack()) ?? !1,
        click: () => n == null ? void 0 : n.webContents.goBack()
      },
      {
        label: "Forward",
        enabled: (n == null ? void 0 : n.webContents.canGoForward()) ?? !1,
        click: () => n == null ? void 0 : n.webContents.goForward()
      },
      { type: "separator" },
      {
        label: "Reload",
        accelerator: "Ctrl+R",
        click: () => n == null ? void 0 : n.webContents.reload()
      },
      { type: "separator" }
    ]).popup({ window: o });
  }), n.webContents.on("did-finish-load", () => {
    ((n == null ? void 0 : n.webContents.getURL()) || "").endsWith("login_en.asp") && (n == null || n.webContents.executeJavaScript(`
      (function() {
        const u = document.querySelector('#username');
        const p = document.querySelector('#psd');
        const v = document.querySelector('#verification_code');

        if(u) u.value = "${g}";
        if(p) p.value = "${u}";
        if(v) v.value = document.querySelector('#check_code')?.value || "";

        if(typeof on_submit === 'function') on_submit();
      })();
    `));
  }), a.on("send-resize", (e, i) => {
    n && o && n.setBounds({
      x: i.x,
      y: i.y,
      width: i.width,
      height: i.height
    });
  }), a.handle("window:minimize", () => {
    const e = c.getFocusedWindow();
    e && e.minimize();
  }), a.handle("window:maximize", () => {
    const e = c.getFocusedWindow();
    e && (e.isMaximized() ? e.unmaximize() : e.maximize());
  }), a.handle("window:close", () => {
    const e = c.getFocusedWindow();
    e && e.close();
  }), a.handle("browser:forward", () => {
    n != null && n.webContents.canGoForward() && (n == null || n.webContents.goForward());
  }), a.handle("browser:backward", () => {
    n != null && n.webContents.canGoBack() && (n == null || n.webContents.goBack());
  }), a.handle("browser:reload", () => {
    n != null && n.webContents.isLoading() || n == null || n.webContents.reload();
  });
}
s.disableHardwareAcceleration();
s.commandLine.appendSwitch("disable-gpu");
s.commandLine.appendSwitch("disable-software-rasterizer");
s.whenReady().then(w);
s.on("window-all-closed", async () => {
  if (process.platform !== "darwin") {
    if (n)
      try {
        await n.webContents.loadURL(
          "http://192.168.1.1/boaform/admin/formLogout.asp"
        );
      } catch {
      }
    s.quit();
  }
});
s.on("activate", () => {
  c.getAllWindows().length === 0 && w();
});
export {
  E as MAIN_DIST,
  m as RENDERER_DIST,
  d as VITE_DEV_SERVER_URL
};
