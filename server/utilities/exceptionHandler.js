module.exports = (app) => {
  // If no route is matched, this route will be triggered
  app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // All error will be handled by this function and rails message for client
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message,
      error: err,
    });
  });
};
