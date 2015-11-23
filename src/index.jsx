
'use strict';

import React from 'react';
import { render } from 'react-dom';

import Menubar from 'jsx/menubar.jsx';
import ImageGrid from 'jsx/imagegrid.jsx';
import Divider from 'jsx/divider.jsx';
import LeafMap from 'jsx/map.jsx';

import 'css/index.css';

render((
	<div>
		<Menubar />
		<div>
			<LeafMap />
			<Divider />
			<ImageGrid />
		</div>
	</div>
), document.querySelector('.app-container'));
