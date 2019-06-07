/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'redux-zero/react';
import './index.css';
import store from './store';
import App from './App';
import * as serviceWorker from './serviceWorker';

const AppStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<AppStore />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const socket = new WebSocket("ws://localhost:1040");
socket.onmessage = function(event) {
  console.log(event.data);
};
socket.onopen = function() {
  socket.send('Hello server!');
};