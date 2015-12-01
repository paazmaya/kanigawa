/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */

import React, { Component, PropTypes } from 'react';
import { Map, TileLayer } from 'react-leaflet';

import { DropTarget } from 'react-dnd';

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
    return { moved: true };
  },

  /**
   * Called when an item is hovered over the component
   *
   * @param {object} props
   * @param {DropTargetMonitor} monitor
   * @param {LeafMap|undefined} component
   */
  hover (props, monitor, component) {
    const map = component.refs.leafMap.getLeafletElement(),
      marker = component.refs.previewMarker;

    console.log(monitor.getSourceClientOffset());
    let point = map.containerPointToLatLng([5,8]);
    console.log(point);
    component.setState({previewPosition: point});

  }
};

/**
 * Specifies the props to inject into your component.
 *
 * @param {DropTargetConnector} connect
 * @param {DropTargetMonitor} monitor
 */
function collect (connect, monitor) {

  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: false }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class LeafMap extends Component {

  constructor(props) {
    super(props);

    // getInitialState equivalent
    this.state = {previewPosition: null};
  }

  render () {
    return this.props.connectDropTarget(
      <section className="map-section">
        <Map center={ this.props.position }
          ref="leafMap"
          zoom={ this.props.zoomLevel }
          className="imagemap full-screen">
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
          <MapMarker position={ this.props.position } />
          <MapMarker ref="previewMarker" position={ this.state.previewPosition } />
        </Map>
      </section>
    );
  }
}

LeafMap.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoomLevel: PropTypes.number.isRequired
};

export default DropTarget('ImageGridItem', targetSpecification, collect)(LeafMap);
