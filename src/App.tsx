/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React from 'react';
import { connect } from 'redux-zero/react';
import Map from './Map';
import ImageGrid from './ImageGrid';
import './App.css';
import actions from './actions';

const mapToProps = ({
  center, 
  zoomLevel 
}) => ({ 
  center,
  zoomLevel 
});

const App = connect(mapToProps, actions)(({ center,  zoomLevel, increment, decrement }) => {
  const images = [
    {
      url: ''
    }
  ];

  return (
    <div className="App full-screen">
      <header className="App-header">
      </header>
      <div className="App-main">
        <section className="App-section section-grid">
          <ImageGrid images={images} />
        </section>
        <section className="App-section section-map">
          <Map center={center} zoomLevel={zoomLevel} />
        </section>
      </div>
    </div>
  );
});

export default App;
