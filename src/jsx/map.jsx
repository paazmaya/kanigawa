/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */


import React, { Component, PropTypes } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import { DropTarget } from 'react-dnd';

import 'leaflet/dist/leaflet.css';
import 'css/map.css';

const MyMarker = ({ map, position }) => (
  <Marker map={ map } position={ position }>
    <Popup>
      <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
    </Popup>
  </Marker>
);

const spec = {
  canDrop (props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem();
    console.log(item.fromPosition, props.position);
    return true;
  },

  drop (props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return false;
    }

    // Obtain the dragged item
    const item = monitor.getItem();

    // You can do something with it
    // ChessActions.movePiece(item.fromPosition, props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};


/**
 * Specifies which props to inject into your component.
 */
function collect (connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class LeafMap extends Component {
  render () {
    return (
      <section className="map">
        <Map center={ this.props.position }
          zoom={ this.props.zoomLevel }
          className="imagemap full-screen">
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
          <MyMarker position={ this.props.position } />
        </Map>
      </section>
    );
  }
}

LeafMap.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoomLevel: PropTypes.number.isRequired
};


//export default LeafMap;

export default DropTarget('ImageGridItem', spec, collect)(LeafMap);
