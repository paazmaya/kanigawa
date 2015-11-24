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
          return <ImageGridItem key={ item.src } src={ item.src } />;
        }) }
      </div>
    );
  }
}

ImageGridList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string
    })
  )
};

export default ImageGridList;
