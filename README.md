# kanigawa (鐘川)

> Electron based desktop application for setting geotags for images

[![Build Status](https://travis-ci.org/paazmaya/kanigawa.svg)](https://travis-ci.org/paazmaya/kanigawa)

As this project/application is still being planned and investigated, it is running
with the pre-build version of [Electron](http://electron.atom.io/).

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

**Later** it should be possible to install this application globally and start it wherever
it is common in the given platform:

```sh
[sudo] npm install --global kanigawa
```

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

### Map default centre location and zoom level

* Map default centre is determined by the most used location for geotag
* Used locations are stored locally, but with only three digits, hence the accuracy is not too discriminating
* That inaccuracy will help approximate the location heat map and over time give much more pleasant user experience

### Leap Motion

Should I mention that once a proper interaction model is found, it needs to work with
[Leap Motion](https://developer.leapmotion.com/)?

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

## Updating GitHub Pages

There is a `gh-pages` branch that is available as [kanigawa.paazmaya.fi](http://kanigawa.paazmaya.fi).
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

Copyright (c) [Juga Paazmaya](http://paazmaya.fi) <paazmaya@yahoo.com>
