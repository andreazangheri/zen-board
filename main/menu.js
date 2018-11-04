module.exports = {
  init
};

const { Menu, shell } = require("electron");
const electron = require("electron");
const config = require("./config");
const fs = require("fs");
const path = require("path");
const updater = require("./updater");
const index = require("./index");
const app = electron.app;

let menu;

function init() {
  menu = electron.Menu.buildFromTemplate(setMainMenu());
  electron.Menu.setApplicationMenu(menu);
}

// menu bar menu
function setMainMenu() {
  var mainMenu = [
    {
      label: "ZenBoard",
      submenu: [
        {
          role: "about"
        },
        {
          label: config.APP_VERSION,
          enabled: false
        },
        {
          //TODO updater module
          label: "Check for Updates...",
          click: () => updater.checkForUpdates()
        },
        {
          type: "separator"
        },
        {
          //TODO themes — light & dark
          label: "Themes",
          submenu: [
            {
              label: "Light",
              click: () => {
                index.style.insertCSS(
                  fs.readFileSync(config.STYLE_PATH_LIGHT, "utf8")
                );
              }
            },
            {
              label: "Dark",
              click: () => {
                index.style.insertCSS(
                  fs.readFileSync(config.STYLE_PATH_DARK, "utf8")
                );
              }
            }
          ]
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
      label: "Workspaces",
      submenu: []
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
          label: "New",
          accelerator: "Cmd+Shit+N",
          click: () => createWindow()
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
          label: "Learn more about " + config.APP_NAME,
          click: () => shell.openExternal(config.HOME_PAGE_URL)
        },
        {
          label: "Contribute on GitHub",
          click: () => shell.openExternal(config.GITHUB_URL)
        },
        {
          label: "Report an Issue...",
          click: () => shell.openExternal(config.GITHUB_URL_ISSUES)
        },
        {
          type: "separator"
        },
        {
          label: "Documentation",
          click: () => shell.openExternal(config.ZENHUB_URL_SUPPORT)
        },
        {
          label: "Getting Started",
          click: () => shell.openExternal(config.ZENHUB_URL_GETTING_STARTED)
        }
      ]
    }
  ];
  return mainMenu;
}
