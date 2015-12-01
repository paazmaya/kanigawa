/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */

import React, { Component, PropTypes } from 'react';

import ImageGridList from './image-grid-list.jsx';

import 'css/imagegrid.css';

class ImageGrid extends Component {

  render () {

    let items = [
      {
        id: 1,
        alt: 'one.jpg'
      },
      {
        id: 2,
        alt: 'two.jpg'
      },
      {
        id: 3,
        alt: 'tre.jpg'
      },
      {
        id: 4,
        alt: 'yon.jpg'
      }
    ];

    return (
      <div className="image-grid">
        <ImageGridList items={ items } />
      </div>
    );
  }
}

export default ImageGrid;
