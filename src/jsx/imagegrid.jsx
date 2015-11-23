/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */

'use strict';

import React from 'react';

import 'css/imagegrid.css';



const ImageGridItem = React.createClass({
  propTypes: {
  	src: React.PropTypes.string
  },

  generateAlt () {
  	return this.props.src.replace(/\.\w+$/, '').replace(/\-/g, ' ');
  },

  render () {
  	let alt = this.generateAlt();

    return (
    	<figure className="image-grid-item" style={ { backgroundColor: '#' + parseInt(Math.random() * 255, 16) } }>
  			<img src={ this.props.src } alt={ alt }/>
    	</figure>
  	);
  }
});

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
