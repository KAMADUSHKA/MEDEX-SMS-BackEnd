// const multer = require("multer");
// const path = require("path");

// const maxSize = 10 * 1024 * 1024;
// const destination = process.env.destination_upload_TableData;

// const storage = multer.diskStorage({
//   destination: destination,
//   filename: (req, files, cb) => {
//     const randomNumber = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
//     return cb(
//       null,
//       `${files.fieldname}_${Date.now()}_${randomNumber}${path.extname(
//         files.originalname
//       )}`
//     );
//   },
// });

// const fileFilter = (req, files, cb) => {
//   const allowType = ["image/jpeg", "image/png",  "application/pdf"];

//   if (allowType.includes(files.mimetype)) {
//     cb(null, true); // Acsept
//   } else {
//     cb(new Error("Only JPG, PNG and pdf files are allowed!"), false);
//   }
// };

// const upload_TableData = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: maxSize },
// });

// module.exports = upload_TableData;
  
  
  
  
