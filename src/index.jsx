
'use strict';

import React from 'react';
import { render } from 'react-dom';
import LeafMap from 'jsx/map.jsx';
import ImageGrid from 'jsx/imagegrid.jsx';

import 'css/index.css';

render(<div><LeafMap /><ImageGrid /></div>, document.querySelector('.app-container'));
