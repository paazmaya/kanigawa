/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */

'use strict';

import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const position = [51.505, -0.09],
  zoomLevel = 13;

const MyMarker = ({ map, position }) => (
  <Marker map={ map } position={ position }>
    <Popup>
      <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
    </Popup>
  </Marker>
);

const LeafMap = React.createClass({
  render: () => {
    return (
      <Map center={ position } zoom={ zoomLevel }>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MyMarker position={ position } />
      </Map>
    );
  }
});

export default LeafMap;
