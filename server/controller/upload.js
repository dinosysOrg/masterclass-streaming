const multer = require('multer');
const storageConfig = require('../config/storage');
const upload = multer({storage: storageConfig.storage}).any();
const error = require('../config/error');
const Video = require('../model/video');
const fs = require('ssh2-fs');
const connect = require('ssh2-connect');
const {storageFirst} = require('../config/env');
const {publicStorageFirst} = require('../config/env');
const {publicStorageSecond} = require('../config/env');
const date = new Date();
const stringDate = `${date.getDate()}${date.getMonth()+1}${date.getUTCFullYear()}`;

exports.beforeUpload = (req, res, next) => {
  let generateDir = new Promise(function(resolve, reject) {
    const storageDir = `/home/storage/${stringDate}`;
    connect({
      host: storageFirst.STORAGE_IP_FIRST,
      port: storageFirst.STORAGE_PORT_FIRST,
      username: storageFirst.STORAGE_USERNAME_FIRST,
      password: storageFirst.STORAGE_PASSWORD_FIRST,
    }, function(err, ssh) {
      fs.exists(ssh, storageDir, (err, existed) =>{
        if (err) {
          reject(err);
        }

        if (existed) {
          resolve(storageDir);
        } else {
          fs.mkdir(ssh, storageDir, (err) => {
            if (err) {
              reject(err);
            }
            resolve(storageDir);
          });
        }
      });
    });
  });

  generateDir.then(function(data) {
    req.storage = data;
    next();
  }).catch(function(err) {
    return error(500, err, next);
  });
};

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
          url: [`http://${publicStorageFirst.STORAGE_IP_FIRST}:${publicStorageFirst.STORAGE_PORT_FIRST}/${stringDate}/${file.filename}`,
            `http://${publicStorageSecond.STORAGE_IP_SECOND}:${publicStorageSecond.STORAGE_PORT_SECOND}/${stringDate}/${file.filename}`],
          uploader: req.get('email'),
        });
        video.save((err, newVideo) => {
          if (err) {
            reject(err);
          };
          let videoResponse = {
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
