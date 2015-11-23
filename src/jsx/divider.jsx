/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */

'use strict';

import React from 'react';

import 'css/divider.css';


const Divider = React.createClass({

	onDrag (event) {},

  render () {
    return (
    	<div className="divider" />
  	);
  }
});

export default Divider;
