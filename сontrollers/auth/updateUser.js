const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

// const path = require('path');
// const fs = require('fs/promises');
// const Jimp = require('jimp');

// const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');
// const avatarSize = 250;
// const updateAvatar = async (req, res) => {
//   const { _id } = req.user;
//   const { path: tempUpload, originalname } = req.file;
//   const filename = `${_id}_${originalname}`;
//   const resultUpload = path.join(avatarsDir, filename);
//   await Jimp.read(tempUpload)
//     .then(image => {
//       return image.resize(avatarSize, avatarSize).write(resultUpload);
//     })
//     .catch(err => {
//       console.error('Error resizing image:', err);
//       throw err;
//     });

//   await fs.unlink(tempUpload); // Delete the temporary upload file
//   // const avatarURL = path.join('avatars', filename);
//   const avatarURL = req.file.path;
//   await User.findByIdAndUpdate(_id, { avatarURL });
//   res.json({
//     avatarURL,
//   });
// };

// const updateAvatar = async (req, res) => {
//   console.log(req.file);
//   const id = req.user._id;

//   const updateUserObj = await User.findById(id);
//   res.status(200).json({ name: updateUserObj.name });

// };

// const updateUser = async (req, res) => {
//   const { _id } = req.user;
//   const name = req.body.name || req.user.name;

//   const bodyLength = Object.keys(req.body).length;

//   if (!req.file) {
//     await User.findByIdAndUpdate(_id, { name });
//     res.status(200).json({ name, avatarURL: req.user.avatarURL });
//   } else if (bodyLength === 0) {
//     const { path } = req.file;

//     await User.findByIdAndUpdate(_id, { avatarURL: path });
//     res.status(200).json({ avatarURL: path });
//   } else {
//     const { path } = req.file;

//     await User.findByIdAndUpdate(_id, {
//       avatarURL: path,
//       name,
//     });

//     res.status(200).json({ avatarURL: path, name: name });
//   }
// };

const updateUser = async (req, res) => {
  const { _id } = req.user;

  if (req.file) {
    //  const transformedUrl = transformImageUrl(req.file.path);
    //  req.body.preview = transformedUrl;

    req.body.avatarURL = req.file.path;
  }
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not Found');
  }

  res.json(result);
};

// const someFunc = async (req, res) => {
// const avatarURL = req.file.path;
// };

module.exports = updateUser;

//   await fs.rename(tempUpload, resultUpload);
