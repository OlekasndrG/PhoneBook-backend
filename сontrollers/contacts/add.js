const { Contact } = require('../../models/contact');

const add = async (req, res) => {
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, "missing required name field");
  // }
  const { _id: owner } = req.user;
  const preview = req.file ? req.file.path : '';

  const result = await Contact.create({
    ...req.body,
    preview: preview,
    owner,
  });
  
  res.status(201).json(result);
};
module.exports = add;
