module.exports = {
  createWindow
};

const electron = require("electron");
const fs = require("fs");
const path = require("path");
const config = require("./config");
const dock = require("./dock");
const updater = require("./updater");
const menu = require("./menu");
const zen = require("./zen");
const app = electron.app;

const { autoUpdater } = require("electron-updater");

let win;

function onClosed() {
  win = null;
}
// Creazione della finestra dell'app.
function createWindow() {
  const url = zen.get("url");
  const windowState = zen.get("windowState");
  const win = new electron.BrowserWindow({
    icon: config.ICON_PATH,
    height: windowState.height,
    title: config.APP_NAME,
    titleBarStyle: "default", //hidden
    transparent: false,
    width: windowState.width
  });

  win.loadURL(url);
  win.on("closed", onClosed);

  win.webContents.on("did-navigate-in-page", (e, url) => {
    zen.set("url", url);
  });

  const style = win.webContents;
  style.on("did-finish-load", () => {
    style.insertCSS(fs.readFileSync(config.STYLE_PATH_DARK, "utf8"));

    win.show();
  });
  // Modulo Dock
  dock.init();
  return win;
}

app.on("ready", () => {
  win = createWindow();
  // Modulo Menu
  menu.init();
});

// Terminiamo l'App quando tutte le finestre vengono chiuse.
app.on("window-all-closed", () => {
  // Su macOS è comune che l'applicazione e la barra menù
  // restano attive finché l'utente non esce espressamente tramite i tasti Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (!win) {
    win = createWindow();
  }
});

app.on("before-quit", () => {});
