const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
      }

      req.userId = user.user.id;
      next();
    });
  } else {
    res.status(401).json({ error: 'Missing authorization header' });
  }
};

module.exports = authenticate;
