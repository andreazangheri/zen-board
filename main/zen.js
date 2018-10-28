const Config = require("electron-config");

module.exports = new Config({
  defaults: {
    zoomFactor: 1,
    windowState: {
      width: 1080,
      height: 720
    },
    url: "https://app.zenhub.com"
  }
});
