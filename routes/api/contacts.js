const express = require('express');

const { validateBody, isValidId, authenticate } = require('../../middlewars');

const router = express.Router();
const ctrl = require('../../сontrollers/contacts');
const { schemas } = require('../../models/contact');
const uploadCloud = require('../../middlewars/uploadCloud');

router.get('/', authenticate, ctrl.getAll);

router.get('/:contactId', authenticate, isValidId, ctrl.getById);

router.post(
  '/',
  authenticate,
  uploadCloud.single('documents'),
  // validateBody(schemas.addSchema),
  ctrl.add
);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteById);

router.put(
  '/:contactId',
  authenticate,
  isValidId,

  validateBody(schemas.addSchema),

  ctrl.updateContactById
);
router.patch(
  '/:contactId',
  authenticate,
  isValidId,
  uploadCloud.single('documents'),
  // validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
