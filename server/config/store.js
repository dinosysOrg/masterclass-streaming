const multer = require('multer');
const fs = require('fs');
const path = require('path');

/**
 * Generate Dir
 * @return {folder}
 */
function generateDir() {
  const date = new Date();
  const stringDate = `${date.getDate()}${date.getMonth()+1}${date.getUTCFullYear()}`;
  const storeDir = `./store/${stringDate}`;
  if (!fs.existsSync(storeDir)) {
    fs.mkdirSync(storeDir);
  };
  return storeDir;
};

exports.store = multer.diskStorage({
  destination: function(req, file, cb) {
    const store = generateDir();
    cb(null, store);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
