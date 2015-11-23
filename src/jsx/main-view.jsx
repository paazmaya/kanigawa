
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import ImageGrid from 'jsx/imagegrid.jsx';
import Divider from 'jsx/divider.jsx';
import LeafMap from 'jsx/map.jsx';


class MainView extends Component {

  render () {
    return (
			<div className="main-view full-screen">
				<ImageGrid />
				<Divider />
				<LeafMap />
			</div>
  	);
  }
}

export default DragDropContext(HTML5Backend)(MainView);
