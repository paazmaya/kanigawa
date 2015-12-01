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
  /**
   *
   * @param {object} props
   * @returns {object}
   */
  beginDrag (props) {
    console.log(props);
    return {
      id: props.id
    };
  },

  /**
   *
   * @param {object} props
   * @param {DragSourceMonitor} monitor
   * @returns {boolean}
   */
  isDragging (props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.id;
  },

  /**
   *
   * @param {object} props
   * @param {DragSourceMonitor} monitor
   * @param {ImageGridItem} component
   * @returns {void}
   */
  endDrag (props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log('endDrag', item.id, dropResult);
  }

};

/**
 * Specifies the props to inject into your component.
 *
 * @param {DragSourceConnector} connect
 * @param {DragSourceMonitor} monitor
 * @returns {object}
 */
function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class ImageGridItem extends Component {
  render () {
    return this.props.connectDragSource(
      <figure className={ 'image-grid-item' + (this.props.isDragging ? ' image-grid-item-dragging' : '') }>
        <img className="image-grid-image"
          src={ this.props.src }
          style={ { backgroundColor: '#' + parseInt(Math.random() * 255, 16) } }
          alt={ this.props.alt }/>
      </figure>
    );
  }
}

ImageGridItem.propTypes = {
  id: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired
};

const srcOptions = {
  dropEffect: 'copy'
};

export default DragSource('ImageGridItem', imageSource, collect, srcOptions)(ImageGridItem);
