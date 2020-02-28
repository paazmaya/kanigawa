/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React from 'react';
import {
  Marker, Tooltip
} from 'react-leaflet';
import Leaflet from 'leaflet';

import './MapMarker.css';

interface MarkerProps {
  position: [number, number],
  counter?: number
}

const MapMarker: React.SFC<MarkerProps> = (props) => {
  return (
    <Marker position={props.position} icon={Leaflet.divIcon({
      html: '' + (props.counter || 0),
      iconSize: [60, 60]
    })}>
      <Tooltip>
        <h1>{ props.position.toString() }</h1>
      </Tooltip>
    </Marker>
  );
};

export default MapMarker;
