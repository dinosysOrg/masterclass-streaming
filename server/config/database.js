const {dbServer} = require('./env');

module.exports = {
  'url': `mongodb://${dbServer.SERVER_NAME}:${dbServer.POST}/vmastreaming`,
};
