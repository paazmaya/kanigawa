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
const { app, BrowserWindow, dialog, Menu, nativeImage } = require('electron');

const {
	getMetas,
  getImages
} = require('./lib/image-processor');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

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
          //win.webContents.send('image-meta', meta);
        });
      });
    });
  });
};

const img = nativeImage.createFromPath(path.join(__dirname, 'icon.png'));

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.

const createWindow = () => {

  const size = electron.screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    icon: img,
    width: size.width,
    height: size.height,
    center: true
  });


  const template = [
    // { role: 'appMenu' }
    ...(process.platform === 'darwin' ? [{
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
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
            openDialog(mainWindow);
          }
        },
        process.platform === 'darwin' ? { role: 'close' } : { role: 'quit' }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { 
            electron.shell.openExternalSync('https://espoo.kobujutsu.fi');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/build/index.html`);

  webContents = mainWindow.webContents;

  // Open the DevTools.
  webContents.openDevTools();

  webContents.on('did-finish-load', function () {
    webContents.send('ping', {
      some: 'whoooooooh!'
    });
  });

  webContents.executeJavaScript('console.log("hello there");');

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
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