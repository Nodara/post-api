const signale = require('signale');
const { StatusCodes } = require('http-status-codes');
const { createToken } = require('./auth.utils');

const User = require('../users/users.model');

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // find if user with this email exists
    const user = await User.findOne({ where: { email } });

    // If user with this email doesnot exists
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send('Email/Password incorrect');
    }

    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return res.status(StatusCodes.NOT_FOUND).send('Email/Password incorrect');
    }
    // create jwt token that will be expired in 2 hours
    const token = await createToken(user.id, 180);
    return res.json({ id: user.id, token });
  } catch (error) {
    signale.error('Failed to login user ', error);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const registerUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
    } = req.body;
    // Check if email is already registered
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.send('AccountsalreadyExist');
    }

    // Create user's data
    await User.create({
      firstname,
      lastname,
      email,
      password,
    });
    return res.send(StatusCodes.OK);
  } catch (err) {
    signale.error('Failed to user registratoin', err);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
module.exports = {
  registerUser,
  logInUser,
};
