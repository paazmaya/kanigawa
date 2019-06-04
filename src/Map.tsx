/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React, {Component, SyntheticEvent} from 'react';

import {
  Map as LMap, TileLayer
} from 'react-leaflet';

import Marker from './Marker';
import 'leaflet/dist/leaflet.css';
import './Map.css';

interface MapProps {
  center: [number, number]
  zoomLevel: number
}

class Map extends Component<MapProps> {

  onDragOver (event:SyntheticEvent) {
    console.log(event);
  }

  render () {
    const hereUrlBase:String = 'http://{s}.{base}.maps.api.here.com/maptile/2.1/maptile/newest/';
    const hereUrlEnd:String = '/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}&lg={language}';

    /*
    var HERE_normalDayGrey = L.tileLayer(hereUrlBase + 'normal.day.grey' + hereUrlEnd, baseOptions);
    var HERE_hybridDay = L.tileLayer(hereUrlBase + 'hybrid.day' + hereUrlEnd, aerialOptions);
    var HERE_terrainDayMobile = L.tileLayer(hereUrlBase + 'terrain.day.mobile' + hereUrlEnd, aerialOptions);

    var hereLayers = {
      'Normal': HERE_normalDayGrey,
      'Hybrid': HERE_hybridDay,
      'Terrain': HERE_terrainDayMobile
    };
    L.control.layers(hereLayers).addTo(map);
    */

    const hereOpts = {
      attribution: 'Map &copy; 1987-2015 <a href="http://developer.here.com">HERE</a>',
      subdomains: '1234',
      app_id: '',
      app_code: '',
      language: 'en-GB',
      base: 'aerial',
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

          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
          <TileLayer {...hereOpts}
            base="base"
            url={ hereUrlBase + 'normal.day.grey' + hereUrlEnd }/>
          <TileLayer {...hereOpts}
            url={ hereUrlBase + 'hybrid.day' + hereUrlEnd }/>
          <TileLayer {...hereOpts}
            url={ hereUrlBase + 'terrain.day.mobile' + hereUrlEnd }/>

          <Marker ref="previewMarker" position={ this.props.center } />
        </LMap>
      </div>
    );
  }
}

export default Map;
