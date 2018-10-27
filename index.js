"use strict";

var electron = require("electron");

var fs = require("fs");

var path = require("path");

var config = require("./src/config");

var dockMenu = require("./src/dockMenu");

var _require = require("electron"),
  app = _require.app,
  BrowserWindow = _require.BrowserWindow,
  Menu = _require.Menu; // Mantiene un riferimento globale all'oggetto window, se non lo fai, la finestra sarà
// chiusa automaticamente quando l'oggetto JavaScript sarà garbage collected.

var win;

function onClosed() {
  win = null;
}

function createWindow() {
  // Creazione della finestra dell'app.
  var url = config.get("url");
  var windowState = config.get("windowState");
  var win = new electron.BrowserWindow({
    icon: path.join(__dirname, "assets/icon.png"),
    height: windowState.height,
    title: app.getName(),
    titleBarStyle: "standard",
    width: windowState.width
  });
  win.loadURL(url);
  win.on("close", onClosed);
  win.webContents.on("did-navigate-in-page", function(e, url) {
    config.set("url", url);
  });
  return win;
}
// Questo metodo viene chiamato quando Electron ha finito
// l'inizializzazione ed è pronto a creare le finestre browser.
// Alcune API possono essere utilizzate solo dopo che si verifica questo evento.
app.on("ready", function() {
  win = createWindow();
  var page = win.webContents;
  page.on("dom-ready", function() {
    page.insertCSS(
      fs.readFileSync(path.join(__dirname, "./src/style.css"), "utf8")
    );
    win.show();
  });
}); // Terminiamo l'App quando tutte le finestre vengono chiuse.

app.on("window-all-closed", function() {
  // Su macOS è comune che l'applicazione e la barra menù
  // restano attive finché l'utente non esce espressamente tramite i tasti Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (!win) {
    win = createWindow();
  }
}); // in questo file possiamo includere il codice specifico necessario
// alla nostra app. Si può anche mettere il codice in file separati e richiederlo qui.
