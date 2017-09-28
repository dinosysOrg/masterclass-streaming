const error = require('../config/error');
const Video = require('../model/video');
const fs = require('fs');

exports.delete = (req, res, next) => {
  Video.findById(req.params.video_id, (err, file) => {
    if (err) {
      return error(500, err, next);
    }

    fs.unlink(file.url, (err) => {
      if (err) {
        return error(500, err, next);
      }

      Video.findByIdAndRemove(file._id, (err) => {
        if (err) {
          return error(500, err, next);
        }

        res.status(200).send();
      });
    });
  });
};

exports.findAll = (req, res, next) => {
  Video.find((err, list) => {
    if (err) {
      return error(500, err, next);
    }

    res.status(200).send(list);
  });
};

exports.findOne = (req, res, next) => {
  Video.findById(req.params.video_id, (err, item) => {
    if (err) {
      return error(500, err, next);
    }

    res.status(200).send(item);
  });
};
