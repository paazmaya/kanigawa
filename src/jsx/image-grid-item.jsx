/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React, {
  Component, PropTypes
} from 'react';

class ImageGridItem extends Component {
  render () {
    return (
      <figure className="image-grid-item"
        data-id={ this.props.id }
        onClick={ this.props.onClick }
      >
        <img className="image-grid-image"
          src={ this.props.src }
          alt={ this.props.alt }
        />
      </figure>
    );
  }
}

ImageGridItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default ImageGridItem;
