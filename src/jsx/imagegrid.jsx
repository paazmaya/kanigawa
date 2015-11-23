/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */

'use strict';

import React from 'react';

import ImageGridItem from './image-grid-item.jsx';

import 'css/imagegrid.css';



const ImageGridItems = React.createClass({
  propTypes: {
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        src: React.PropTypes.string
      })
    )
  },

  render () {
    if (!this.props.items) {
      return  null;
    }

    return (
      <div className="image-grid-items">
        { this.props.items.map((item) => {
          return <ImageGridItem key={ item.src } src={ item.src } />;
        }) }
      </div>
    );
  }
});

const ImageGrid = React.createClass({

  render () {

    let items = [
      {
        src: 'one.jpg'
      },
      {
        src: 'two.jpg'
      },
      {
        src: 'tre.jpg'
      },
      {
        src: 'yon.jpg'
      }
    ];

    return (
    	<div className="image-grid">
        <ImageGridItems items={ items } />
    	</div>
  	);
  }
});

export default ImageGrid;
