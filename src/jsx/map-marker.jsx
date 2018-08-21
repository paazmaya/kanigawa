/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React, {
  Component
} from 'react';
import {
  Marker, Popup
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'css/map.css';

class MapMarker extends Component {

  render () {
    if (!this.props.position) {
      return null;
    }

    return (
      <Marker { ...this.props }>
        <Popup>
          <span>{ this.props.position.toString() }</span>
        </Popup>
      </Marker>
    );
  }
}

export default MapMarker;
