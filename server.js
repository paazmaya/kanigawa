/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

'use strict';


const fs = require('fs'),
  path = require('path'),
  os = require('os');

const electron = require('electron');
const { app, BrowserWindow, dialog, ipcMain, Menu, nativeImage, protocol } = require('electron');
const Store = require('electron-store');
const WebSocket = require('ws');

const {
	getMetas,
  getImages
} = require('./lib/image-processor');

console.log('userData path:', app.getPath('userData'));

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Save some of the handy values in application storage as a JSON file
const initStore = () => {

  return new Store({
    schema: {
      windowBounds: {
        type: 'object',
        properties: {
          width: {
            type: 'number',
            default: 800
          },
          height: {
            type: 'number',
            default: 600
          }
        }
      }
    },
    defaults: {
      windowBounds: {
        width: 800,
        height: 600
      }
    }
  });
};
const storage = initStore();

const iconImage = nativeImage.createFromPath(path.join(__dirname, 'icon.png'));

// WS is used to communicate metadata changes
const wss = new WebSocket.Server({
  port: 1040
});
wss.on('connection', (w) => {
  w.on( 'message' , (data) => {
    console.log(data);
  })
  w.on('close', () => {
    console.log("Closed");
  })
  w.send("Hello interface!");
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null,
  webContents = null;

// app.commandLine.appendSwitch('enable-some-feature', true);

const openDialog = (win) => {
  const dialogOpts = {
    title: 'Choose directory...',
    defaultPath: os.homedir(),
    filters: [],
    properties: ['openDirectory']
  };

  dialog.showOpenDialog(win, dialogOpts, (filenames) => {
    win.setTitle(filenames[0]);

    console.log('showOpenDialog', filenames);
    filenames.forEach((filepath) => {
      const images = getImages(filepath);

      getMetas(images).then((metas) => {
        metas.forEach((meta) => {
          // Somehow pass the meta to the window and React application..
          console.log(meta);
          win.webContents.send('image-meta', meta);
        });
      });
    });
  });
};

const createMenu = (win) => {

  const template = [
    // { role: 'appMenu' }
    ...(process.platform === 'darwin' ? [{
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        {
          label: 'Open configuration file',
          click () {
            storage.openInEditor();
          }
        },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [
        {
          label: 'Open directory',
          click () {
            openDialog(win);
          }
        },
        process.platform === 'darwin' ? { role: 'close' } : { role: 'quit' }
      ]
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () {
            electron.shell.openExternalSync('https://github.com/paazmaya/kanigawa');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.

const createWindow = () => {
  const { width, height } = storage.get('windowBounds');

  // Create the browser window with earlier window size
  mainWindow = new BrowserWindow({
    icon: iconImage,
    width: width,
    height: height,
    center: true
  });

  const ses = mainWindow.webContents.session;
  console.log('ses.getUserAgent()', ses.getUserAgent());

  createMenu(mainWindow);

  // and load the index.html of the app.
  //mainWindow.loadURL(`file://${__dirname}/build/index.html`);
  mainWindow.loadFile(`build/index.html`);

  webContents = mainWindow.webContents;

  // Open the DevTools.
  webContents.openDevTools();

  ipcMain.on('hoplaa', (event, arg) => {
    console.log(arg)
    event.returnValue = 'pong'
  })

  webContents.on('did-finish-load', function () {
    webContents.send('ping', 'whoooooooh!');
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // The BrowserWindow class extends the node.js core EventEmitter class, so we use that API
  // to listen to events on the BrowserWindow. The resize event is emitted when the window size changes.
  mainWindow.on('resize', () => {
    // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
    // the height, width, and x and y coordinates.
    const { width, height } = mainWindow.getBounds();
    // Now that we have them, save them using the `set` method.
    storage.set('windowBounds', { width, height });
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});