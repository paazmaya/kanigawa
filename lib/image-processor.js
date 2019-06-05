/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

const fs = require('fs'),
  path = require('path'),
  os = require('os');

const isImage = require('is-image'),
  exiv2 = require('exiv2');

const getMeta = (filepath, callback) => {
  const stat = fs.statSync(filepath);

  exiv2.getImageTags(filepath, (error, tags) => {
    if (error) {
      console.error('Exif failed for ' + filepath);
      console.error(error);
    }
    callback({
      exif: tags,
      name: path.basename(filepath),
      size: stat.size,
      birthtime: stat.birthtime.toISOString(),
      modified: stat.mtime.toISOString(),
      path: filepath
    });
  });
};

const getMetas = (filelist, callback) => {
  filelist.forEach((filepath) => {
    getMeta(filepath, callback);
  });
};

const getImages = (directory) => {
  console.log(directory);
  const files = fs.readdirSync(directory);

  const images = files.map((file) => {
    return path.join(directory, file);
  }).filter((file) => {
    return isImage(file);
  });

  return images;
};

module.exports = {
	getMeta,
	getMetas,
	getImages
};
