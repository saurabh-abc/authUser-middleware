const router = require('express').Router();
const { authUser } = require('../middleware/auth_handler');
const multer = require('multer');
const empController = require('../controller/empController');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
// var limits = { fileSize: 500000 }
const upload = multer({
    storage: storage,
    // limits: limits
});
router.post('/signup', empController.user);
router.post('/signin', empController.login);
router.post('/home', authUser,upload.array('profile') ,empController.home);
module.exports = router;
