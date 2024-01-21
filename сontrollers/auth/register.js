const { User } = require('../../models/user');
const {
  HttpError,
  sendEmail,
  VerifyEmailHTMLTemplate,
} = require('../../helpers');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
require('dotenv').config();
// const jwt = require('jsonwebtoken');
const { FRONTEND_URL } = process.env;
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const emailHtml = VerifyEmailHTMLTemplate({
    FRONTEND_URL,
    email,
    verificationToken,
  });

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const verifyEmail = {
    to: email,
    subject: 'Verify email for Your Personal Phonebook',
    html: emailHtml,
  };
  // html: `<a target="_blank" href="${FRONTEND_URL}/goit-react-hw-08-phonebook/login?verificationToken=${verificationToken}">Click verify email</a>`,
  await sendEmail(verifyEmail);
  res.status(201).json({
    user: {
      name: newUser.name,
      avatar: newUser.avatarURL,
      email: newUser.email,
      subscription: 'starter',
    },
  });
};
module.exports = register;
