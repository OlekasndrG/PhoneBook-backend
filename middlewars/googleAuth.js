const { Strategy } = require('passport-google-oauth2');
const { User } = require('../models/user');
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL:
    'https://phonebook-backend-5bos.onrender.com/api/users/google/callback',
  passReqtoCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName } = profile;

    const user = await User.findOne({ email });
    if (user) {
      return done(null, user); // req.user=user
    }
    const password = await bcrypt.hash(nanoid(), 10);
    const newUser = await User.create({
      email,
      password,
      name: displayName,
      verificationToken: 'noNeed',
    });
    console.log(newUser);
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};
const googleStrategy = new Strategy(googleParams, googleCallback);
passport.use('google', googleStrategy);
module.exports = passport;
