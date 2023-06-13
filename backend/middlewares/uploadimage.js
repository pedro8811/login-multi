const multer = require('module')

module.exports = (multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '/upload')
    }
  })
}))