const responseObject = (req, res) => {
  res.status(res.locals.code).send(res.locals.data);
};

const errorResponse = (req, res, error) => {
  const { data } = error.response;
  const { status, code } = data;
  res.locals = {
    code,
    data: status,
  };

  return responseObject(req, res);
};

module.exports = {
  responseObject,
  errorResponse,
};
