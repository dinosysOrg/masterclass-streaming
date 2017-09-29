const path = require('path');
const sftpStorage = require('multer-sftp');
const {storageFirst} = require('../config/env');

/**
 * Generate Dir
 * @return {folder}
 */

exports.storage = sftpStorage({
  sftp: {
    host: storageFirst.STORAGE_IP_FIRST,
    port: storageFirst.STORAGE_PORT_FIRST,
    username: storageFirst.STORAGE_USERNAME_FIRST,
    password: storageFirst.STORAGE_PASSWORD_FIRST,
  },
  destination: function(req, file, cb) {
    cb(null, req.storage);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
