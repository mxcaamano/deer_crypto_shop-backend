const userModel = require('../models/user.model');
const { createHash } = require('../utils/bcrypt.config');
const logger = require('../utils/logger')

const getSignUp = (req, res) => {
  logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
  res.render('pages/signUp');
};

const postSignUp = async (req, res) => {
  const { email, password, name, address, age, phone, imgURL } = req.body;
  try {
    const user = {
      email,
      password: createHash(password),
      name,
      address,
      age,
      phone,
      imgURL
    };
    const User = new userModel(user);
    await User.save();
    res.redirect('/login');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getFailsignUp = (req, res) => {
  res.render('pages/signUpError')
}

module.exports = { getSignUp, postSignUp, getFailsignUp };