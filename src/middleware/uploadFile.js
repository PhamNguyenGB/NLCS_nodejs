require("dotenv").config();
import db from '../models/index';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("check file:", file);
        console.log("check req:", req);
        console.log("check cb:", cb);
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })

module.exports = {
    upload,

}