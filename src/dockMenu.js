const { Menu } = require("electron");

module.export = new Menu.buildFromTemplate([
  {
    label: "New Window",
    click() {
      console.log("New Window");
    }
  },
  {
    label: "New Window with Settings",
    submenu: [{ label: "Basic" }, { label: "Pro" }]
  },
  { label: "New Command..." }
]);
