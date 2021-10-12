const jwt = require('jsonwebtoken');

const createToken = (id, minute) => jwt.sign(
  {
    id,
  },
  process.env.TOKEN_KEY,
  { expiresIn: `${minute}` },
);

module.exports = {
  createToken,
};
