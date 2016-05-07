/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 */

import React, {Component} from 'react';

class Info extends Component {
  render () {
    return (
      <section className="info">
        We are using node { process.versions.node },
        Chrome { process.versions.chrome },
        and Electron { process.versions.electron }.
      </section>
    );
  }
}

export default Info;
