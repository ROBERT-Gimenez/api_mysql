const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination : ( req , file , cd) => {
        createBrotliCompress(null , path.join(__dirname,'/../public/img/profile'))
    },
    filename:(req,file,cb) => {
        let newFile = `${Date.now()}-profile${path.extname(file.originalname)}`;
        cb(null , newFile)
    }
})

const upload = multer({storage});

module.exports = upload;