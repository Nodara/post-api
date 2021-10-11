const jwt = require('jsonwebtoken');

const createToken = (id) => jwt.sign(
  {
    id,
  },
  process.env.TOKEN_KEY,
  { expiresIn: '2h' },
);

module.exports = {
  createToken,
};
