const fs = require("fs");
const path = require("path");
const res = process.resourcesPath;

let html_file_path;
if (fs.existsSync(path.join(res, "app/index.html"))) {
  html_file_path = path.join(res, "app/index.html");
} else if (fs.existsSync(path.join(res, "app/dist/index.html"))) {
  html_file_path = path.join(res, "app/dist/index.html");
} else {
  throw new Error(`Couldn't find index.html`);
}

let html = fs.readFileSync(html_file_path, "utf8");

const link_to_inject =
  '  <link href="./main/style/style.css" rel="stylesheet">';
html = html
  .replace(/<link[^>]+(cdn|custom-theme)[^>]+>/, "") // remove existing custom stylesheet if there is one
  .replace("</head>", `\n${link_to_inject}</head>`); // add stylesheet

try {
  fs.writeFileSync(html_file_path, html, "utf8");
} catch (error) {
  if (html_file_path.startsWith("/tmp")) {
    console.error(
      `The theme cannot be applied to the AppImage since 'index.html' is saved in a temporary directory.`
    );
  } else if (error.code == "EACCES") {
    console.error(
      `You need to have write access to '${html_file_path}' for the theme to be applied.`
    );
  }
  throw error;
}

// clear the cache so the stylesheet can update (could alternatively cache-bust with a URL parameter)
const { remote } = require("electron");
const win = remote.getCurrentWindow();
win.webContents.session.clearCache(() => {
  if (confirm("Ready to refresh? :)")) {
    location.reload();
  }
});
