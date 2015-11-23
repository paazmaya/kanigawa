
'use strict';

import React from 'react';
import { render } from 'react-dom';

import Menubar from 'jsx/menubar.jsx';
import Info from 'jsx/info.jsx';
import ImageGrid from 'jsx/imagegrid.jsx';
import Divider from 'jsx/divider.jsx';
import LeafMap from 'jsx/map.jsx';

import 'css/index.css';

render((
	<div className="main full-screen">
		<Menubar />
		<Info />
		<div className="content full-screen">
			<ImageGrid />
			<Divider />
			<LeafMap />
		</div>
	</div>
), document.querySelector('.app-container'));
