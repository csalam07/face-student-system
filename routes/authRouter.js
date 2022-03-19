const router = require('express').Router()
const authCtrl = require('../controllers/authCtrl')

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.post('/forgotpass', authCtrl.forgotpass)

module.exports = router
