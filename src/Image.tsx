/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React from 'react';
import './Image.css';

export interface ImageProps {
  url: string,
  key: string,
  color?: string
}

const Image: React.SFC<ImageProps> = (props) => {
  return (
    <figure className="image-grid-item" style={{backgroundColor: props.color}}>
      <img className="image-grid-image"
        src={ props.url }
        alt={ props.url }
      />
    </figure>
  );
};

Image.defaultProps = {
  color: 'rebeccapurple'
};

export default Image;
