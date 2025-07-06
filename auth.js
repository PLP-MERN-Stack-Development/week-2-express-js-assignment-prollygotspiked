function authenticate(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== '123456') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}
module.exports = authenticate;
