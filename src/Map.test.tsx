/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Map, {MapProps} from './Map';

const viewPort:MapProps = {
  center: [22, 22],
  zoom: 5
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Map viewport={viewPort} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
