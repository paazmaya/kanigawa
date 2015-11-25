/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */

import React from 'react';
import { Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'css/map.css';

const MapMarker = ({ map, position }) => {
  return (
    <Marker map={ map }
      position={ position }>
      <Popup>
        <span>{ position.join(', ') }</span>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
