/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React, {
  Component
} from 'react';

import 'css/menubar.css';

class Menubar extends Component {
  onChooseDirClick (event) {
    event.preventDefault();

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    fetch(event.target.href, {
      headers: headers,
      mode: 'no-cors'
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error(error);
    });
  }

  render () {
    return (
      <div className="menubar">
        <a href="http://kanigawa/choose-directory"
          onClick={ this.onChooseDirClick }
        >Choose a directory</a>
      </div>
    );
  }
}

export default Menubar;
