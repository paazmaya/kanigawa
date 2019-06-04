/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

import React, {Component} from 'react';
import { connect } from 'redux-zero/react';
import Map from './Map';
import ImageGrid from './ImageGrid';
import './App.css';
import actions from './actions';

interface AppProps {
  center: [number, number],
  zoomLevel: number
}

const mapToProps = ({
  center,
  zoomLevel
}) => ({
  center,
  zoomLevel
});

// { center,  zoomLevel, increment, decrement }
export class App extends Component<AppProps> {

  randomColorHex():string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  fillEmptyImages(total:number) {
    const list = [];
    for (let i = 0; i < total; ++i) {
      list.push({
        url: '',
        key: '' + i,
        color: this.randomColorHex()
      });
    }
    return list;
  }

  render () {
    const images = this.fillEmptyImages(100);

    return (
      <div className="App full-screen">
        <section className="App-section section-grid">
          <ImageGrid images={images} />
        </section>
        <section className="App-section section-map">
          <Map center={this.props.center} zoomLevel={this.props.zoomLevel} />
        </section>
      </div>
    );
  }
}

export default connect(mapToProps, actions)(App);
