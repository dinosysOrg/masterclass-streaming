const multer = require('multer');
const storeConfig = require('../config/store');
const upload = multer({storage: storeConfig.store}).any();
const error = require('../config/error');
const Video = require('../model/video');
const fs = require('ssh2-fs');
const connect = require('ssh2-connect');
const {storeFirst} = require('../config/env');
const {storeSecond} = require('../config/env');
const date = new Date();
const stringDate = `${date.getDate()}${date.getMonth()+1}${date.getUTCFullYear()}`;

exports.beforeUpload = (req, res, next) => {
  let generateDir = new Promise(function(resolve, reject) {
    const storeDir = `/home/store/${stringDate}`;
    connect({
      host: storeFirst.STORE_IP_FIRST,
      port: storeFirst.STORE_PORT_FIRST,
      username: storeFirst.STORE_USERNAME_FIRST,
      password: storeFirst.STORE_PASSWORD_FIRST,
    }, function(err, ssh) {
      fs.exists(ssh, storeDir, (err, existed) =>{
        if (err) {
          reject(err);
        }

        if (existed) {
          resolve(storeDir);
        } else {
          fs.mkdir(ssh, storeDir, (err) => {
            if (err) {
              reject(err);
            }
            resolve(storeDir);
          });
        }
      });
    });
  });

  generateDir.then(function(data) {
    req.store = data;
    console.log(data);
    next();
  }).catch(function(err) {
    console.log(err);
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
          url: [`http://${storeFirst.STORE_IP_FIRST}:${storeFirst.STORE_PORT_FIRST}/${stringDate}/${file.filename}`,
            `http://${storeSecond.STORE_IP_SECOND}:${storeSecond.STORE_PORT_SECOND}/${stringDate}/${file.filename}`],
        });
        video.save((err, newVideo) => {
          if (err) {
            reject(err);
          };
          let videoResponse = {
            url: newVideo.url,
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
