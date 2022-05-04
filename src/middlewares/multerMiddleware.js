const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
            return cb(new Error('File must be a JPEG, JPG or PNG'))
        }

        cb(undefined, true)

    }
})

module.exports = upload