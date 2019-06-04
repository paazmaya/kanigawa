/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React, {PureComponent} from 'react';
import Image, {ImageProps} from './Image';
import './ImageGrid.css';

export interface ImageGridProps {
  images: ImageProps[]
}

class ImageGrid extends PureComponent<ImageGridProps> {

  render () {
    return (
      <div className="image-grid">{
        this.props.images.map(item => (
          <Image url={item.url} color={item.color} key={item.key} />
        ))
      }</div>
    );
  }
}

export default ImageGrid;
