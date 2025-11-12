import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    cb(null, true);       // as all files types are allowed by me
}

export const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 10 * 1024 * 1024}  //10mb
})