/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

const fs = require('fs'),
  path = require('path');

const isImage = require('is-image');
//  exiv2 = require('exiv2');

const getMeta = (filepath) => {
  const stat = fs.statSync(filepath);

  return new Promise((resolve, reject) => {
    resolve({
      name: path.basename(filepath),
      size: stat.size,
      birthtime: stat.birthtime.toISOString(),
      modified: stat.mtime.toISOString(),
      path: filepath
    });
  });
/*
  exiv2.getImageTags(filepath, (error, tags) => {
    if (error) {
      console.error('Exif failed for ' + filepath);
      console.error(error);
      reject(error);
    }
    else {
      resolve({
        exif: tags,
        name: path.basename(filepath),
        size: stat.size,
        birthtime: stat.birthtime.toISOString(),
        modified: stat.mtime.toISOString(),
        path: filepath
      });
    }
  });
*/
};

/**
 * Returns a single Promise that resolves all the files with their meta data.
 * 
 * @param {array} filelist List of file paths
 * @returns {Promise} List of meta data 
 */
const getMetas = async (filelist) => {
  return await Promise.all(filelist.map(async (filepath) => {
    return await getMeta(filepath);
  }));
};

/**
 * Find image files under the given directory. No recursion.
 * 
 * @param {string} directory A directory from where to look for image files
 * @returns {array} List of image file paths
 */
const getImages = (directory) => {
  const files = fs.readdirSync(directory);

  const images = files
    .map((file) => path.join(directory, file))
    .filter((file) => isImage(file));

  return images;
};

module.exports = {
	getMeta,
	getMetas,
	getImages
};
