/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import createStore from 'redux-zero';
import { applyMiddleware } from 'redux-zero/middleware';
import { connect } from "redux-zero/devtools";
import ZeroStore from 'redux-zero/interfaces/Store';
import {Viewport} from './Map';

export interface Store<T extends object> extends ZeroStore<T> {

}

export interface State {
  viewport: Viewport
}

const initialState:State = {
  viewport: {
    center: [60.2, 24.91],
    zoom: 8
  }
};

const socket = new WebSocket('ws://localhost:1040');
socket.onmessage = function(event) {
  console.log(event.data);
};
socket.onopen = function() {
  socket.send('Hello server!');
};
const socketer = (store:Store<State>) => (next: Function) => (action: Function) => {
  next(action);
  socket.send(JSON.stringify(store.getState(), null, ' '));
};

const middlewares = applyMiddleware(socketer, connect ? connect(initialState) : undefined);


const store:Store<State> = createStore(initialState, middlewares);

export default store;