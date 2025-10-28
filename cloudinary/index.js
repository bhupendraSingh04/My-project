const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'daqglcdzy',
  api_key: process.env.CLOUDINARY_KEY || '959112869996465',
  api_secret: process.env.CLOUDINARY_SECRET || 'HluBxZjZraDY1niQJc5uOwUZ728'
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'YelpCamp',
    allowed_formats: ['jpeg', 'png', 'jpg']
  },
});

module.exports = {
  cloudinary,
  storage
};
