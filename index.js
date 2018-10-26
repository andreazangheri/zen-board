"use strict";
const electron = require("electron");
const fs = require("fs");
const path = require("path");
const config = require("./src/config");
const dockMenu = require("./src/dockMenu");

const { app, BrowserWindow, Menu } = require("electron");

// Mantiene un riferimento globale all'oggetto window, se non lo fai, la finestra sarà
// chiusa automaticamente quando l'oggetto JavaScript sarà garbage collected.
let win;

function onClosed() {
  win = null;
}

function createWindow() {
  // Creazione della finestra del browser.
  const url = config.get("url");
  const windowState = config.get("windowState");
  const win = new electron.BrowserWindow({
    icon: path.join(__dirname, "static/icon.png"),
    height: windowState.height,
    title: app.getName(),
    titleBarStyle: "standard",
    width: windowState.width
  });

  win.loadURL(url);
  win.on("close", onClosed);

  win.webContents.on("did-navigate-in-page", (e, url) => {
    config.set("url", url);
  });

  return win;
}

// Questo metodo viene chiamato quando Electron ha finito
// l'inizializzazione ed è pronto a creare le finestre browser.
// Alcune API possono essere utilizzate solo dopo che si verifica questo evento.
app.on("ready", () => {
  win = createWindow();

  const page = win.webContents;
  page.on("dom-ready", () => {
    page.insertCSS(
      fs.readFileSync(path.join(__dirname, "./src/style.css"), "utf8")
    );
    win.show();
  });
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

// in questo file possiamo includere il codice specifico necessario
// alla nostra app. Si può anche mettere il codice in file separati e richiederlo qui.
