const hostMiddleware = require('./host_middleware');

module.exports = {
  'hostMiddleware': hostMiddleware.CheckHostConnected,
};
