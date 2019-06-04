/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React, {
  PureComponent
} from 'react';
import './Image.css';

export interface ImageProps {
  url: string
}

class Image extends PureComponent<ImageProps> {
  render () {
    return (
      <figure className="image-grid-item">
        <img className="image-grid-image"
          src={ this.props.url }
          alt={ this.props.url }
        />
      </figure>
    );
  }
}


export default Image;
