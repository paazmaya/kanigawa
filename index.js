/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */

'use strict';

const fs = require('fs'),
  path = require('path');

const isImage = require('is-image');

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const dialog = electron.dialog; // http://electron.atom.io/docs/v0.35.0/api/dialog/
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

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

const getImages = function (directory) {

  console.log(directory);
  var files = fs.readdirSync(directory);

  var images = files.map((file) => {
    return path.join(directory, file);
  }).filter((file) => {
    return isImage(file);
  });

  console.log(images);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();



  let dialogOpts = {
    title: 'Choose directory...', // String
    defaultPath: __dirname, // String
    filters: [], // Array
    properties: ['openDirectory'], //  Array - Contains which features the dialog should use, can contain openFile, openDirectory, multiSelections and createDirectory

  };

  dialog.showOpenDialog(mainWindow, dialogOpts, (filenames) => {
    console.log(filenames);
    filenames.forEach((filepath) => {
      getImages(filepath);
    });
  });


  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
