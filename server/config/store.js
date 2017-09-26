const path = require('path');
const sftpStorage = require('multer-sftp');
const {storeFirst} = require('../config/env');

/**
 * Generate Dir
 * @return {folder}
 */

exports.store = sftpStorage({
  sftp: {
    host: storeFirst.STORE_IP_FIRST,
    port: storeFirst.STORE_PORT_FIRST,
    username: storeFirst.STORE_USERNAME_FIRST,
    password: storeFirst.STORE_PASSWORD_FIRST,
  },
  destination: function(req, file, cb) {
    cb(null, req.store);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
