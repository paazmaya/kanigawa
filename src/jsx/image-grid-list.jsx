/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */

import React, { Component, PropTypes } from 'react';

import ImageGridItem from './image-grid-item.jsx';

import 'css/imagegrid.css';

class ImageGridList extends Component {

  render () {
    if (!this.props.items) {
      return null;
    }

    return (
      <div className="image-grid-list">
        { this.props.items.map((item) => {
          return (
            <ImageGridItem key={ item.id }
              id={ item.id }
              alt={ item.alt } />
          );
        }) }
      </div>
    );
  }
}

ImageGridList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      alt: PropTypes.string
    })
  )
};

export default ImageGridList;
