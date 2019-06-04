/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React, {
  PureComponent
} from 'react';
import {
  Marker, Tooltip
} from 'react-leaflet';
import Leaflet from 'leaflet';

import './Marker.css';

interface MarkerProps {
  position: [number, number],
  counter?: number
}

class MapMarker extends PureComponent<MarkerProps> {

  render () {
    if (!this.props.position) {
      return null;
    }

    return (
      <Marker position={this.props.position} icon={Leaflet.divIcon({
        html: '' + (this.props.counter || 0),
        iconSize: [60, 60]
      })}>
        <Tooltip>
          <h1>{ this.props.position.toString() }</h1>
        </Tooltip>
      </Marker>
    );
  }
}

export default MapMarker;
