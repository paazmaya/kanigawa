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

const { app, BrowserWindow, dialog, nativeImage, screen } = require('electron');

const {
	getMeta,
	getMetas,
  getImages
} = require('./lib/image-processor');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null,
  webContents = null;

// app.commandLine.appendSwitch('enable-some-feature', true);

const openDialog = (win, callback) => {
  const dialogOpts = {
    title: 'Choose directory...',
    defaultPath: os.homedir(),
    filters: [],
    properties: ['openDirectory']
  };

  dialog.showOpenDialog(win, dialogOpts, (filenames) => {
    win.setTitle(filenames[0]);

    console.log(filenames);
    filenames.forEach((filepath) => {
      const images = getImages(filepath);

      getMetas(images, (meta) => {
        // Somehow pass the meta to the window and React application..
        console.log(meta);
        const data = JSON.stringify({
          images: meta
        });
        callback({
          mimeType: 'application/json',
          data: data,
          length: data.length
        });
        //webContents.send('image-meta', meta);
      });
    });
  });
};

const img = nativeImage.createFromPath(path.join(__dirname, 'icon.png'));

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.

const createWindow = () => {

  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    icon: img,
    width: size.width,
    height: size.height,
    center: true
  });

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