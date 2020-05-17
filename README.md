# kanigawa (鐘川)

> Electron based desktop application for setting geotags for images

[![Build Status](https://travis-ci.org/paazmaya/kanigawa.svg)](https://travis-ci.org/paazmaya/kanigawa)
[![Windows build status](https://ci.appveyor.com/api/projects/status/wls3dplcr1vvqwa6/branch/master?svg=true)](https://ci.appveyor.com/project/paazmaya/kanigawa/branch/master)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=paazmaya_kanigawa&metric=code_smells)](https://sonarcloud.io/dashboard?id=paazmaya_kanigawa)
[![dependencies Status](https://david-dm.org/paazmaya/kanigawa/status.svg)](https://david-dm.org/paazmaya/kanigawa)

![kanigawa project logo](icon.png)

This project runs inside Electron standalone application, with [React.js](https://facebook.github.io/react/) based frontend application,
that was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) version 3,
with [TypeScript](https://www.typescriptlang.org/).

The map is made with [Leaflet](https://leafletjs.com/) and data is handled via [Redux Zero](https://matheusml1.gitbooks.io/redux-zero-docs/content/).

It will also be available as a web site at [paazmaya.github.io/kanigawa](https://paazmaya.github.io/kanigawa/)
because it can. However the geotagging functionality is limited to a single image at a time.

## Why, there is Picasa from Google, right?

I got so fed up with its bugs and lack of support for changes in the Google Maps API, so
decided to go and solve the problem while also making myself to learn about Electron and NW.js.

Surely there are other tools trying to achieve this functionality but they usually lack
_something_ that I deem valuable.

Since the beginning of this project, Picasa has already ceased to exists.

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
npm run build
npm run electron:start
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

...or [download for Windows](https://www.exiv2.org/download.html).

The file called `package.json` lists the 3rd party libraries and tools, of which
the property `dependencies` are the ones needed for the frontend React application and
the property `devDependencies` are those needed for Electron based standalone application.

It is also possible to run the too,l without Electron, just for testing purposes,
by running these two commands in separate terminals:

```sh
node websocket-server-for-testing-in-browser.js
npm start
```

## Scripts available via Create React App boilerplate

The [React](https://reactjs.org/) based frontend application has been initialised with [Create React App](https://create-react-app.dev/) which provided the following commands:

* `npm start`: Runs the app in the development mode, available at [http://localhost:3000](http://localhost:3000)
* `npm test`: Run [Jest](https://jestjs.io/) based unit tests
* `npm run build`: Creates production bundle to the `build` folder
* `npm run eject`: One way exit operation to see what is underneath Create React App generated boilerplate
* `npm run deploy`: Deploy frontend to GitHub Pages at [paazmaya.github.io/kanigawa](https://paazmaya.github.io/kanigawa/)

You can learn more in the [Create React App documentation](https://create-react-app.dev/docs/getting-started).

## Scripts available via Electron Forge boilerplate

The [Electron](https://electronjs.org/) standalone application container has been initialised with [Electron Forge](https://www.electronforge.io/) and it has provided this project with the following commands:

* `npm run electron:start`
* `npm run electron:package`
* `npm run electron:make`
* `npm run electron:publish`

Before the above commands are useful, the React based frontend application should be build with the `npm run build` command.

Electron accepts some [command line options to be passed on Chrome](https://github.com/atom/electron/blob/master/docs/api/chrome-command-line-switches.md),
which can be seen with `chrome --js-flags="--help"` command.

## Deployed to [GitHub Pages](https://pages.github.com/)

There is a special `gh-pages` branch which is updated via Travis CI and then made available as [paazmaya.github.io/kanigawa](https://paazmaya.github.io/kanigawa/).

The generated site only supports fresh browsers and cannot be operated with such legacy browsers,
such as Internet Explorer.

The frontend of the site relies on the use of [WebSockets](https://html.spec.whatwg.org/multipage/web-sockets.html) for communication with the backend.

## Features or actually a ROADMAP since nothing is implemented yet

* Open a directory on the grid view
* Drag image to a location on a map
* Existing geotagged images in the current grid will be shown as thumbnail markers on the map
* Image can be dragged on top of a thumbnail on the map, which places it at the same location
* Image thumbnails on map can be shown as dimmed, while the location reuse is not available, as it is sometimes desired behaviour to avoid nearby mistakes
* Clicking on thumbnail on a map, selects the image from the grid, but why?
* Sort by file attributes and most common metadata properties
* Service Worker should do the scanning of the image files and thumbnail creation
* In order to keep React app able to run in a normal browser, communication via WebSockets, https://caniuse.com/#feat=websockets
* Publish to GitHub https://www.electronforge.io/config/publishers/github
* Automatic updates with https://github.com/electron/update-electron-app

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

Contributions are licensed via [Developer Certificate of Origin](https://developercertificate.org/).
