var appConfig = require("application-config")("ZenBoard");
var fs = require("fs");
var path = require("path");

var APP_NAME = "ZenBoard";
var APP_TEAM = "typerror";
var APP_VERSION = require("../package.json").version;

module.exports = {
  APP_COPYRIGHT: "Copyright © 2018" + APP_TEAM,
  APP_ICON: path.join(__dirname, "../assets", "icon"),
  APP_NAME: APP_NAME,
  APP_TEAM: APP_TEAM,
  APP_VERSION: APP_VERSION,

  GITHUB_URL: "https://github.com/typerror/zen-board",
  GITHUB_URL_ISSUES: "https://github.com/typerror/zen-board/issues",
  GITHUB_URL_RAW: "https://raw.githubusercontent.com/typerror/zen-board/master",
  ZENHUB_URL_SUPPORT: "https://help.zenhub.com/support/home",
  ZENHUB_URL_GETTING_STARTED:
    "https://help.zenhub.com/support/solutions/43000042875",

  HOME_PAGE_URL: "https://github.com/typerror/zen-board#readme.md",

  ROOT_PATH: __dirname,
  ASSETS_PATH: path.join(__dirname, "../assets"),
  ICON_PATH: path.join(__dirname, "../assets/icon.icns"),
  STYLE_PATH: path.join(__dirname, "./style/style.css")
};
