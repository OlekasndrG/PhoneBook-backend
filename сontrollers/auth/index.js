const { ctrlWrapper } = require('../../helpers');
const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscription = require('./updateSubscription');
const updateUser = require('./updateUser');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');
const googleAuth = require('./authGoogle');
module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateUser: ctrlWrapper(updateUser),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  googleAuth: ctrlWrapper(googleAuth),
  // googleAuth: ctrlWrapper(googleAuth),
  // googleRedirect: ctrlWrapper(googleRedirect),
};
