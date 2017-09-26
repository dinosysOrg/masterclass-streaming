// const fs = require('fs');
const error = require('../config/error');
const Video = require('../model/video');
const request = require('request');

// This api will be changed after.
exports.getData = (req, res, next) => {
  Video.findById(req.query.id, (err, video) => {
    if (err) {
      return error(404, 'File Not Found', next);
    }
    const urlArray = video.url;
    const item = urlArray[Math.floor(Math.random()*urlArray.length)];
    const stream = request(item);
    req.pipe(stream);
    stream.pipe(res);
  });
};
