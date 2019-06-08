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

const logger = (store:Store<State>) => next => action => {
  console.log("current state", store.getState());
  return next(action);
};

const middlewares = applyMiddleware(logger, connect ? connect(initialState) : null);


const store:Store<State> = createStore(initialState, middlewares);

export default store;