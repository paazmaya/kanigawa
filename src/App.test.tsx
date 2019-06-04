/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App center={[22,22]} zoomLevel={5} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
