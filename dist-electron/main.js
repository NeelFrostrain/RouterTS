import { app as t, BrowserWindow as d, Tray as u, nativeImage as l, BrowserView as f, Menu as w, ipcMain as b } from "electron";
import { fileURLToPath as h } from "node:url";
import o from "node:path";
const c = o.dirname(h(import.meta.url));
process.env.APP_ROOT = o.join(c, "..");
const a = process.env.VITE_DEV_SERVER_URL, y = o.join(process.env.APP_ROOT, "dist-electron"), p = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = a ? o.join(process.env.APP_ROOT, "public") : p;
const I = process.platform === "win32", _ = process.platform === "darwin", r = I ? o.join(c, "../release", "Icon.ico") : _ ? o.join(process.env.VITE_PUBLIC, "Icon.icns") : o.join(process.env.VITE_PUBLIC, "Icon.png"), R = o.join(c, "../release", "Icon.ico");
let n = null, e = null;
const C = "admin", v = "admin@123";
function m() {
  n = new d({
    width: 1200,
    height: 800,
    icon: r,
    webPreferences: {
      preload: o.join(c, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), n.setMenu(null), n.webContents.session.clearCache(), new u(l.createFromPath(R)), n.setIcon(l.createFromPath(r)), a ? n.loadURL(a) : n.loadFile(o.join(p, "index.html")), n.on("closed", () => {
    e = null, n = null;
  }), e = new f({
    webPreferences: {
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), n.setBrowserView(e), e.webContents.loadURL("http://192.168.1.1/"), e.webContents.on("context-menu", () => {
    w.buildFromTemplate([
      {
        label: "Copy",
        accelerator: "Ctrl+C",
        click: () => e == null ? void 0 : e.webContents.copy()
      },
      { type: "separator" },
      {
        label: "Back",
        enabled: (e == null ? void 0 : e.webContents.canGoBack()) ?? !1,
        click: () => e == null ? void 0 : e.webContents.goBack()
      },
      {
        label: "Forward",
        enabled: (e == null ? void 0 : e.webContents.canGoForward()) ?? !1,
        click: () => e == null ? void 0 : e.webContents.goForward()
      },
      { type: "separator" },
      {
        label: "Reload",
        accelerator: "Ctrl+R",
        click: () => e == null ? void 0 : e.webContents.reload()
      },
      { type: "separator" }
    ]).popup({ window: n });
  }), e.webContents.on("did-finish-load", () => {
    ((e == null ? void 0 : e.webContents.getURL()) || "").endsWith("login_en.asp") && (e == null || e.webContents.executeJavaScript(`
        (function() {
          const u = document.querySelector('#username');
          const p = document.querySelector('#psd');
          const v = document.querySelector('#verification_code');
          
          if(u) u.value = "${C}";
          if(p) p.value = "${v}";
          if(v) v.value = document.querySelector('#check_code')?.value || "";
          
          // call the page's built-in submit function
          if(typeof on_submit === 'function') {
            on_submit();
            }
            })();
     `));
  }), b.on("send-resize", (i, s) => {
    e && n && e.setBounds({
      x: s.x,
      y: s.y,
      width: s.width,
      height: s.height
    });
  });
}
t.disableHardwareAcceleration();
t.commandLine.appendSwitch("disable-gpu");
t.commandLine.appendSwitch("disable-software-rasterizer");
t.whenReady().then(m);
t.on("window-all-closed", () => {
  process.platform !== "darwin" && t.quit();
});
t.on("activate", () => {
  d.getAllWindows().length === 0 && m();
});
export {
  y as MAIN_DIST,
  p as RENDERER_DIST,
  a as VITE_DEV_SERVER_URL
};
