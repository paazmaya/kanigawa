/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */

import React, {Component, PropTypes} from 'react';
import {Map, TileLayer} from 'react-leaflet';

import {DropTarget} from 'react-dnd';

import MapMarker from './map-marker.jsx';

import 'leaflet/dist/leaflet.css';
import 'css/map.css';

const targetSpecification = {

  /**
   * Use it to specify whether the drop target is able to accept the item.
   * If you want to always allow it, just omit this method
   *
   * @param {object} props
   * @param {DropTargetMonitor} monitor
   * @returns {void}
   */
  canDrop (props, monitor) {

    // You can disallow drop based on props or item
    const item = monitor.getItem();

    console.log('canDrop', item.fromPosition, props.position);

    return true;
  },

  /**
   * Called when a compatible item is dropped on the target
   *
   * @param {object} props
   * @param {DragTargetConnector} connect
   * @param {DropTargetMonitor} monitor
   * @returns {void}
   */
  drop (props, monitor, component) {

    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return false;
    }

    // Obtain the dragged item
    const item = monitor.getItem();

    console.log('drop', item.fromPosition, props.position);

    // You can do something with it
    // ChessActions.movePiece(item.fromPosition, props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return {moved: true};
  },

  /**
   * Called when an item is hovered over the component
   *
   * @param {object} props Properties of LeafMap
   * @param {DropTargetMonitor} monitor
   * @param {LeafMap|undefined} component
   */
  hover (props, monitor, component) {
    const map = component.refs.leafMap.getLeafletElement(),
      offset = monitor.getClientOffset(),
      rect = component.refs.mapthing.getBoundingClientRect();

    const pos = [
      offset.x - rect.left,
      offset.y - rect.top
    ];

    const point = map.containerPointToLatLng(pos);
    component.setState({previewPosition: point});
  }
};

/**
 * Specifies the props to inject into your component.
 *
 * @param {DropTargetConnector} connect
 * @param {DropTargetMonitor} monitor
 * @see https://gaearon.github.io/react-dnd/docs-drop-target-connector.html
 */
function collect (connect, monitor) {

  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({shallow: false}),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class LeafMap extends Component {

  constructor (props) {
    super(props);

    // getInitialState equivalent
    this.state = {
      previewPosition: null
    };
  }

  onDragOver (event) {
    console.log(event);
  }

  render () {
    const hereUrlBase = 'http://{s}.{base}.maps.api.here.com/maptile/2.1/maptile/newest/';
    const hereUrlEnd = '/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}&lg={language}';

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

    const hData = document.querySelector('body').dataset;

    const hereOpts = {
      attribution: 'Map &copy; 1987-2015 <a href="http://developer.here.com">HERE</a>',
      subdomains: '1234',
      app_id: hData.hereId,
      app_code: hData.hereCode,
      language: 'en-GB',
      base: 'aerial',
      minZoom: 0,
      maxZoom: 20
    };

    return this.props.connectDropTarget(
      <section className="map-section">
        <div className="full-screen" ref="mapthing">
          <Map center={ this.props.position }
            ref="leafMap"
            zoom={ this.props.zoomLevel }
            className="imagemap full-screen">

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

            <MapMarker ref="previewMarker" position={ this.state.previewPosition } />
          </Map>
        </div>
      </section>
    );
  }
}

LeafMap.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoomLevel: PropTypes.number.isRequired
};

export default DropTarget('ImageGridItem', targetSpecification, collect)(LeafMap);
