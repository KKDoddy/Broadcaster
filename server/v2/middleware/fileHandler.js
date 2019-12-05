/* eslint-disable object-shorthand */
import multer from 'multer';

// setting up the file destination and the to be stored filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = req.baseUrl;
    cb(null, `./server/v2/uploads/${folderName.slice(folderName.lastIndexOf('/') + 1)}/`);
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype;
    if (file.mimetype === 'video/mp4') {
      cb(null, `videos/${req.id}.${extension.slice(extension.indexOf('/') + 1)}`);
    } else {
      cb(null, `images/${req.id}.${extension.slice(extension.indexOf('/') + 1)}`);
    }
  },
});

// setting up how files will be filtered (by filetypes)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image') || file.mimetype.includes('video')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// the multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 100 },
  fileFilter: fileFilter,
});

export default upload;
