const { HttpError } = require('../../helpers');
const { Contact } = require('../../models/contact');
// const transformImageUrl = originalUrl => {
//   // Split the URL by 'upload/' to insert our transformation parameters
//   const parts = originalUrl.split('upload/');
//   return `${parts[0]}upload/w_350,h_350/${parts[1]}`;
// };

const updateStatusContact = async (req, res) => {

  const { contactId } = req.params;

  if (req.file) {
    //  const transformedUrl = transformImageUrl(req.file.path);
    //  req.body.preview = transformedUrl;

    req.body.preview = req.file.path;
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not Found');
  }

  res.json(result);
};

module.exports = updateStatusContact;
