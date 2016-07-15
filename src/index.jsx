/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React from 'react';
import {render} from 'react-dom';

import Menubar from 'jsx/menubar.jsx';
import Info from 'jsx/info.jsx';
import MainView from 'jsx/main-view.jsx';

import 'css/index.css';

render((
	<div className="index-view full-screen">
		<Menubar />
		<Info />
		<MainView />
	</div>
), document.querySelector('.app-container'));
