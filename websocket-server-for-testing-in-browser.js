/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

/**
 * Run this in order to be able to test the connection while `npm start` is running.
 *  node websocket-server-for-testing-in-browser.js
 */

const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 1040
});

wss.on('connection', (w) => {
  w.on('message', (data) => {
    console.log(data);
  });
  w.on('close', () => {
    console.log("Closed");
  });
  w.send("Hello interface!");
});
