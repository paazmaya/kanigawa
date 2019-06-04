/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import createStore from "redux-zero";
import ZeroStore from 'redux-zero/interfaces/Store';

export interface Store<T extends object> extends ZeroStore<T> {

}

export interface State {
  center: [number, number],
  zoomLevel: number
}

const initialState:State = {
  center: [60.2, 24.91],
  zoomLevel: 8
};

const store:Store<State> = createStore(initialState);

export default store;