const ffmpeg = require('fluent-ffmpeg');
const logger = require('../../lib/logger');

exports.covertBig = (path) => {
  const name = path.split('/')[1].split('.')[0];
  ffmpeg(path)
    .audioCodec('copy')
    .size('1280x720')

    .on('progress', function(progress) {
      logger.info('Processing: ' + progress.percent + '% done');
    })

    .on('error', function(err) {
      logger.error('An error occurred: ' + err.message);
    })

    .on('end', function() {
      logger.info('Processing finished !');
    })
    .save('video/' + name + '-big.mp4');
};

exports.covertMedium = (path) => {
  const name = path.split('/')[1].split('.')[0];
  ffmpeg(path)
    .audioCodec('copy')
    .size('640x480')

    .on('progress', function(progress) {
      logger.info('Processing: ' + progress.percent + '% done');
    })

    .on('error', function(err) {
      logger.error('An error occurred: ' + err.message);
    })

    .on('end', function() {
      logger.info('Processing finished !');
    })
    .save('video/' + name + '-medium.mp4');
};
