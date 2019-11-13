const jwt = require('jsonwebtoken');

module.exports = function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['student']
  };
  const options = {
    expiresIn: '1d'
  };

  const result = jwt.sign(payload, process.env.SECRET, options);

  return result;
};
