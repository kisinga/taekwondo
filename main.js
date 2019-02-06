const {app, BrowserWindow} = require("electron");
const path = require("path");
const url = require("url");
const {fork} = require('child_process')

//Mongodb spawn process
const spawn = require("child_process").spawn;
const pipe = spawn("mongod", [" — dbpath=YourDBPath", " — port", '27018']);
pipe.stdout.on('data', function (data) {
  console.log(data.toString('utf8'));
});
pipe.stderr.on('data', (data) => {
  console.log(data.toString('utf8'));
});
pipe.on('close', (code) => {
  console.log('Process exited with code: ' + code);
});
const ps = fork(`${__dirname}/server.js`)
let win;
require('electron-reload')(__dirname);

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600});

  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // app.server = createServer(app)
  // The following is optional and will open the DevTools:
  // win.webContents.openDevTools()

  win.on("closed", () => {
    win = null;
    console.log('application quit')
    pipe.kill('SIGINT');
  });
}

app.on("ready", createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// initialize the app's main window
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
