
'use strict';

import React from 'react';
import { render } from 'react-dom';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Menubar from 'jsx/menubar.jsx';
import Info from 'jsx/info.jsx';
import MainView from 'jsx/main-view.jsx';

import 'css/index.css';

var remote = require('electron').remote;

render((
	<div className="index-view full-screen">
		<Menubar />
		<Info />
		<MainView />
	</div>
), document.querySelector('.app-container'));
