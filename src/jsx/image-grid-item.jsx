/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */

import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';

/**
 * Implements the drag source contract.
 */
const imageSource = {
  beginDrag(props) {
    return {
      src: props.src
    };
  },

  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().src === props.src;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log(item.src, dropResult);
  }

};


/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class ImageGridItem extends Component {
  generateAlt () {
    return this.props.src.replace(/\.\w+$/, '').replace(/\-/g, ' ');
  }

  render () {

    let alt = this.generateAlt();

    return this.props.connectDragSource(
      <figure className="image-grid-item" style={ { opacity: this.props.isDragging ? 0.5 : 1, backgroundColor: '#' + parseInt(Math.random() * 255, 16) } }>
        <img src={ this.props.src } alt={ alt }/>
      </figure>
    );
  }
}


ImageGridItem.propTypes = {
  src: PropTypes.string.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

//export default ImageGridItem;

export default DragSource('ImageGridItem', imageSource, collect)(ImageGridItem);
