# kanigawa (鐘川)

> Electron based desktop application for setting geotags for images

[![Build Status](https://travis-ci.org/paazmaya/kanigawa.svg)](https://travis-ci.org/paazmaya/kanigawa)
[![Windows build status](https://ci.appveyor.com/api/projects/status/wls3dplcr1vvqwa6/branch/master?svg=true)](https://ci.appveyor.com/project/paazmaya/kanigawa/branch/master)
[![dependencies Status](https://david-dm.org/paazmaya/kanigawa/status.svg)](https://david-dm.org/paazmaya/kanigawa)

![kanigawa project logo](icon.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) version 3, with [TypeScript](https://www.typescriptlang.org/).

The map is made with [Leaflet](http://leafletjs.com/), while using [React.js](http://facebook.github.io/react/) to create the views and Redux-zero for handling data.

As this project/application is still being planned and investigated, it is running
with the pre-build version of [Electron](http://electron.atom.io/).

```sh
npm run start-app
```

Electron accepts some [command line options to be passed on Chrome](https://github.com/atom/electron/blob/master/docs/api/chrome-command-line-switches.md),
which can be seen with `chrome --js-flags="--help"` command.

It will also be available as a web site at [kanigawa.paazmaya.fi](http://kanigawa.paazmaya.fi)
because it can. However the geotagging functionality is limited to a single image at a time.

## Why, there is Picasa from Google, right?

I got so fed up with its bugs and lack of support for changes in the Google Maps API, so
decided to go and solve the problem while also making myself to learn about Electron and NW.js.

Surely there are other tools trying to achieve this functionality but they usually lack
_something_ that I deem valuable.

## Background for the project name

As I have done now for few of my recent projects, the names are trying to give a tribute to
ancient masters of Japanese martial arts. For example
[`maezato`](https://github.com/paazmaya/maezato),
[`sakugawa`](https://github.com/paazmaya/sakugawa), and
[`shigehachi`](https://github.com/paazmaya/shigehachi).

In the case of `kanigawa`, the name stands for a teacher who was known in the Ryukyu archipelago
(of which Okinawa is the biggest island) and had influence on the martial arts known as
karate and ryukyu kobujutsu today.

## Getting started

Clone or download this repository and run the following command to start the application:

```sh
npm install
npm run start-app
```

Please note that the minimum supported version of [Node.js](https://nodejs.org/en/) is `10.13.0`, which is [the active Long Term Support (LTS) version](https://github.com/nodejs/Release#release-schedule).

**Later** it should be possible to install this application globally and start it wherever
it is common in the given platform:

```sh
[sudo] npm install --global kanigawa
```

Please note that `exiv2` is used for image meta data handling and because it is a native library,
the Node.js bindings for it required some platform dependant libraries installed.
Pick the suitable command for your environment:

```sh
brew install pkg-config exiv2 # Mac
sudo apt-get install libexiv2 libexiv2-dev # Debian/Ubuntu
```

...or [download for Windows](http://www.exiv2.org/download.html).

## Scripts available via Create React App boilerplate

In the project directory, you can run:

* `npm start`: Runs the app in the development mode, available at [http://localhost:3000](http://localhost:3000)
* `npm test`: Run [Jest](https://jestjs.io/) based unit tests
* `npm run build`: Creates production bundle to the `build` folder
* `npm run eject`: One way exit operation to see what is underneath Create React App generated boilerplate

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Deployed to [GitHub Pages](https://pages.github.com/)

There is a special `gh-pages` branch which is updated via Travis CI and then made available as [kanigawa.paazmaya.fi](https://kanigawa.paazmaya.fi).

## Features or actually a roadmap

* Open a directory recursively on the grid view
* Drag image to a location on a map
* Existing geotagged images in the current grid will be shown as thumbnail markers on the map
* Image can be dragged on top of a thumbnail on the map, which places it at the same location
* Image thumbnails on map can be shown as dimmed, while the location reuse is not available, as it is sometimes desired behaviour to avoid nearby mistakes
* Clicking on thumbnail on a map, selects the image from the grid, but why?
* Sort by file attributes and most common metadata properties
* Service Worker should do the scanning of the image files and thumbnail creation
* Use http://caniuse.com/#feat=css-grid for image grid, once a way for enabling it is found
* Use `electron.remote` to call stuff in the `mainWindow`
* Or communicate via `open-url` event so that the React application works as a regular web site
* Well the `open-url` did not do it, but `app.interceptHttpProtocol` shall be.
* Package with `electron-packager`

### Map default centre location and zoom level

* Map default centre is determined by the most used location for geotag
* Used locations are stored locally, but with only three digits, hence the accuracy is not too discriminating
* That inaccuracy will help approximate the location heat map and over time give much more pleasant user experience

### Leap Motion

Should I mention that once a proper interaction model is found, it needs to work with
[Leap Motion](https://developer.leapmotion.com/)?

### Voice command locations

* Choose images
* Use voice command to specify saved location, such as "home" or "clear"
* Profit.

## Version history

* Nothing yet..

## License

Licensed under [the MIT license](LICENSE).

Copyright (c) [Juga Paazmaya](https://paazmaya.fi) <paazmaya@yahoo.com>
