const {app, BrowserWindow} = require("electron");
const path = require("path");
const url = require("url");
const {fork} = require('child_process')

const ps = fork(`${__dirname}/server.ts`)

let win;
require('electron-reload')(__dirname);
var hotspot = require('node-hotspot');

var opts = {
  ssid: 'hotspot name',
  password: '66ahhhs641jk',
  force: true, // (optional)  if hosting a network already turn it off and run ours.
  adaptor: 'Ethernet' // (optional / false) name of adaptor to have ICS (Internet Connection Sharing) share internet from, passing false disables ICS all together - if non givin node-hotspot will attempt to find currently connected adaptor automatically
};


function createWindow() {
  win = new BrowserWindow({width: 1366, height: 768});

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

  hotspot.enable(opts)
    .then(function() {
      console.log('Hotspot Enabled')
    })
    .catch(function(e) {
      console.log('Something went wrong; Perms?', e)
    });

  hotspot.disable(opts)
    .then(function() {
      console.log('Hotspot disabled')
    })
    .catch(function(e) {
      console.log('Something went wrong; Perms?', e)
    });

  hotspot.stats(opts)
    .then(function(status) {
      console.log('Hotspot status: ' + status) //status contains clients object and state
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
