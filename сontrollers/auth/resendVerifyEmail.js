const {
  HttpError,
  sendEmail,
  VerifyEmailHTMLTemplate,
} = require('../../helpers');
const { User } = require('../../models/user');
require('dotenv').config();
const { FRONTEND_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, 'No user with this email');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }
  const emailHtml = VerifyEmailHTMLTemplate({
    FRONTEND_URL,
    email,
    verificationToken: user.verificationToken,
  });
  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: emailHtml,
  };

  await sendEmail(verifyEmail);
  res.json({
    message: 'Verification email sent',
  });
};
module.exports = resendVerifyEmail;
