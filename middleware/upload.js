const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

const maxSize = 1 * 1024 * 1024; // 1MB
const destination = process.env.DESTINATION_UPLOAD || './uploads';

// Ensure the upload directory exists
if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    const randomNumber = Math.floor(Math.random() * 1000);
    cb(
      null,
      `${file.fieldname}_${Date.now()}_${randomNumber}${path.extname(
        file.originalname
      )}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  // Updated to allow PDF files
  const allowType = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowType.includes(file.mimetype)) {
    cb(null, true); // Accept
  } else {
    cb(new Error('Only JPG, PNG, and PDF files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
});

module.exports = upload;
