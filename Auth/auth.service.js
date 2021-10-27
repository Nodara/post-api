const signale = require('signale');
const { StatusCodes } = require('http-status-codes');
const User = require('../users/user.model');

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
    req.session.user = user;
    // eslint-disable-next-line padded-blocks
    return res.json({ id: user.id });
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
