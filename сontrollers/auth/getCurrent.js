const getCurrent = async (req, res) => {
  const { email, subscription, name, avatarURL } = req.user;
  res.status(200).json({
    name,
    email,
    subscription,
    avatarURL,
  });
};
module.exports = getCurrent;
