const multer = require("multer");
const fs = require("fs");
const path = require("path");

const createMulterStorage = (directory) => {
  return multer.diskStorage({
    // Set the destination directory for uploaded files
    destination: function (req, file, cb) {
      const baseDir = "upload";

      // Check if the 'upload' directory exists, and create it if it doesn't
      if (!fs.existsSync(baseDir)) {
        try {
          fs.mkdirSync(baseDir);
        } catch (err) {
          return cb(err);
        }
      }

      const targetDir = path.join(baseDir, directory);

      // Check if the specified directory exists inside 'upload', and create it if it doesn't
      if (!fs.existsSync(targetDir)) {
        try {
          fs.mkdirSync(targetDir);
        } catch (err) {
          return cb(err);
        }
      }

      // Call the callback with the path to the destination directory
      cb(null, targetDir);
    },

    // Set the filename for uploaded files
    filename: function (req, file, cb) {
      // Use the original filename, but append the current timestamp and file extension
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
};

// Export a function that creates a reusable Multer instance for the specified directory
module.exports = (directory) => {
  const storage = createMulterStorage(directory);
  return storage;
};
