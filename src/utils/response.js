const successResponse = (req, res) => {
  res.status(res.locals.code).send(res.locals.data);
};

module.exports = {
  successResponse,
};
