module.exports = {
  downloadFinished,
  init,
  setBadge
};

var electron = require("electron");

var app = electron.app;

var win = require("./index");

/**
 * Add a right-click menu to the dock icon. (OS X)
 */
function init() {
  if (!app.dock) return;
  var menu = electron.Menu.buildFromTemplate(getMenuTemplate());
  app.dock.setMenu(menu);
}

function getMenuTemplate() {
  return [
    {
      label: "New Window",
      accelerator: "Cmd+Shift+N",
      click: () => win.createWindow()
    }
  ];
}
