/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */

'use strict';

const fs = require('fs'),
  path = require('path');

const isImage = require('is-image'),
  exiv2 = require('exiv2');

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const dialog = electron.dialog; // http://electron.atom.io/docs/v0.35.0/api/dialog/
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const nativeImage = electron.nativeImage;


// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

// app.commandLine.appendSwitch('enable-some-feature', true);


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  //if (process.platform !== 'darwin') {
    app.quit();
  //}
});


const getImages = (directory) => {

  console.log(directory);
  const files = fs.readdirSync(directory);

  let images = files.map((file) => {
    return path.join(directory, file);
  }).filter((file) => {
    return isImage(file);
  });

  return images;
};

const getMeta = (filepath, callback) => {
  const stat = fs.statSync(filepath);
  exiv2.getImageTags(filepath, (error, tags) => {
    if (error) {
      console.error('Exif failed for ' + filepath);
      console.error(error);
    }
    callback({
      exif: tags,
      name: path.basename(filepath),
      size: stat.size,
      birthtime: stat.birthtime,
      modified: stat.mtime,
      path: filepath
    });
  });
};

const getMetas = (filelist, callback) => {
  filelist.forEach((filepath) => {
    getMeta(filepath, callback);
  });
};

const openDialog = (win) => {
  const dialogOpts = {
    title: 'Choose directory...', // String
    defaultPath: __dirname, // String
    filters: [], // Array
    properties: ['openDirectory']
  };

  dialog.showOpenDialog(win, dialogOpts, (filenames) => {
    win.setTitle(filenames[0]);

    console.log(filenames);
    filenames.forEach((filepath) => {
      const images = getImages(filepath);

      getMetas(images, (meta) => {
        // win.
      });
    });
  });
};


const img = nativeImage.createFromPath(path.join(__dirname, 'icon.png'));

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.

app.on('ready', () => {
  const electronScreen = electron.screen,
    size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    icon: img,
    width: size.width,
    height: size.height,
    center: true
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${ __dirname }/index.html`);


  const webContents = mainWindow.webContents;

  // Open the DevTools.
  webContents.openDevTools();


  webContents.executeJavaScript('console.log("hello there");');

  // openDialog(mainWindow);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
