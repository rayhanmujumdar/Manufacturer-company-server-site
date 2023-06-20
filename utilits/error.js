const error = (status = 404, message = "Something was wrong") => {
  const error = new Error(message);
  error.status = status;
  return error
};

module.exports = error
