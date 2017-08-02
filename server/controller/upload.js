const multer = require('multer');
const storeConfig = require('../config/store');
const upload = multer({storage: storeConfig.store}).any();
const error = require('../config/error');
const Video = require('../model/video');

exports.upload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return error(500, err, next);
    }

    next();
  });
};

exports.afterUploaded = (req, res) => {
  let listVideo = [];
  req.files.forEach(function(file) {
    listVideo.push(
      new Promise((resolve, reject) => {
        let video = new Video({
          url: file.path,
          type: file.fieldname,
        });
        video.save((err, newVideo) => {
          if (err) {
            reject(err);
          };
          let videoResponse = {
            name: file.originalname,
            type: newVideo.type,
            id: newVideo._id,
          };
          resolve(videoResponse);
        });
      })
    );
  });

  Promise.all(listVideo).then((data) => {
    res.status(201).send(data);
  }).catch((error) => {
    res.status(422).send(error);
  });
};
