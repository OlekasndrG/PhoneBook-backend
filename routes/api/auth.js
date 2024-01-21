const express = require('express');
const ctrl = require('../../сontrollers/auth');
const router = express.Router();
const { validateBody, authenticate, passport } = require('../../middlewars');
const { schemas } = require('../../models/user');
const uploadCloud = require('../../middlewars/uploadCloud');

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  ctrl.googleAuth
); // адреса в гугл апі редірект має бути точно один в один

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);
router.get('/verify/:verificationToken', ctrl.verifyEmail);
router.post(
  '/verify',
  validateBody(schemas.verifyEmailSchema),
  ctrl.resendVerifyEmail
);
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.getCurrent);
router.post('/logout', authenticate, ctrl.logout);
router.patch(
  '/',
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  '/updateUser',
  authenticate,
  uploadCloud.single('avatar'),
  ctrl.updateUser
);


module.exports = router;
