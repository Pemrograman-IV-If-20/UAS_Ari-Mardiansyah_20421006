const multer= require("multer")
const randomstring = require("randomstring");


const uploadFile = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length,
        );      
      cb(null, Date.now() + "-" + randomstring.generate(12) + ext)
    },
  });
  

module.exports = {
    uploadFile: uploadFile,
}