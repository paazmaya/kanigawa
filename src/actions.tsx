/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */
//import {State, Store} from './store';

const actions = store => ({
  increment: state => ({ zoomLevel: state.zoomLevel + 1 }),
  decrement: state => ({ zoomLevel: state.zoomLevel - 1 })
});

export default actions;