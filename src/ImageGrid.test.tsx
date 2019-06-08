/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ImageGrid from './ImageGrid';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ImageGrid />, div);
  ReactDOM.unmountComponentAtNode(div);
});
