/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React from 'react';
import { connect } from 'redux-zero/react';
//import { BoundActions } from 'redux-zero/types/Actions';

import Map, {MapProps, Viewport} from './Map';
import ImageGrid from './ImageGrid';
import './App.css';
import actions from './actions';
import {State} from './store';

const mapToProps = (state: State) => {
  return {
    viewport: state.viewport
  };
};

//type AppProps = StoreProps & BoundActions<State, typeof actions>


const randomColorHex = ():string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

const fillEmptyImages = (total:number) => {
  const list = [];
  for (let i = 0; i < total; ++i) {
    list.push({
      url: '',
      key: '' + i,
      color: randomColorHex()
    });
  }
  return list;
}

export const App: React.SFC<MapProps> = (props) => {
  const images = fillEmptyImages(100);

  return (
    <div className="App full-screen">
      <section className="App-section section-grid">
        <ImageGrid images={images} />
      </section>
      <section className="App-section section-map">
        <Map viewport={props.viewport} updateViewport={props.updateViewport}/>
      </section>
    </div>
  );
};

export default connect(mapToProps, actions)(App);
