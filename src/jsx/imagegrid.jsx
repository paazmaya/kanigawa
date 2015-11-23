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
    	<figure className="image-grid-item">
  			<img src={ this.props.src } alt={ alt }/>
    	</figure>
  	);
  }
});

const ImageGrid = React.createClass({
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
    	<div className="image-grid">
    		{ this.props.items.map((item) => {
    	    return <ImageGridItem key={ item.src } src={ item.src } />;
        }) }
    	</div>
  	);
  }
});

export default ImageGrid;
