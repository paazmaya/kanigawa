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

const isImage = require('is-image'),
  exiv2 = require('exiv2');

const electron = require('electron');
const app = electron.app; // Module to control application life.
const dialog = electron.dialog; // http://electron.atom.io/docs/v0.35.0/api/dialog/
const BrowserWindow = electron.BrowserWindow; // Module to create native browser window.
const nativeImage = electron.nativeImage;


// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null,
  webContents = null;

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

  const images = files.map((file) => {
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
      birthtime: stat.birthtime.toISOString(),
      modified: stat.mtime.toISOString(),
      path: filepath
    });
  });
};

const getMetas = (filelist, callback) => {
  filelist.forEach((filepath) => {
    getMeta(filepath, callback);
  });
};

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

let protocol = null;
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

  protocol = electron.protocol;

  protocol.interceptHttpProtocol('http', (request, callback) => {

    // In case the URL is to a domain "kanigawa", then handle it.
    // Otherwise just pass through.


    if (request.url.indexOf('http://kanigawa/') !== -1) {
      // Do your magic
      console.log('You want kanigawa specific contents');
      if (request.url === 'http://kanigawa/choose-directory') {
        openDialog(mainWindow, callback);
      }
    }
    else {
      console.log(request);
      request.session = null;

      return callback(request);
    }
  }, (error) => {
    if (error) {
      console.error('Failed to register intercepting HTTP protocol');
      console.error(error);
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${ __dirname }/index.html`);


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
});
