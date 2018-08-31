# kanigawa (鐘川)

> Electron based desktop application for setting geotags for images

[![Build Status](https://travis-ci.org/paazmaya/kanigawa.svg)](https://travis-ci.org/paazmaya/kanigawa)
[![Windows build status](https://ci.appveyor.com/api/projects/status/wls3dplcr1vvqwa6/branch/master?svg=true)](https://ci.appveyor.com/project/paazmaya/kanigawa/branch/master)
[![dependencies Status](https://david-dm.org/paazmaya/kanigawa/status.svg)](https://david-dm.org/paazmaya/kanigawa)

![kanigawa project logo](icon.png)

As this project/application is still being planned and investigated, it is running
with the pre-build version of [Electron](http://electron.atom.io/).

I will also use this as an opportunity to study about [ES2015 modules](http://jsmodules.io/),
and whatever else is interesting under the :rainbow:.

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

Please note that the minimum supported version of [Node.js](https://nodejs.org/en/) is `8.11.1`, which is [the active Long Term Support (LTS) version](https://github.com/nodejs/Release#release-schedule).

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

## Development

[Webpack](https://webpack.github.io/) is used to compile both JavaScript and CSS bundles,
so that all the code needed for [React.js](http://facebook.github.io/react/)
and others are included in a single file.

During development, the easier way to make changes on the user interface and see the results,
is to use the Webpack development server locally:

```sh
npm start
```

This will start a [`http-server`](https://www.npmjs.com/package/http-server) at port `9980`
and a [Webpack development server](https://www.npmjs.com/package/webpack-dev-server)
in port `9981`.

Once the changes are somewhat satisfactory, the "production" bundles can be build with the command:

```sh
npm run build
```

and tested by running the Electron application:

```sh
npm run start-app
```

Electron accepts some [command line options to be passed on Chrome](https://github.com/atom/electron/blob/master/docs/api/chrome-command-line-switches.md),
which can be seen with `chrome --js-flags="--help"` command.

## 3rd party libraries and tools making this possible

**Thank you!**

### Front end libraries

* [`leaflet`](http://leafletjs.com/)
* [`react` and `react-dom`](http://facebook.github.io/react/)
* [`react-dnd` and `react-dnd-html5-backend`](https://github.com/gaearon/react-dnd)
* [`react-leaflet`]()

### Back end libraries

* [`electron-prebuilt`]()
* [`is-image`]()

### Build tools

* [`autoprefixer`](https://github.com/postcss/autoprefixer)
* [`babel-core`, `babel-preset-es2015` and `babel-preset-react`](http://babeljs.io/)
* [`babel-loader`](https://github.com/babel/babel-loader)
* [`css-loader`]()
* [`exports-loader`]()
* [`extract-text-webpack-plugin`]()
* [`image-webpack-loader`]()
* [`imports-loader`]()
* [`postcss-loader`]()
* [`style-loader`]()
* [`webpack`](http://webpack.github.io/)

### Development tools

* [`babel-eslint`](https://github.com/babel/babel-eslint)
* [`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react)
* [`eslint`](http://eslint.org/)
* [`http-server`](https://github.com/indexzero/http-server)
* [`webpack-dev-server`]()

## Updating [GitHub Pages](https://pages.github.com/)

There is a special `gh-pages` branch which becomes available as
[kanigawa.paazmaya.fi](http://kanigawa.paazmaya.fi).
It can be updated by running the following commands:

```sh
git checkout master
npm run pages # will run 'npm run build' and 'npm run move-bundle'
git checkout gh-pages
mv pages/* .
git add .
git commit -m "Update to get version .... included"
git push origin gh-pages
git checkout master
```

## Version history

* Nothing yet..

## License

Licensed under [the MIT license](LICENSE).

Copyright (c) [Juga Paazmaya](https://paazmaya.fi) <paazmaya@yahoo.com>
