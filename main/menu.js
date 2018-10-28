module.exports = {
  init
};

const { Menu, shell } = require("electron");
const electron = require("electron");
const config = require("./config");
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
          label: "Check for Updates..."
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
          label: "New",
          accelerator: "Cmd+Shit+N",
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
          label: "Documentation",

          click() {
            shell.openExternal("https://help.zenhub.com/support/home");
          }
        },
        {
          label: "Learn More",

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
        },
        {
          type: "separator"
        },
        {
          label: "Getting Started",

          click() {
            shell.openExternal(
              "https://help.zenhub.com/support/solutions/43000042875"
            );
          }
        }
      ]
    }
  ];
  return mainMenu;
}
