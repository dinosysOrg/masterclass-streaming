const cmd = require('node-cmd');

exports.autoDeploy = (req, res) => {
  cmd.get(
    'git pull',
    function(err, data, stderr) {
      if (!err) {
        console.log('the node-cmd cloned dir contains these files :\n\n', data);
      } else {
        console.log('error', err);
      }

      res.send('Deployed Ok').status(201);
    }
  );
};
