// const multer = require("multer");
// const path = require("path");

// const maxSize = 1 * 1024 * 1024;
// const destination = process.env.destination_Upload;

// const storage = multer.diskStorage({
//   destination: destination,
//   filename: (req, file, cb) => {
//     const randomNumber = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}_${randomNumber}${path.extname(
//         file.originalname
//       )}`
//     );
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowType = ["image/jpeg", "image/png"];

//   if (allowType.includes(file.mimetype)) {
//     cb(null, true); // Acsept
//   } else {
//     cb(new Error("Only JPG and PNG files are allowed!"), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: maxSize },
// });

// module.exports = upload;
