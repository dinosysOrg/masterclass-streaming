const chalk = require('chalk');
const figure = require('figures');
const log = console;

exports.error = (message) => {
  log.error(chalk.red(...[figure.checkboxOn].concat(message)));
};

exports.info = (message) => {
  log.info(chalk.cyan(...[figure.tick].concat(message)));
};
