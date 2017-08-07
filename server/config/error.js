module.exports = (code, message, next) => {
  let err = new Error();
  err.status = code;
  err.message = message;
  next(err);
};
