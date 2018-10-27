"use strict";

var electron = require("electron");

var fs = require("fs");

var path = require("path");

var config = require("./src/config"); //TODO dockMenu require
//TODO mainMenu require

var _require = require("electron"),
  app = _require.app,
  BrowserWindow = _require.BrowserWindow,
  Menu = _require.Menu,
  shell = _require.shell; // Mantiene un riferimento globale all'oggetto window, se non lo fai, la finestra sarà
// chiusa automaticamente quando l'oggetto JavaScript sarà garbage collected.

var dockMenu;
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
  setMainMenu(); //TODO: dockMenu module import —> export

  dockMenu = Menu.buildFromTemplate([
    {
      label: "New Window",

      click() {
        createWindow();
      }
    }
  ]); // Comandi dock

  app.dock.setMenu(dockMenu);
  return win;
}

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
//TODO: mainMenu module import —> export

function setMainMenu() {
  const topMenu = [
    {
      label: "ZenBoard",
      submenu: [
        {
          role: "about"
        },
        {
          label: "View License",

          click() {
            shell.openExternal(
              "https://raw.githubusercontent.com/typerror/zen-board/master/LICENSE"
            );
          }
        },
        {
          label: "Version 0.0.1",
          enabled: false
        },
        {
          //TODO: autoUpdater module
          label: "Check for Updates...",

          click() {}
        },
        {
          type: "separator"
        },
        {
          role: "services",
          submenu: []
        },
        {
          type: "separator"
        },
        {
          role: "hide"
        },
        {
          role: "hideothers"
        },
        {
          role: "unhide"
        },
        {
          type: "separator"
        },
        {
          role: "quit"
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        {
          role: "undo"
        },
        {
          role: "redo"
        },
        {
          type: "separator"
        },
        {
          role: "cut"
        },
        {
          role: "copy"
        },
        {
          role: "paste"
        },
        {
          role: "pasteandmatchstyle"
        },
        {
          role: "delete"
        },
        {
          role: "selectall"
        }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          role: "reload"
        },
        {
          role: "forcereload"
        },
        {
          role: "toggledevtools"
        },
        {
          type: "separator"
        },
        {
          role: "resetzoom"
        },
        {
          role: "zoomin"
        },
        {
          role: "zoomout"
        },
        {
          type: "separator"
        },
        {
          role: "togglefullscreen"
        }
      ]
    },
    {
      role: "window",
      submenu: [
        {
          label: "New Window",
          accelerator: "Cmd+N",

          click() {
            createWindow();
          }
        },
        {
          role: "minimize"
        },
        {
          role: "close"
        }
      ]
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",

          click() {
            shell.openExternal(
              "https://github.com/typerror/zen-board#readme.md"
            );
          }
        },
        {
          label: "Documentation",

          click() {
            shell.openExternal(
              "https://github.com/typerror/zen-board#readme.md"
            );
          }
        },
        {
          label: "Search Issues",

          click() {
            shell.openExternal("https://github.com/typerror/zen-board/issues");
          }
        }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(topMenu));
}
