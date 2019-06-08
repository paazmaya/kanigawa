/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */
import {State, Store} from './store';

const actions = (store:Store<State>) => ({
  updateViewport: (state:State) => ({ viewport: state.viewport })
});

export default actions;
