const fs = require('fs');
const Video = require('../model/video');
const error = require('../config/error');

// This api will be changed after.
exports.getData = (req, res, next) => {
  Video.findById(req.query.id, (err, video) => {
    if (!video) {
      return error(404, 'File Not Found', next);
    }

    const data = video.url;
    fs.stat(data, (err, stats) => {
      if (err) {
        return error(404, 'File Not Found', next);
      }
      const {range} = req.headers;
      const {size} = stats;
      const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
      const end = size - 1;
      const chunkSize = (end - start) + 1;
      res.set({
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      });
      res.status(206);
      const stream = fs.createReadStream(data, {start: start, end: end});
      stream.on('open', () => stream.pipe(res));
      stream.on('error', (streamErr) => res.end(streamErr));
    });
  });
};
