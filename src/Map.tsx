/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React, {Component, SyntheticEvent} from 'react';

import {
  Map as LMap, TileLayer, LayersControl
} from 'react-leaflet';

import Marker from './Marker';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/layers-control.js
const { BaseLayer } = LayersControl;

interface MapProps {
  center: [number, number]
  zoomLevel: number
}

class Map extends Component<MapProps> {

  onDragOver (event:SyntheticEvent) {
    console.log(event);
  }

  render () {
    // https://developer.here.com/documentation/map-tile/topics/request-constructing.html#request-constructing__table-basic-request-elements
    const hereUrlBase:String = 'https://{s}.{base}.maps.api.here.com/maptile/2.1/{type}/newest/';
    const hereUrlEnd:String = '/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}&lg={language}';

    const hereOpts = {
      attribution: 'Map &copy; 1987-2015 <a href="http://developer.here.com">HERE</a>',
      subdomains: '1234',
      app_id: '',
      app_code: '',
      language: 'eng',
      base: 'aerial',
      type: 'maptile',
      minZoom: 0,
      maxZoom: 20
    };
    const body = document.querySelector('body');
    if (body) {
      const hData:DOMStringMap = body.dataset;
      hereOpts.app_id = hData.hereId as string;
      hereOpts.app_code = hData.hereCode as string;
    }

    return (
      <div className="map-section" ref="mapthing">
        <LMap center={ this.props.center }
          ref="leafMap"
          zoom={ this.props.zoomLevel }
          className="imagemap">
          <LayersControl position="topright">
            <BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
            </BaseLayer>
            <BaseLayer name="HERE grey">
              <TileLayer {...hereOpts}
                base="base"
                url={ hereUrlBase + 'normal.day.grey' + hereUrlEnd }/>
            </BaseLayer>
            <BaseLayer name="HERE hybrid">
              <TileLayer {...hereOpts}
                url={ hereUrlBase + 'hybrid.day' + hereUrlEnd }/>
            </BaseLayer>
            <BaseLayer name="HERE terrain">
              <TileLayer {...hereOpts}
                url={ hereUrlBase + 'terrain.day' + hereUrlEnd }/>
            </BaseLayer>
          </LayersControl>
          <Marker ref="previewMarker" position={ this.props.center } />
        </LMap>
      </div>
    );
  }
}

export default Map;
