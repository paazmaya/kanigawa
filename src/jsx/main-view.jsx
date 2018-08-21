/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React, {
  Component
} from 'react';

import HTML5Backend from 'react-dnd-html5-backend';
import {
  DragDropContext
} from 'react-dnd';

import ImageGrid from 'jsx/imagegrid.jsx';
import Divider from 'jsx/divider.jsx';
import LeafMap from 'jsx/map.jsx';

class MainView extends Component {
  render () {
    return (
      <div className="main-view full-screen">
        <ImageGrid />
        <Divider />
        <LeafMap position={ [60.18664, 24.92566] } zoomLevel={ 13 } />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(MainView);
