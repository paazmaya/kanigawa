/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */

import React, {Component, PropTypes} from 'react';

import ImageGridList from './image-grid-list.jsx';

import 'css/imagegrid.css';


class ImageGrid extends Component {

  constructor (props) {
    super(props);

    // getInitialState equivalent
    this.state = {
      selectedItems: []
    };
  }

  _handleEscKey (event) {
    console.log(event);
  }

  componentWillMount () {
    document.addEventListener('keyPress', this._handleEscKey, false);
  }

  componentWillUnmount () {
    document.removeEventListener('keyPress', this._handleEscKey, false);
  }

  onItemClicked (event) {
    console.log(event);
    // toggle the current in selection
    this.updateSelectedItems(event.currentTarget.dataset.id);


    // Check if alt or ctrl is being pressed
  }

  updateSelectedItems (id) {
    let items = this.state.selectedItems,
      index = items.indexOf(id);

    if (index !== -1) {
      items.splice(index, 1);
    }
    else {
      items.push(id);
    }

    console.log(items);
    this.setState({
      selectedItems: items
    });
  }

  render () {

    let items = [
      {
        id: 1,
        src: 'one.jpg',
        alt: 'one.jpg'
      },
      {
        id: 2,
        src: 'two.jpg',
        alt: 'two.jpg'
      },
      {
        id: 3,
        src: 'tre.jpg',
        alt: 'tre.jpg'
      },
      {
        id: 4,
        src: 'yon.jpg',
        alt: 'yon.jpg'
      }
    ];

    return (
      <div className="image-grid">
        <ImageGridList
          items={ items }
          selectedItems={ this.state.selectedItems }
          onItemClicked={ this.onItemClicked }
        />
      </div>
    );
  }
}

export default ImageGrid;
