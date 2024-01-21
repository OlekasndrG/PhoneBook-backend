const jwt = require('jsonwebtoken');
const { SECRET_KEY, FRONTEND_URL } = process.env;
const { User } = require('../../models/user');
const googleAuth = async (req, res) => {
  const { _id: id, email, subscription, avatarURL, name } = req.user;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '6d',
  });
  await User.findByIdAndUpdate(id, { token, verify: true });
  res.redirect(
    `${FRONTEND_URL}login?token=${token}&email=${email}&email=${subscription}&avatarURL=${avatarURL}&name=${name}`
  );
};
module.exports = googleAuth;
