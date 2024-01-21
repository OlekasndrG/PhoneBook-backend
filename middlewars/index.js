const isValidId = require('./isValidId');
const validateBody = require('./validateBody');
const authenticate = require('./authenticate');
const upload = require('./upload');
const passport = require('./googleAuth');
module.exports = {
  validateBody,
  isValidId,
  authenticate,
  upload,
  passport,
};
